describe('Initial Page load', () => {
  before(() => {
    cy.visit('http://localhost:8080/').wait(1000)
    cy.deleteAllTodos()
  })

  beforeEach(() => {
    cy.visit('http://localhost:8080/')
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

describe('ToDo Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
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
    // beforeAll(() => {})

    // afterAll(() => {
    //   cy.deleteAllTodos()
    // })

    it('moves a ToDo in the List', () => {})
    it('hides a List', () => {})
  })
})
