import './App.css';
import { useEffect, useState } from 'react';
import { Typography, CssBaseline, makeStyles, Container, TextField } from '@material-ui/core';
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './styles'
import Books from './components/Books'
import List from '@material-ui/core/Card';

import Grid from '@material-ui/core/Grid'
import { Card } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(styles)

function App() {
 const [currentUser, setCurrentUser] = useState('')
 const [users, setUsers] = useState([]);
 const [books, setBooks]  = useState([]);
 const classes = useStyles();
  
  useEffect( () => {
    const URL = 'http://localhost:8080/api/books';
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      setBooks(data);
    }
    );
  },[]);

  useEffect( () => {
    const URL = 'http://localhost:8080/api/users';
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
       setUsers(data);
    }
    );
  }, []);
  
  const handleUserChange = (e) => {
    setCurrentUser(e.target.value)
  }

  const handleCheckInCheckOut = (event) => {
    const idOfUpdatedItem = parseInt(event.currentTarget.dataset.bookid);
    console.log('clicked', event.target.dataset, event.currentTarget)

    setBooks((prevBooks) => { 
     const dueDate = new Date() 
     dueDate.setDate(dueDate.getDate() + 14)
     
     const newBooks = prevBooks.map((book) => {
       if(book.id === idOfUpdatedItem ) {
        if(book.isCheckedOut) {
          const newBookIn = {
              ...book,
              isCheckedOut: false,
              userId: null,
              due_date: null
            }
          return newBookIn;
        } else {
          const newBookOut = {
              ...book,
              isCheckedOut: true,
              userId: currentUser,
              due_date: dueDate.toLocaleDateString()
            }
          return newBookOut;
        }
       }
       return book;
     })
     return newBooks;
    })
  }


  return (
    <>
      <CssBaseline />
    <div className="App" className={classes.root}>
      <Header />
      <Container justify='center' className={classes.container}>
        <main>
          <label htmlFor="userId">User Id </label>
          <TextField name="userId" value={currentUser} onChange={handleUserChange} type='number' />
            <List>
            {
              books.map(book => {
                return(
                  <Books key={book.id} book={book} handleCheckInCheckOut={handleCheckInCheckOut}/>
                )
              })
            }
            </List>

        </main>
        <div className="users" className={classes.root}>
          {
           users.map(user => {
             return (
             <Card key={user.id}> 
                <CardHeader>
                </CardHeader>
                {user.firstName} 
                  {user.lastName}
             </Card>
               )
           }) 
          }
          </div>

      </Container>
      <Footer />
    </div>
      </>
  );
}

export default App;

