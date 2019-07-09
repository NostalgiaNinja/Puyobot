// Firebase-Admin configuration
import Discord from 'discord.js';
import * as admin from 'firebase-admin';
import { UserRefs, LeagueConfig, ChannelRefs } from '../@types/league';

const FIREBASE_CONFIG = JSON.parse(<string>process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_CONFIG),
  storageBucket: 'puyo-gg.appspot.com',
});

export const configRef = admin
  .firestore()
  .collection('league')
  .doc('config');

export async function getOrganizers(): Promise<UserRefs[] | undefined> {
  return await configRef.get().then((doc): UserRefs[] | undefined => {
    const data = doc.data();
    if (data && data.ORGANIZERS) return data.ORGANIZERS;
  });
}

export async function getOrganizerRole(): Promise<string | undefined> {
  return await configRef.get().then((doc): string | undefined => {
    const data = doc.data();
    if (data && data.ORGANIZER_ROLE) return <string>data.ORGANIZER_ROLE.id;
  });
}

export async function setOrganizers(organizersArray: UserRefs[]): Promise<void> {
  await configRef.set({ ORGANIZERS: organizersArray }, { merge: true });
  return;
}

export async function getSeasonName(): Promise<string | undefined> {
  return await configRef.get().then((doc): string | undefined => {
    const data = <LeagueConfig>doc.data();
    if (data && data.CURRENT_SEASON) return <string>data.CURRENT_SEASON;
  });
}

export function getSeasonRef(seasonName: string): FirebaseFirestore.CollectionReference {
  return admin
    .firestore()
    .collection('league')
    .doc('seasons')
    .collection(seasonName);
}

export async function setSeason(seasonName: string, client: Discord.Client): Promise<void> {
  // Get the verification channel
  const VERIFICATION_CHANNEL = await configRef.get().then((doc): ChannelRefs | null => {
    const data = <LeagueConfig>doc.data();
    if (data && data.VERIFICATION_CHANNEL) {
      return data.VERIFICATION_CHANNEL;
    } else {
      return null;
    }
  });

  if (!VERIFICATION_CHANNEL) {
    console.log('A channel for verification requests has not been set yet.');
    return;
  }

  const discordChannel = <Discord.TextChannel | undefined>client.channels.get(VERIFICATION_CHANNEL.ID);
  if (!discordChannel) {
    console.log('Couldn\t find the verification channel.');
    return;
  }
  configRef
    .set({ CURRENT_SEASON: seasonName }, { merge: true })
    .then((): void => {
      discordChannel.send(`Successfully set the current season to: ${seasonName}`);
    })
    .catch((err): void => {
      discordChannel.send(`There was an error updating the current season.`);
      console.error(err);
    });
}

export default {
  db: admin.firestore(),
  bucket: admin.storage().bucket(),
};
