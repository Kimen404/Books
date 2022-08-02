/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const books = require('./books');

// -------------------------------------------------------------MENAMBAHKAN BUKU
const addBookHandler = (request, h) => {
  // REQUEST DARI FRONT END
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
    // INSERT DATA YANG DIOLAH SEVER
  const id = nanoid(16);
  const finished = (pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  // eslint-disable-next-line eqeqeq
  // const isReading = reading == 0;
  // reading = isReading;
  // DATA YANG MAU DIMASUKAN
  const addBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
    // ERORR TIDAK MEMASUKAN NAMA
  if (name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } if (readPage >= pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(addBook);
  // LOGIKA RESPONSE
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  // GENERIC ERROR
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};
// --------------------------------------------------------- MENAMPILKAN SELURUH BUKU
const getAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  const bookName = books.filter((n) => n.name === name)[0];
  const isReading = books.filter((r) => r.reading === true);
  const isFinished = books.filter((f) => f.reading === finished);

  if (bookName !== undefined) {
    return {
      status: 'success',
      data: {
        bookName,
      },
    };
  } if (reading) {
    return {
      status: 'success',
      data: {
        isReading,
      },
    };
  } if (finished) {
    return {
      status: 'success',
      data: {
        isFinished,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Nama buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// ------------------------------------------------------------EDIT BUKU
const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
// -------------------------------------------------MENAMPILKAN DETAIL BUKU
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};
// --------------------------------------------------- DELETE BOOK
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
