/* eslint-disable cypress/no-unnecessary-waiting */
describe('Login logout Test', () => {
  /*  beforeEach(() => {
    });  */

  it('login and logout', () => {
    // intercept login api call
    cy.intercept('POST', '**/v1/auth/login', (req) => {
      expect(req.body).to.deep.equal({ email: 'test@test.com', password: 'test123' });
    }).as('login');

    // sign in
    cy.visit({
      url: 'http://localhost:3001/sign-in',
      method: 'GET',
    });

    // Fill in form with email and password
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('test123');

    // Submit the form
    cy.get('#signin').click();

    cy.wait(100);

    cy.get('#dropDownUserMenu').click();
    cy.get('#dropDownItemLogout').click();

    // check if accessToken removed
    assert.equal(localStorage.getItem('accessToken'), null);
  });
});
