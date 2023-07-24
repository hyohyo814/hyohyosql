describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Sam',
      username: 'sorjaisam',
      password: 'banana',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('successful render', () => {
    cy.contains('blogs')
  })

  it('Login form is shown', () => {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', () => {
    it('failed login', () => {
      cy.contains('login').click()
      cy.get('#username').type('sorjaisam')
      cy.get('#password').type('apple')
      cy.get('#loginbtn').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('successful login', () => {
      cy.contains('login').click()
      cy.get('#username').type('sorjaisam')
      cy.get('#password').type('banana')
      cy.get('#loginbtn').click()

      cy.get('.notif')
        .should('contain', 'Sam logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'sorjaisam', password: 'banana' })
    })

    it('successful blog post', () => {
      cy.contains('new blog').click()
      cy.contains('create new')
      cy.get('#titleinp').type('title test')
      cy.get('#authorinp').type('author test')
      cy.get('#urlinp').type('url test')
      cy.get('#submitblog').click()

      cy.contains('title test')
      cy.contains('author test')
    })

    describe('one note in database', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'initial title',
          author: 'initial author',
          url: 'initial url',
        })
      })

      it('renders blog from database', () => {
        cy.contains('initial title')
        cy.contains('initial author')
      })

      it('expand details and like', () => {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })
    })

    describe('multiple notes in database', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'first title',
          author: 'first author',
          url: 'first url',
        })
        cy.createBlog({
          title: 'second title',
          author: 'second author',
          url: 'second url',
        })
        cy.createBlog({
          title: 'third title',
          author: 'third author',
          url: 'third url',
        })
      })

      it('expand details and like specific blog', () => {
        cy.contains('second title')
        cy.get('#blog1').contains('view').click()
        cy.contains('second url')
        cy.get('#blog1').contains('like').click()
        cy.get('#blog1').contains('likes: 1')
      })

      it('check blog display order based on likes', () => {
        cy.get('#blog0').contains('view').click()
        cy.get('#blog1').contains('view').click()
        cy.get('#blog2').contains('view').click()

        cy.get('#blog1').contains('like').click()
        cy.get('#blog2').contains('like').click()
        cy.get('#blog1').contains('like').click()
        cy.visit('')

        cy.get('#blog0').contains('second title')
        cy.get('#blog1').contains('third title')
        cy.get('#blog2').contains('first title')
      })
    })
  })
})
