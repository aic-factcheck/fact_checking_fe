describe('Login Test', () => {
  it('fills in the register form and logins', () => {
    // intercept register api call
    const myID = Math.floor(Math.random() * 10000000);
    const firstN = 'John';
    const lastN = 'Test';
    const mail = `test${myID}@test.com`;
    const passw = 'mypassword';

    cy.intercept('POST', '**/v1/auth/register', (req) => {
      expect(req.body).to.deep.equal({
        firstName: firstN, lastName: lastN, email: mail, password: passw,
      });
    }).as('register');

    cy.visit({
      url: 'http://localhost:3001/sign-up',
      method: 'GET',
    });

    // Fill in form with email and password
    cy.get('#firstNameRegister').type(firstN);
    cy.get('#lastNameRegister').type(lastN);

    cy.get('#emailRegister').type(mail);
    cy.get('#passwordRegister').type(passw);

    // Submit the form
    cy.get('#submitRegister').click();

    // Assert the stubbed API call's request and response
    cy.wait('@register').its('response.body').should((response) => {
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

  it('fills wrong email in the register form', () => {
    // intercept register api call
    const firstN = 'John';
    const lastN = 'Test';
    const mail = 'aaaaa.com';
    const passw = 'mypassword';

    cy.intercept('POST', '**/v1/auth/register', (req) => {
      console.log(req);
      expect(req.body).to.deep.equal({
        firstName: firstN, lastName: lastN, email: mail, password: passw,
      });
    }).as('register');

    cy.visit({
      url: 'http://localhost:3001/sign-up',
      method: 'GET',
    });

    // Fill in form with email and password
    cy.get('#firstNameRegister').type(firstN);
    cy.get('#lastNameRegister').type(lastN);

    cy.get('#emailRegister').type(mail);
    cy.get('#passwordRegister').type(passw);

    // Submit the form
    cy.get('#submitRegister').click();

    // Assert the stubbed API call's request and response
    cy.wait('@register').its('response').should((response) => {
      expect(response?.statusCode).to.eq(400);
    });
  });
});
