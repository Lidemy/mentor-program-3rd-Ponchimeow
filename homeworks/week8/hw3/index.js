const request = new XMLHttpRequest();
const clientID = 'pz2c9cfu9pyq1epxgfv2ol30btvnws';
const url = 'https://api.twitch.tv/kraken/';
const streamList = document.querySelector('.stream-list');

const game = 'League%20of%20Legends';

function setStreams(data) {
  for (let i = 0; i < data.length; i += 1) {
    const div = document.createElement('div');
    div.classList.add('stream-list__stream');
    div.innerHTML = `
    <a href="${data[i].channel.url}" target="_blank">
    <div class="stream__preview">
      <img src="${data[i].preview.medium}"/>
    </div>
    <div class="stream-avatar">
        <div class="stream-avatar__logo">
          <img src="${data[i].channel.logo}"/>
        </div>
        <div class="stream-avatar__avatar-info">
          <div class="avatar-info__status">
            ${data[i].channel.status}
          </div>
          <div class="avatar-info__display_name">
            ${data[i].channel.display_name}
          </div>
        </div>
    </div>
    </a>
      `;
    streamList.appendChild(div);
  }
  return data;
}


request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const res = request.responseText;
    const { streams } = JSON.parse(res);
    setStreams(streams);
  } else {
    console.log('err');
  }
};

request.onerror = () => {
  console.log(request.status);
};

request.open('GET', `${url}streams?game=${game}&limit=20`, true);
request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
request.setRequestHeader('Client-ID', clientID);
request.send();
