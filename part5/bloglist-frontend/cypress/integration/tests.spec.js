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
})