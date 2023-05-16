/// <reference types="cypress" />

describe('ToDo Functionality', () => {
  before(() => {
    cy.clearDB().visit('/')
  })

  beforeEach(() => {
    cy.clearDB()
      .visit('/')
      .fixture('page.json')
      .then(function (json) {
        this['todo'] = json.todo
        this['todos'] = json.todos
      })
  })

  after(() => {
    cy.clearDB().visit('/')
  })

  it('can`t create a ToDo without Label', () => {
    cy.get('app-template-todo-form div.todo-create').click()
    cy.get('app-template-todo').should('not.exist')
  })

  it('creates a ToDo', function () {
    cy.createTodo(this['todo'].label, this['todo'].priority, false)
      .get('app-template-todo')
      .should('exist')
      .and('be.visible')
  })

  it('marks a ToDo to Done', function () {
    cy.createTodo(this['todo'].label, this['todo'].priority, false)
      .get('app-template-todo')
      .find('div.todo-status-check')
      .click()

    cy.get('div.todo-entry-list').should($el => {
      expect($el.eq(0).children()).to.have.length(0)
      expect($el.eq(1).children()).to.have.length(1)
    })
  })

  it('marks a ToDo to Open', function () {
    cy.createTodo(this['todo'].label, this['todo'].priority, true)
      .get('app-template-todo')
      .find('div.todo-status-check')
      .click()

    cy.get('div.todo-entry-list').should($el => {
      expect($el.eq(0).children()).to.have.length(1)
      expect($el.eq(1).children()).to.have.length(0)
    })
  })

  it("updates a ToDo's priority", function () {
    cy.createTodo(this['todo'].label, this['todo'].priority, false)
      .get('app-template-todo')
      .as('todo')
      .find('div.todo-content-inputs')
      .dblclick()
      .find('select')
      .select(this['todo'].priority_updated)

    cy.get('@todo').find('div.todo-update').click()

    cy.get('@todo')
      .find('select')
      .should('contain', this['todo'].priority_updated)
  })

  it("updates a ToDo's Label", function () {
    cy.createTodo(this['todo'].label, this['todo'].priority, false)
      .get('app-template-todo')
      .as('todo')
      .find('div.todo-content-inputs')
      .dblclick()
      .find('input[type="text"]')
      .clear()
      .type(this['todo'].label_updated)

    cy.get('@todo').find('div.todo-update').click()

    cy.get('@todo')
      .find('input[type="text"]')
      .should('have.value', this['todo'].label_updated)
  })

  it('deletes a open ToDo', function () {
    cy.createTodo(this['todo'].label, this['todo'].priority, false)
      .get('app-template-todo')
      .find('div.todo-delete')
      .click()

    cy.get('div.todo-entry-list').should($el => {
      expect($el.eq(0).children()).to.have.length(0)
      expect($el.eq(1).children()).to.have.length(0)
    })
  })

  it('deletes a open ToDo', function () {
    cy.createTodo(this['todo'].label, this['todo'].priority, true)
      .get('app-template-todo')
      .find('div.todo-delete')
      .click()

    cy.get('div.todo-entry-list').should($el => {
      expect($el.eq(0).children()).to.have.length(0)
      expect($el.eq(1).children()).to.have.length(0)
    })
  })

  it('hides and shows both List', () => {
    for (let i of [0, 1]) {
      cy.get('h4').eq(i).click()
      cy.get('div.todo-entry-list').should('have.length', 1)
      cy.get('h4').eq(i).click()
      cy.get('div.todo-entry-list').should('have.length', 2)
    }
  })

  context('With many ToDos', () => {
    it('moves a ToDo in the List', function () {
      for (let todo of this['todos']) {
        cy.createTodo(todo.label, todo.priority, todo.status)
      }

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
  })
})
