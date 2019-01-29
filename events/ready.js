exports.run = (client) => {
	console.log('Puyobot ready!');

	client.user.setPresence({ game: { name: 'ready', type: 0 } });
};
