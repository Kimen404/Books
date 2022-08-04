/* eslint-disable linebreak-style */
const {
  // eslint-disable-next-line max-len
  addBookHandler, editBookByIdHandler, deleteBookByIdHandler, getBookByParams, getBookDetail,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookDetail,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBookByParams,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
