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

export async function getOrganizers(): Promise<UserRefs[] | null> {
  const ORGANIZERS = await configRef.get().then((doc): UserRefs[] | null => {
    const data = doc.data();
    if (data && data.ORGANIZERS) {
      return data.ORGANIZERS;
    } else {
      return null;
    }
  });

  if (ORGANIZERS) {
    return ORGANIZERS;
  } else {
    return null;
  }
}

export async function getOrganizerRole(): Promise<string | null> {
  const ORGANIZER_ROLE = await configRef.get().then((doc): string | null => {
    const data = doc.data();
    if (data && data.ORGANIZER_ROLE) {
      return <string>data.ORGANIZER_ROLE.id;
    } else {
      return null;
    }
  });

  if (ORGANIZER_ROLE) {
    return ORGANIZER_ROLE;
  } else {
    return null;
  }
}

export async function setOrganizers(organizersArray: UserRefs[]): Promise<void> {
  await configRef.set({ ORGANIZERS: organizersArray }, { merge: true });
  return;
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

  const discordChannel = <Discord.TextChannel | undefined>client.channels.get(VERIFICATION_CHANNEL.id);
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
