describe('Test of index', () => {
  beforeEach(() => {
    cy.visit('/')
  })
 
  it('Should display a heading with  SDI Library', () => {
   cy.findAllByRole('heading', /SDI Library/ ).should('exist');
  })

  it('Should be able to see a list of evey book in the library', () => {
   cy.findAllByRole('listitem').should('have.length', 10);
  })
  
  it('Should show title, author, ISBN, and checkout status', () => {
    cy.findAllByRole('listitem').findByText(/Lord of the Rings/i).findByText(/ISBN/i)
  });
  
  it('should show the due date and id of person who checked out book for checked out items.', ()=> {
    cy.get('[data-bookid=1]').click()
    cy.findAllByRole('listitem').findByText(/Status: Out/i).findByText(/1/i)
  })

  it('should list all users in the system', () => {
    cy.get('#userlist').should('exist');
  });

})

