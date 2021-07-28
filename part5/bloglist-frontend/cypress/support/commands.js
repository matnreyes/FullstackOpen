// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username: username, password: password
  }).then(response => {
    localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
    window.localStorage.setItem('tokenExpiration', (new Date()).getTime() + (1000 * 60 * 60))
  })
})

Cypress.Commands.add('defaultPop', () => {
  for(let i = 0; i < 5; i++) {
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: {
        title: `blog${i} title`,
        author: `blog${i} author`,
        url: `blog${i} url`,
        likes: i
      },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
      }
    })
  }
})

Cypress.Commands.add('logout', () => {
  localStorage.removeItem('loggedBloglistUser')
  localStorage.removeItem('tokenExpiration')
})