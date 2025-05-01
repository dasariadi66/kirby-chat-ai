describe('Chat with Kirby app', () => {
  beforeEach(() =>{
    cy.visit('/')
  })
  it('should display to user the button ask kirby', () => {
    cy.get('.search-container').should('exist');
    cy.get('#askKirby').should('contain', 'Ask Kirby')
  })
  it('should allow the user to ask question and clear chat logs', () =>{
    cy.get('#searchInput').type('How is your day?')
    cy.get('#askKirby').click();
    cy.wait(3000)
    cy.get('.chat-message.user').should('contain', 'How is your day?')
    cy.get('.chat-message.kirby').should('contain', 'Kirby says:')
    cy.get('#clearChat').click();
    cy.get('#chatHistory').should('not.be.visible')
  })
  it('should allow user to clear question', () =>{
    cy.get('#searchInput').type('What is love?');
    cy.get('#clearQuestion').click();
    cy.get('#searchInput').should('not.have.text', 'What is love?')
  })

})