describe('Form Submission Test', () => {
  beforeEach(() => {
    // Stub the external API call
    cy.intercept(
      {
        method: 'POST',
        url: '/auth/login',
      },
      {
        statusCode: 200,
        body: { success: true, message: 'Form submitted successfully' },
      },
    ).as('submitForm');
  });

  it('fills in the login form and submits it', () => {
    cy.visit({
      url: 'http://localhost:3001/sign-in',
      method: 'GET',
    }); // Visit your app's homepage or the page with the form
    // Fill in the form with email and password
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('test123');

    // Submit the form
    cy.get('#signin').click();

    // Assert the stubbed API call's request and response
    cy.wait('@submitForm').its('request.body').should('deep.equal', {
      email: 'test@test.com',
      password: 'test123',
    });

    cy.wait('@submitForm').its('response.body').should('deep.equal', {
      success: true,
      message: 'Form submitted successfully',
    });

    // Add any other assertions you need, e.g., checking for success messages or UI updates
  });
});
