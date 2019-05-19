const request = require('request');

const URL = 'https://api.twitch.tv/helix';
const CLIENT_ID = '96wokzodjysizi8omcetpzfvvohppb';
let count = 0;
let cursor = '';
let lolId;

const p = new Promise(((resolve, reject) => {
  request.get(`${URL}/games?name=League of Legends`, {
    headers: {
      'Client-ID': CLIENT_ID,
    },
  },
  ((error, response, body) => {
    if (!error && response.statusCode === 200) {
      lolId = JSON.parse(body).data[0].id;
      resolve(lolId);
    } else {
      reject(new Error(`Error in getId: ${error}`));
    }
  }));
}));

function getStream(gameId, after) {
  let buildURL = `${URL}/streams?game_id=${gameId}&first=100`;
  if (after !== undefined) {
    buildURL += `&after=${after}`;
  }
  request.get(buildURL, {
    headers: {
      'Client-ID': CLIENT_ID,
    },
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const res = JSON.parse(body);
      const gameList = res.data;
      gameList.forEach((data) => {
        console.log(`${data.id} ${data.title}`);
      });
      const { cursor: getCursor } = res.pagination;
      cursor = getCursor;
      count += gameList.length;
    } else {
      console.error(`Error in getStream: ${error}`);
    }
    if (count < 200) {
      getStream(lolId, cursor);
    }
  });
}
p.then(getStream)
  .catch((error) => {
    console.warn(error);
  });
