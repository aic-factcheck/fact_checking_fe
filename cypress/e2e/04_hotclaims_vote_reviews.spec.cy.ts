/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable max-len */

describe('Hot claims and upvotes/downvotes Test', () => {
  it('checks hot claims and downvotes and upvotes first', () => {
    // unfortunately backend doesn't return if user voted for claim, so we can just verify api call
    // we also made mechanism so repeatedly upvoting/downvoting results only in one call

    // Login
    cy.visit({
      url: 'http://localhost:3001/sign-in',
      method: 'GET',
    });
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('test123');
    cy.get('#signin').click();

    // go to hot claims
    cy.get('#claimsLink').click();

    // downvote two times - downvote api was called one
    cy.intercept('**/vote?claimId=*', {
      body: {
        rating: -1,
      },
    }).as('downvote');
    cy.wait(1000);
    cy.get('.claimComponent .downvoteClaimButton').first().click();
    cy.wait(200);
    cy.get('.claimComponent .downvoteClaimButton').first().click();
    cy.get('@downvote.all').should('have.length', 1);

    // upvote two times - upvote api was called once
    cy.intercept('**/vote?claimId=*', {
      body: {
        rating: 1,
      },
    }).as('upvote');
    cy.wait(1000);
    cy.get('.claimComponent .upvoteClaimButton').first().click();
    cy.wait(200);
    cy.get('.claimComponent .upvoteClaimButton').first().click();
    cy.get('@upvote.all').should('have.length', 1);
  });
});
