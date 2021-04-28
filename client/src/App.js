import './App.css';
import { useEffect } from 'react';

function App() {
  
  useEffect( () => {
    const URL = 'http://localhost:8080';
    fetch(URL).then(()=> {
      console.log("test")
    });

  },[]);


  const books = [
    { id: 1, Title: 'Lord of the Rings', Author: 'J. R. R. Tolkien' , ISBN: '0618645616', Status: 'In'},
    { id: 2, Title: 'The Prince', Author: 'Niccolo Machiavelli' , ISBN: '1640320199', Status: 'In'},
    { id: 3, Title: 'Becoming', Author: 'Michele Obama' , ISBN: '1524763136', Status: 'In'},
    { id: 4, Title: 'Promised Land', Author: 'Barack Obama' , ISBN: '1524763160', Status: 'In'},
    { id: 5, Title: 'Ilium', Author: 'Dan Simmons' , ISBN: '0380978939', Status: 'In'},
    { id: 6, Title: 'Lord of the Flies', Author: 'William Golding' , ISBN: '0143124293'},
    { id: 7, Title: 'Grapes of Wrath', Author: 'John Steinbeck' , ISBN: '067001690X', Status: 'In'},
    { id: 8, Title: 'Count of Monte Cristo', Author: 'Alexander Dumas' , ISBN: '9780141392462', Status: 'In'},
    { id: 9, Title: 'The Idiot', Author: 'Fyodor Dostoevsky' , ISBN: '0375702245', Status: 'In'},
    { id: 10, Title: 'City of Thieves', Author: 'David Benioff' , ISBN: '0670018703', Status: 'In'},
  ];
  
  return (
    <div className="App">
      <h1>SDI Library</h1>
      <ul>
        {
          books.map(book => {
            return(
              <li key={book.id}>{book.Title} by {book.Author} ISBN: {book.ISBN} Status: {book.Status}</li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;


//  test('Listitems contains, title, author, ISBN number and if its checkedOut', () => {
