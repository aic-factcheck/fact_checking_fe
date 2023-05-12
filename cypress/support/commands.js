Cypress.Commands.add('login', () => {
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
});
