describe('Test of index', () => {
  beforeEach(() => {
    cy.visit('/')
  })
 
  it('Should display a heading with  SDI Library', () => {
   cy.findByRole('heading', /SDI Library/ ).should('exist');
  })


})

