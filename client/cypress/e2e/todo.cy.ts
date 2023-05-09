describe('ToDo App', () => {
  it('loaded Page', () => {
    cy.visit('http://localhost:8080/')
    cy.title().should('eq', 'ToDo App')
  })
})
