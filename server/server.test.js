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

describe('# /api/books tests', () => {
   it('Simply responds', function(done) {
       request
        .get('/api/books')
        .expect(200, done)
   });

   it('Returns an array of 10 items', async () => {
      const response = await request.get('/api/books');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(10);
   })
});

describe(' # /api/books:id tests', () => {
   it('should return a single book', done => {
      request
      .get('/api/books/1')
      .expect(200)
      .end( (err, res) => {
         expect(res.body.length).toBe(1)
         done();
      });
   });

   it('should return details for a book', (done) => {
      request
         .get('/api/books/1')
         .expect(200)
         .end( (err, res) => {
            if (err) return done(err);
            expect(res.body[0]).toEqual({
               author: expect.any(String),
               due_date: expect.any(String),
               id: expect.any(Number),
               isCheckedOut: expect.any(Boolean),
               isbn: expect.any(String),
               title: expect.any(String),
               userID: expect.any(Number)
            });
            return done();
         })
   });
});

describe(' # api/books/:bookId/checkout/:userId test,', () => {
   it('should be able to check out a book for two weeks', (done) => {
      request
         .patch('/api/books/1/checkout/1')
         .expect(200, {
            Message: 'Okay'
         }, done)
   });

   it('should be able to check if a book is available to checkout', (done) => {
      request
         .get('/api/books/2/checkout/1')
         .expect(200, {
            Message: 'This book is available.'
         }, done)
   })

});

// Possibility 0:
// GET /api/books/2/checkout/3 - user wants to check availability of a book that's not checkout
// RESPONSE { message: "the book is available"}

// Possibility 1:
// GET /api/books/2/checkout/3 - same user wants to checkout books
// RESPONSE { message: "you have this book checked out"}

// Possibility 2:
// GET /api/books/1/checkout/6 - another user wants to checkout same books
// RESPONSE { message: `check back after the current due date ${due_date} of the book`}

/*
- [ ] As a user, I want to know if a book is available to checkout (if I am the person that checked it out, I should 
   see a message indicating that I have the book already and if someone else checked the book out, 
   I should see a message telling me to check back after the current due date of the book), so that I can save time.
    API endpoint: `/api/books/:bookId/checkout/:userId`
*/