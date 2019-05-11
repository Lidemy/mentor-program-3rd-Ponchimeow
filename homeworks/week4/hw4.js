const request = require('request');

const url = 'https://api.twitch.tv/helix/games/top';

request.get(url, {
  headers: {
    'Client-ID': '96wokzodjysizi8omcetpzfvvohppb',
  },
}, (error, response, body) => {
  if (error) {
    console.error(`發生錯誤: ${error}`);
    return;
  }
  const gameList = JSON.parse(body).data;
  gameList.forEach((data) => {
    console.log(`${data.id} ${data.name}`);
  });
});
