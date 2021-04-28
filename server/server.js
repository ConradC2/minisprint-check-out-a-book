const express = require('express');
const app = express();
const port = 3000;
const knex = require('knex');
const knexfile = require('./knexfile');
const db = knex(knexfile.development);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/books', async (req, res) => {
    const getAllBooks = await db.select().from('books')
    res.json(getAllBooks);
});

app.get('/api/books/:bookId', async (req, res) => {
  const id = req.params.bookId;
  const bookData = await db.select().from('books').where('id', id);
  res.json(bookData);
});

app.patch('/api/books/:bookId/checkout/:userId', async (req, res) => {
    const id = req.params.bookId;
    const userID = req.params.userId;
    const dueDate = new Date() 
    dueDate.setDate(dueDate.getDate() + 14)
    const bookData = await db
      .select()
      .from('books')
      .where('id', id)
      .update({
        isCheckedOut: true,
        due_date: dueDate,
        userID: userID,
      });
    res.json({Message: 'Okay'})
    });
    
    app.get('/api/books/:bookId/checkout/:userId', async (req, res) => {
        const id = req.params.bookId;
        const userID = req.params.userId;
        const bookData = await db
          .select()
          .from('books')
          .where('id', id)
        const checkoutStatus = bookData.isCheckedOut;
        if(!checkoutStatus) {
          res.json({Message: 'This book is available.'})
        } else {
          res.json({Message: `This book is checked out. Please check back after ${bookData.due_date}.`})
        }
        
    })

module.exports = app;

