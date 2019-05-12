const request = require('request');

request(
  'https://lidemy-book-store.herokuapp.com/books',
  (error, response, body) => {
    const bookList = JSON.parse(body);
    for (let i = 0; i < 10; i += 1) {
      const book = bookList[i];
      console.log(`${book.id} ${book.name}`);
    }
  },
);
