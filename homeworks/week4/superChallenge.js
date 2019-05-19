const request = require('request');
const process = require('process');

const URL = 'https://api.twitch.tv/helix/';
const CLIENT_ID = '96wokzodjysizi8omcetpzfvvohppb';
let count = 0;
let cursor = '';
let gameId;

const p = new Promise(((resolve, reject) => {
  request.get(`${URL}/games?name=${process.argv[2]}`, {
    headers: {
      'Client-ID': CLIENT_ID,
    },
  },
  ((error, response, body) => {
    if (!error && response.statusCode === 200) {
      gameId = JSON.parse(body).data[0].id;
      resolve(gameId);
    } else {
      reject(new Error(`Error in getId: ${error}`));
    }
  }));
}));

function getStream(id, after) {
  let buildURL = `${URL}/streams?game_id=${id}&first=100`;
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
      getStream(gameId, cursor);
    }
  });
}
p.then(getStream)
  .catch((error) => {
    console.warn(error);
  });
