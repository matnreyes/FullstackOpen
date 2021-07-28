describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')

    const testUser = {
      username: 'admin',
      password: 'password',
      name: 'Testing account'
    }

    cy.request('POST', 'http://localhost:3003/api/users', testUser)
  })

  it('Login form is shown', function() {
    cy.get('.login-form')
  })

  describe('Login tests', function() {
    it('Login successful with credentials', function() {
      cy.get('#username-input').type('admin')
      cy.get('#password-input').type('password')
      cy.get('.login-button').click()

      cy.contains('logged in')
    })

    it('Login fails with credentials', function() {
      cy.get('#username-input').type('wrongUsername')
      cy.get('#password-input').type('wrongPassword')
      cy.get('.login-button').click()

      cy.contains('wrong credentials').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When user logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'admin', password: 'password'
      }).then(response => {
        localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
        window.localStorage.setItem('tokenExpiration', (new Date()).getTime() + (1000 * 60 * 60))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('testurl.com')
      cy.get('.blog-submit').click()
    })
  })
})