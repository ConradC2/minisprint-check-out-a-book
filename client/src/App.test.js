import { render, screen } from '@testing-library/react';
import App from './App';


const books = [
  { title: 'Lord of the Rings', Author: 'J. R. R. Tolkien' , ISBN: '0618645616', Status: 'In'},
  { title: 'The Prince', Author: 'Niccolo Machiavelli' , ISBN: '1640320199', Status: 'In'},
  { title: 'Becoming', Author: 'Michele Obama' , ISBN: '1524763136', Status: 'In'},
  { title: 'Promised Land', Author: 'Barack Obama' , ISBN: '1524763160', Status: 'In'},
  { title: 'Ilium', Author: 'Dan Simmons' , ISBN: '0380978939', Status: 'In'},
  { title: 'Lord of the Flies', Author: 'William Golding' , ISBN: '0143124293'},
  { title: 'Grapes of Wrath', Author: 'John Steinbeck' , ISBN: '067001690X', Status: 'In'},
  { title: 'Count of Monte Cristo', Author: 'Alexander Dumas' , ISBN: '9780141392462', Status: 'In'},
  { title: 'The Idiot', Author: 'Fyodor Dostoevsky' , ISBN: '0375702245', Status: 'In'},
  { title: 'City of Thieves', Author: 'David Benioff' , ISBN: '0670018703', Status: 'In'},
];


describe('Main page tests', () => {
  beforeEach(()=>{
    render(<App />);

  });

  test('Displays a Heading', () => {
    const title = screen.getByText(/SDI Library/i);
    expect(title).toBeInTheDocument();
  });

  test('Displays a list of books', () => {
    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
    const listitems = screen.getAllByRole('listitem');
    expect(listitems).toHaveLength(10);
  });
  
  test('Listitems contains, title, author, ISBN number and if its checkedOut', () => {
    const itemTitle = screen.getByText(/Lord of the Rings/i);
    expect(itemTitle).toBeInTheDocument();
    const itemAuthor = screen.getByText(/David Benioff/i);
    expect(itemAuthor).toBeInTheDocument();
    const itemISBN = screen.getByText(/067001690X/);
    expect(itemISBN).toBeInTheDocument();
    const itemStatus = screen.getAllByText(/In/);
    expect(itemStatus.length).toBeGreaterThan(1);
  });

});

describe("Tests frontend requests to backend API", () => {
  beforeEach(() => {
    const mockResponse = "test";
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse)
    })
    render(<App />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('expect fetch to have been called', async () => {
    expect(fetch).toHaveBeenCalled();
  });

})
