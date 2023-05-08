/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable max-len */

describe('Edit claim Test', () => {
  const editedText = 'Edit Title of claim';
  it('go to profile, my claims and edit first claim', () => {
    cy.intercept('PATCH', '/v1/articles/**/claims/**', (req) => {
      expect(req.body.text).to.equal(editedText);
    }).as('editClaim');

    // Login
    cy.visit({
      url: 'http://localhost:3001/sign-in',
      method: 'GET',
    });
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('test123');
    cy.get('#signin').click();

    // go to profile page
    cy.get('#dropDownUserMenu').click();
    cy.get('#dropDownItemProfile').click();

    // edit first claim
    cy.wait(600);
    cy.get('.myClaimsProfile').first().click();
    cy.get('.claimComponent .editClaimProfile').first().click();
    cy.get('#editTextClaim').clear();
    cy.get('#editTextClaim').type(editedText);
    cy.get('#submitChangedClaim').click();

    cy.wait('@editClaim').its('response.body').should((response) => {
      const { text } = response;
      expect(text).to.equal(editedText);
    });
  });
});
