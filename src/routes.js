const { addNoteHandler, getAllNotesHandler } = require("./handler");

/* eslint-disable linebreak-style */
const routes = [
    {
      method: 'POST',
      path: '/notes',
      handler: addNoteHandler,
    },
    {
      method: 'GET',
      path: '/notes',
      handler: getAllNotesHandler,
    },
  ];

module.exports = routes;
