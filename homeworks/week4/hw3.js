const request = require('request');

const url = 'https://lidemy-book-store.herokuapp.com/books';

switch (process.argv[2]) {
  case 'list':
    request.get(
      `${url}?_limit=20`,
      (error, response, body) => {
        if (error) {
          console.error(`發生錯誤: ${error}`);
          return;
        }
        const bookList = JSON.parse(body);
        for (let i = 0; i < 20; i += 1) {
          console.log(`${bookList[i].id} ${bookList[i].name}`);
        }
      },
    );
    break;
  case 'read':
    if (process.argv[3].match(/[^0-9]/)) {
      console.log('id must be integer and greater or equal to 0.');
      break;
    }
    request.get(
      `${url}/${process.argv[3]}`,
      (error, response, body) => {
        if (error) {
          console.error(`發生錯誤: ${error}`);
          return;
        }
        const bookList = JSON.parse(body);
        console.log(`${bookList.id} ${bookList.name}`);
      },
    );
    break;
  case 'delete':
    if (process.argv[3].match(/[^0-9]/)) {
      console.log('id must be integer and greater or equal to 0.');
      break;
    }
    request.delete(
      `${url}/${process.argv[3]}`,
      (error) => {
        if (error) {
          console.error(error);
        }
      },
    );
    break;
  case 'create':
    request.post(
      url, {
        form: {
          name: process.argv[3],
        },
      }, (error) => {
        if (error) {
          console.error(`發生錯誤: ${error}`);
        }
      },
    );
    break;
  case 'update':
    if (process.argv[3].match(/[^0-9]/)) {
      console.log('id must be integer and greater or equal to 0.');
      break;
    }
    request.patch(
      `${url}/${process.argv[3]}`, {
        form: {
          name: process.argv[4],
        },
      }, (error) => {
        if (error) {
          console.error(`發生錯誤: ${error}`);
        }
      },
    );
    break;
  default:
    console.log('wrong parameter!');
    break;
}
