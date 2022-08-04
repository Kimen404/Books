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
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(addBook);
  // LOGIKA RESPONSE
  const isSuccess = books.filter((bukuu) => bukuu.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
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
const getBookDetail = (request, h) => {
  const bookId = request.params;
  // const isi = JSON.parse(bookId);
  const bookDetail = books.filter((um) => um.id === bookId.bookId)[0];
  if (bookDetail !== undefined) {
    const response1 = h.response({
      status: 'success',
      data: { book: bookDetail },
    });

    response1.code(200);
    return response1;
  }
  const response1 = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response1.code(404);
  return response1;
};
// ------------------------------------------------------------EDIT BUKU
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

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
  const index = books.findIndex((book) => book.id === bookId);

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage >= pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
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
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
// -------------------------------------------------MENAMPILKAN DETAIL BUKU

// --------------------------------------------------- DELETE BOOK
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

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

const getBookByParams = (request, h) => {
  const { reading, finished, name } = request.query;

  // console.log(bookReading); // consoleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
  // Get all data
  if (reading === undefined && finished === undefined && name === undefined) {
    const bookAll = books.map((b) => ({
      id: b.id,
      name: b.name,
      publisher: b.publisher,
    }));

    return {
      status: 'success',
      data: {
        books: bookAll,
      },
    };
  }
                                             // GET READING & NOTREADING

  if (reading !== undefined) {
    const bookReading = books.filter((bR) => bR.reading === (reading === 1));
    const bookR = bookReading.map((Re) => ({
      id: Re.id,
      name: Re.name,
      publisher: Re.publisher,
    }));
    
    const response1 = h.response({
      status: 'success',
      data: { books: bookR },
    });
    console.log('reading');
    response1.code(200);
    return response1;
    
  }
                                            // GET FISINISHED & UNFISNISHED
  if (finished !== undefined) {
    const bookFinished = books.filter((bF) => bF.finished === (finished === '1'));
    const bookF = bookFinished.map((Fi) => ({
      id: Fi.id,
      name: Fi.name,
      publisher: Fi.publisher,
    }));

    const response1 = h.response({
      status: 'success',
      data: { books: bookF },
    });
    console.log('finished');
    response1.code(200);
    return response1;
  }
                                         // GET NAME BOOK
  if (name !== undefined) {
    const bookName = books.filter((bN) => bN.name.toLowerCase().includes(name.toLowerCase()));
    const bookN = bookName.map((Nam) => ({
      id: Nam.id,
      name: Nam.name,
      publisher: Nam.publisher,
    }));

    const response1 = h.response({
      status: 'success',
      data: { books: bookN },
    });
    console.log('filter nama buku')
    response1.code(200);
    return response1;
  }
  // BUKU TIDAK DITEMUKAN
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,

  editBookByIdHandler,
  deleteBookByIdHandler,
  getBookByParams,
  getBookDetail,
};
