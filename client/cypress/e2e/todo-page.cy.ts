/// <reference types="cypress" />

describe('Initial Page load', () => {
  before(() => {
    cy.visit('/')
    cy.deleteAllTodos()
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the Title', () => {
    cy.get('app-template-header')
      .should('exist')
      .should('be.visible')
      .and('contain', 'DoYourTodos')
  })

  it('renders the Create ToDo form', () => {
    cy.get('app-template-todo-form').should('exist').and('be.visible')

    cy.get('app-template-todo-form')
      .find('input[type="text"]')
      .should('exist')
      .and('be.visible')
      .and('have.value', '')
      .and('have.attr', 'placeholder', 'Label of the ToDo')

    cy.get('app-template-todo-form')
      .find('select')
      .should('exist')
      .and('be.visible')
      .and('have.value', '5')
      .find('option')
      .should('have.length', 11)

    cy.get('app-template-todo-form')
      .find('div.todo-create')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Create')
  })

  it('renders both lists with 0 entries', () => {
    cy.get('h4')
      .should('exist')
      .and('be.visible')
      .and('have.length', 2)
      .and($lis => {
        expect($lis.eq(0)).to.contain('Open')
        expect($lis.eq(1)).to.contain('Done')
      })

    cy.get('div.todo-entry-list')
      .should('exist')
      .and('have.length', 2)
      .each($el => {
        cy.wrap($el).children().should('have.length', 0)
      })
  })
})
