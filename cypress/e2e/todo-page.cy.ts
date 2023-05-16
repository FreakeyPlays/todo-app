/// <reference types="cypress" />

describe('Initial Page load', () => {
  before(() => {
    cy.clearDB().visit('/')
  })

  beforeEach(() => {
    cy.clearDB().visit('/')
    cy.fixture('page.json').then(function (json) {
      this['todo'] = json.todo
    })
  })

  after(() => {
    cy.clearDB().visit('/')
  })

  afterEach(() => {
    cy.clearDB().visit('/')
  })

  it('renders the Title', () => {
    cy.get('app-template-header')
      .should('exist')
      .should('be.visible')
      .and('contain', 'DoYourTodos')
  })

  it('renders the Create ToDo form', () => {
    cy.get('app-template-todo-form')
      .as('form')
      .should('exist')
      .and('be.visible')

    cy.get('@form')
      .find('input[type="text"]')
      .should('exist')
      .and('be.visible')
      .and('have.value', '')
      .and('have.attr', 'placeholder', 'Label of the ToDo')

    cy.get('@form')
      .find('select')
      .should('exist')
      .and('be.visible')
      .and('have.value', '5')
      .find('option')
      .should('have.length', 11)

    cy.get('@form')
      .find('div.todo-create')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Create')
  })

  it('renders a open ToDo', function () {
    cy.createTodo(this['todo'].label, this['todo'].priority, false)
      .get('app-template-todo')
      .as('todo')
      .should('have.length', 1)
      .and('exist')
      .and('be.visible')

    cy.get('@todo')
      .find('div.todo-dnd-handle')
      .should('exist')
      .and('be.visible')
      .find('img')
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'src', './assets/svg/drag.svg')
      .and('have.attr', 'alt', 'Drag and Drop Handle')

    cy.get('@todo')
      .find('div.todo-status-check')
      .should('exist')
      .and('be.visible')
      .find('img')
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'src', './assets/svg/checkbox.svg')
      .and('have.attr', 'alt', 'Empty Checkbox Icon')

    cy.get('@todo')
      .find('div.todo-content-inputs input[type="text"]')
      .should('exist')
      .and('be.visible')
      .and('have.value', this['todo'].label)
      .and('have.attr', 'readonly')

    cy.get('@todo')
      .find('div.todo-content-inputs select')
      .should('exist')
      .and('be.visible')
      .and('have.value', this['todo'].priority)
      .and('have.attr', 'disabled')

    cy.get('@todo')
      .find('div.todo-delete')
      .should('exist')
      .and('be.visible')
      .find('img')
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'src', './assets/svg/delete.svg')
      .and('have.attr', 'alt', 'Delete ToDo')

    cy.get('div.todo-entry-list')
      .as('list')
      .eq(0)
      .children()
      .should('have.length', 1)

    cy.get('@list').eq(1).children().should('have.length', 0)

    cy.deleteAllTodos()
  })

  it('renders a done ToDo', function () {
    cy.createTodo(this['todo'].label, this['todo'].priority, true)
      .get('app-template-todo')
      .as('todo')
      .should('have.length', 1)
      .and('exist')
      .and('be.visible')

    cy.get('@todo')
      .find('div.todo-status-check')
      .should('exist')
      .and('be.visible')
      .find('img')
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'src', './assets/svg/checkbox-checked.svg')
      .and('have.attr', 'alt', 'Done Checkbox Icon')

    cy.get('@todo')
      .find('div.todo-content-inputs input[type="text"]')
      .should('exist')
      .and('be.visible')
      .and('have.value', this['todo'].label)
      .and('have.attr', 'disabled')

    cy.get('@todo')
      .find('div.todo-content-inputs select')
      .should('exist')
      .and('be.visible')
      .and('have.value', this['todo'].priority)
      .and('have.attr', 'disabled')

    cy.get('@todo')
      .find('div.todo-delete')
      .should('exist')
      .and('be.visible')
      .find('img')
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'src', './assets/svg/delete.svg')
      .and('have.attr', 'alt', 'Delete ToDo')

    cy.get('div.todo-entry-list')
      .as('list')
      .eq(0)
      .children()
      .should('have.length', 0)

    cy.get('@list').eq(1).children().should('have.length', 1)

    cy.deleteAllTodos()
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
