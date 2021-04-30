const express = require('express');
const app = express();
const knex = require('knex');
const knexfile = require('./knexfile');
const db = knex(knexfile.development);
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000' }));

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
    res.json({message: 'Okay'})
  });
    
  app.get('/api/books/:bookId/checkout/:userId', async (req, res) => {
      const id = parseInt(req.params.bookId);
      const userID = parseInt(req.params.userId);
      const response = await db
        .select()
        .from('books')
        .where('id', id)
      const bookData = response[0];
      
      let message = '';
      
      if(!bookData.isCheckedOut) {
        message = {message: `This book is available.`};
      } else {
        if(bookData.userID === userID ) {
            message = {message: `You have this book checked out.`};
        } else {
          message = {message: `This book is checked out. Please check back after ${bookData.due_date}.`};
        }
      }
      res.json(message)
  });

  app.patch('/api/books/:bookId/return', async (req, res) => {
    const id = parseInt(req.params.bookId);
    const bookReturn = await db
      .select()
      .from('books')
      .where('id', id)
      .update({
        isCheckedOut: false,
        userID: null,
        due_date: null,
      });
    let message = '';
    if(bookReturn > 0) {
      message = {message: 'This book haas been returned.'}
    } else {
      message = {message: 'This book cannot be returned.'}
    };    
    res.json(message);
  })

  app.post('/api/users', async (req, res) => {
    const newUser = req.body;
    const result = await db.from('users').insert(newUser, ['id']);
    let message = '';
    if (result.length > 0) {
      message = { message: 'user added successfully.', result}
    } else {
      message = { message: 'unable to add user.'}
    }
    console.log(result)
    res.json(message);
  })

  app.get('/api/users', async (req, res) => {
    const getAllUsers = await db.select().from('users');
    res.json(getAllUsers);
  })



module.exports = app;
