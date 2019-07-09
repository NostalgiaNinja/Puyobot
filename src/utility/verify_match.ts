import Discord from 'discord.js';
import { configRef } from './firebase';
import { LeagueConfig, ChannelRefs } from '../@types/league';

export default async function(client: Discord.Client): Promise<void> {
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

  // Have to test for undefined and check type as Text Channel as "Type Guards"
  // https://stackoverflow.com/questions/53563862/send-message-to-specific-channel-with-typescript
  // const verificationChannel = client.channels.get();
  // if (!modChannel) return;
  // if (!((modChannel): modChannel is Discord.TextChannel => modChannel.type === 'text')(modChannel)) return;
  // modChannel.send(em).catch(console.error);

  const discordChannel = <Discord.TextChannel | undefined>client.channels.get(VERIFICATION_CHANNEL.ID);
  if (!discordChannel) {
    console.log('Couldn\t find the verification channel.');
    return;
  }
  discordChannel.send('Test verification?');
}
