/// <reference types="cypress" />

describe('ToDo Functionality', () => {
  before(() => {
    cy.visit('/')
    cy.deleteAllTodos()
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('can`t create a ToDo without Label', () => {
    cy.get('app-template-todo-form div.todo-create').click()
    cy.get('app-template-todo').should('not.exist')
  })

  it('creates a ToDo', () => {
    cy.createTodo('The first ToDo', 5, false)
      .get('app-template-todo')
      .should('exist')
      .and('be.visible')
  })

  it('marks a ToDo to Done', () => {
    cy.get('app-template-todo').find('div.todo-status-check').click()

    cy.get('div.todo-entry-list').should($el => {
      expect($el.eq(0).children()).to.have.length(0)
      expect($el.eq(1).children()).to.have.length(1)
    })
  })

  it('marks a ToDo to Open', () => {
    cy.get('app-template-todo').find('div.todo-status-check').click()

    cy.get('div.todo-entry-list').should($el => {
      expect($el.eq(0).children()).to.have.length(1)
      expect($el.eq(1).children()).to.have.length(0)
    })
  })

  it("updates a ToDo's priority", () => {
    cy.get('app-template-todo')
      .find('div.todo-content-inputs')
      .dblclick()
      .find('select')
      .select(8)

    cy.get('app-template-todo').find('div.todo-update').click()

    cy.get('app-template-todo').find('select').should('contain', '8')
  })

  it("updates a ToDo's Label", () => {
    cy.get('app-template-todo')
      .find('div.todo-content-inputs')
      .dblclick()
      .find('input[type="text"]')
      .clear()
      .type('The first ToDo has a new Label')

    cy.get('app-template-todo').find('div.todo-update').click()

    cy.get('app-template-todo')
      .find('input[type="text"]')
      .should('have.value', 'The first ToDo has a new Label')
  })

  it('deletes a ToDo', () => {
    cy.get('app-template-todo').find('div.todo-delete').click()

    cy.get('div.todo-entry-list').should($el => {
      expect($el.eq(0).children()).to.have.length(0)
      expect($el.eq(1).children()).to.have.length(0)
    })
  })

  context('With many ToDos', () => {
    after(() => {
      cy.deleteAllTodos()
    })

    before(() => {
      cy.visit('/')
      cy.fixture('page').then(page => {
        page.todos.forEach((todo: any) => {
          cy.createTodo(todo.text, todo.priority, todo.done)
        })
      })
    })

    it('moves a ToDo in the List', () => {
      const drag = cy.get('div.todo-entry-list').eq(0).children().last()
      const drop = cy.get('div.todo-entry-list').eq(0).children().first()
      drop.then($el => {
        const dropPosition = $el[0].getBoundingClientRect().top

        drag.trigger('mousedown', { which: 1, force: true })
        cy.scrollTo('top')
        drag
          .trigger('mousemove', {
            which: 1,
            clientY: dropPosition,
            force: true
          })
          .trigger('mouseup', { which: 1, force: true })

        cy.get('app-template-todo')
          .first()
          .find("input[type='text']")
          .should('have.value', 'LAST ITEM')
      })
    })

    it('hides and shows a List', () => {
      cy.get('h4').eq(0).click()
      cy.get('div.todo-entry-list').should('have.length', 1)
      cy.get('h4').eq(0).click()
      cy.get('div.todo-entry-list').should('have.length', 2)
    })
  })
})
