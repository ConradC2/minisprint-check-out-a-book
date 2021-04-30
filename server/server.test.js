const app = require('./server.js');
const request = require('supertest')(app);
const { setupDatabase, dropDatabase } = require('./db/db')

/* Create Express endpoint Test: `/api/books`   */
beforeAll( async () => {
   await setupDatabase();
});

afterAll( async () => {
   await dropDatabase();
});

describe('# /api/books tests',  () => {
   it('Simply responds', async () => {
       const response = await request.get('/api/books')
        expect(response.status).toBe(200)
   });

   it('Returns an array of 10 items', async () => {
      const response = await request.get('/api/books');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(10);
   })
});

describe(' # /api/books:id tests', () => {
   it('should return a single book', async () => {
      const response = await request.get('/api/books/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
   });

   it('should return details for a book', (done) => {
      request
         .get('/api/books/1')
         .expect(200)
         .end( (err, res) => {
            if (err) return done(err);
            expect(res.body[0]).toEqual({
               author: expect.any(String),
               due_date: null,
               id: expect.any(Number),
               isCheckedOut: expect.any(Boolean),
               isbn: expect.any(String),
               title: expect.any(String),
               userID: null
            });
            return done();
         })
   });
});

describe(' # api/books/:bookId/checkout/:userId test,', () => {
   it('should be able to check out a book for two weeks', async () => {
      const response = await request.patch('/api/books/1/checkout/1');
      expect(response.status).toBe(200)
      expect(response.body.message).toBe("Okay");
   });

   it('should be able to check if a book is available to checkout', async () => {
      const response = await request.get('/api/books/2/checkout/1')
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('This book is available.');
   });

   it('should return a message notifying the user that he/she has the book checked out', async () => {
      const response = await request.get('/api/books/1/checkout/1')
         expect(response.status).toBe(200);
         expect(response.body.message).toBe('You have this book checked out.');
   })

   it('should return a message notifying the user to check back after current due date', async () => {
      const response = await request.get('/api/books/1/checkout/2')
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(`This book is checked out. Please check back after Fri May 14 2021 00:00:00 GMT+0200 (Central European Summer Time).`);
   });

   it('should allow the librarian to return a book to the "shelf"', async () => {
      const response = await request.patch('/api/books/1/return')
         expect(response.status).toBe(200);
         expect(response.body.message).toBe('This book haas been returned.');
   });
});

describe('# /api/users/ test', () => {
   it('should add a new user', async () => {
      const response = await request
         .post('/api/users/')
         .send({
            firstName: "john",
            lastName: "smith",
            librarian: false
         })
         .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('user added successfully.')
   });

   it('should be able to see a list of users that exist in the system', async () => {
      const response = await request.get('/api/users/')
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(7);
   })
});
