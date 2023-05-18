describe('Login Test', () => {
  /*  beforeEach(() => {
  });  */

  it('fills in the login form and submits it', () => {
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

    // Assert the stubbed API call's request and response
    cy.wait('@login').its('response.body').should((response) => {
      expect(response).to.have.property('token');
      expect(response).to.have.nested.property('token.accessToken');
      expect(response).to.have.nested.property('token.expiresIn');
      expect(response).to.have.nested.property('token.refreshToken');

      expect(response).to.have.property('user');
      expect(response).to.have.nested.property('user.email');
      expect(response).to.have.nested.property('user.role');
      expect(response).to.have.nested.property('user.id');
      expect(response).to.have.nested.property('user.level');
    });
  });

  it('fills in the login incorrectly and submits it', () => {
    // intercept login api call
    cy.intercept('POST', '**/v1/auth/login', (req) => {
      expect(req.body).to.deep.equal({ email: 'aaaaaaaa.com', password: 'test123' });
    }).as('login');

    // sign in
    cy.visit({
      url: 'http://localhost:3001/sign-in',
      method: 'GET',
    });

    // Fill in form with email and password
    cy.get('#email').type('aaaaaaaa.com');
    cy.get('#password').type('test123');

    // Submit the form
    cy.get('#signin').click();

    // Assert the stubbed API call's request and response
    cy.wait('@login').its('response').should((response) => {
      expect(response?.statusCode).to.eq(400);
    });
  });
});
