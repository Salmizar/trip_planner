describe('Load Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  it('Login to the application', () => {
    cy.get('input[name="userName"]')
    .type('chris@salmizar.com')
    .should('have.value','chris@salmizar.com')
    .get('input[name="password"]')
    .type('password')
    .should('have.value','password')
    .get ('button[name="loginBtn"]')
    .click()
    cy.url().should('include', '/dashboard/calendar')
  })
})
