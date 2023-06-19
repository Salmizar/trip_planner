describe('Checking Login Page Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  it('Check Forgot password redirect', () => {
    cy.get('a').contains('Forgot Password')
    .click()
    cy.url().should('include', '/reset')
  })
  it('Check register redirect', () => {
    cy.get('a').contains('Register')
    .click()
    cy.url().should('include', '/register')
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
