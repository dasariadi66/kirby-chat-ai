xdescribe('Chat with Kirby app', () => {
  beforeEach(() =>{
    cy.visit('/')
  })
  it('should display to user the button ask kirby', () => {
    cy.get('search-container').should('exist');
    cy.get('#askKirby').should('contain', 'Ask Kirby')
  })
  it('should allow the user to ask question', () =>{
    cy.get('#searchInput').type('How is your day?')
    cy.get('#askKirby').click();
    cy.wait(3000)
    cy.get('.chat-message.user').should('contain', 'How is your day?')
    cy.get('.chat-message.kirby').should('contain', 'Kirby says:')
  })
  it('should allow user to clear chat logs', () =>{
  })

})