const request = require('request');

const url = 'https://api.twitch.tv/helix';

const p = new Promise(((resolve, reject) => {
  request.get(`${url}/games?name=League of Legends`, {
    headers: {
      'Client-ID': '96wokzodjysizi8omcetpzfvvohppb',
    },
  },
  ((error, response, body) => {
    if (error) {
      reject(new Error(`發生錯誤: ${error}`));
      return;
    }
    const lolId = JSON.parse(body).data[0].id;
    resolve(lolId);
  }));
}));

p.then((lolId) => {
  request.get(`${url}/streams?game_id=${lolId}&first=100&after=`, {
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
      console.log(`${data.id} ${data.title}`);
    });
  });
});
