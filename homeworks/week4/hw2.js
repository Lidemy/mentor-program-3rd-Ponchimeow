const request = require('request');

const pro3 = process.argv[3];

request(
  'https://lidemy-book-store.herokuapp.com/books',
  (error, response, body) => {
    const bookList = JSON.parse(body);
    switch (process.argv[2]) {
      case 'list':
        for (let i = 0; i < 20; i += 1) {
          console.log(`${bookList[i].id} ${bookList[i].name}`);
        }
        break;
      case 'read':
        if (pro3.match(/[^0-9]/)) {
          console.log('id must be integer and greater or equal to 0.');
          break;
        }
        console.log(bookList[pro3].id);
        if (bookList[pro3].id === undefined) {
          console.log('無此 id 的書籍');
          break;
        }
        console.log(`${bookList[pro3].id} ${bookList[pro3].name}`);
        break;
      default:
        console.log('wrong parameter!');
        break;
    }
  },
);
