const request = require('request');
const process = require('process');

const url = 'https://api.twitch.tv/helix/';
const client = '96wokzodjysizi8omcetpzfvvohppb';

const p = new Promise(((resolve, reject) => {
  request.get(`${url}/games?name=${process.argv[2]}`, {
    headers: {
      'Client-ID': client,
    },
  },
  ((error, response, body) => {
    if (error) {
      reject(new Error(`Error in getId: ${error}`));
      return;
    }
    setTimeout(() => {
      const gameId = JSON.parse(body).data[0].id;
      resolve(gameId);
    }, 1500);
  }));
}));

function getStreamStart(gameId) {
  return new Promise(((resolve, reject) => {
    request.get(`${url}/streams?game_id=${gameId}&first=100`, {
      headers: {
        'Client-ID': client,
      },
    }, (error, response, body) => {
      if (error) {
        reject(new Error(`Error in getStreamStart: ${error}`));
        return;
      }
      const res = JSON.parse(body);
      const gameList = res.data;
      const { cursor } = res.pagination;
      gameList.forEach((data) => {
        console.log(`${data.id} ${data.title}`);
      });
      setTimeout(() => {
        resolve(cursor);
      }, 1500);
    });
  }));
}

function getStreamEnd(cursor) {
  request.get(`${url}/streams?first=100&after=${cursor}`, {
    headers: {
      'Client-ID': client,
    },
  }, (error, response, body) => {
    if (error) {
      console.error(`Error in getStreamEnd: ${error}`);
      return;
    }
    const res = JSON.parse(body);
    const gameList = res.data;
    gameList.forEach((data) => {
      console.log(`${data.id} ${data.title}`);
    });
  });
}

p.then(getStreamStart)
  .then(getStreamEnd)
  .catch((error) => {
    console.warn(error);
  });
