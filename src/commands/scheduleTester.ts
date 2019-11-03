import Discord from 'discord.js';

function parseDate(d: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDay();
  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();

  return `${months[month - 1]} ${day}, ${year} at ${hour % 12 === 0 ? 12 : hour % 12}:${min}:${sec < 10 ? '0' + sec : sec} ${hour < 12 ? 'a.m.' : 'p.m.'}`;
}

export default {
  name: 'schedule',
  description: 'Gives the user to give a poll with up to 4 answers.',
  // aliases: [''],
  category: ['Fun'],
  usage: ['<poll question>, <poll answer 1>, <poll answer 2>, <poll answer 3>, <poll answer 4>'],
  async execute(message: Discord.Message): Promise<void> {
    const d = new Date();
    const time = d.getTime();
    const next = time + 30 * 1000;
    const nextD = new Date(next);

    // .timeout user 12h
    // .timeout user 30m
    // .timeout user 12h30m
    const values = '12h30m'.split(/[a-zA-Z]/).filter((v): boolean => v.length > 0);
    const times = '12h30m'.split(/[^a-zA-Z]/).filter((v): boolean => v.length > 0);
    console.log(values);
    console.log(times);

    message.channel.send('The current time is ' + parseDate(d));
    message.channel.send('Timing out user until ' + parseDate(nextD));
  },
};
