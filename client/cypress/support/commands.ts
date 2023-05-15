/// <reference types="cypress" />

export {}
declare global {
  namespace Cypress {
    interface Chainable {
      createTodo(
        name: string,
        priority: VALID_PRIORITIES,
        done: boolean
      ): Chainable<void>
      deleteAllTodos(): Chainable<void>
    }
  }
}

type VALID_PRIORITIES = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

Cypress.Commands.add(
  'createTodo',
  (name: string, priority: VALID_PRIORITIES, done: boolean) => {
    cy.get('app-template-todo-form input[type="text"]').type(name)
    cy.get('app-template-todo-form select').select(priority)
    cy.get('app-template-todo-form div.todo-create').click()

    if (!done) return

    cy.get('div.todo-entry-list')
      .eq(0)
      .last()
      .find('div.todo-status-check')
      .click()
  }
)

Cypress.Commands.add('deleteAllTodos', () => {
  cy.get('app-template-todo')
    .should('have.length.at.least', 0)
    .each($el => {
      cy.wrap($el).find('div.todo-delete').click()
    })
})
