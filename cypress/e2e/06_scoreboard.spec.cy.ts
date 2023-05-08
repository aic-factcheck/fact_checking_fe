/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable max-len */

describe('Scoreboard Test', () => {
  // eslint-disable-next-line no-undef-init
  it('check if scoreboard contains all loaded data test', () => {
    cy.intercept('GET', '**/v1/stats', (req) => {
      delete req.headers['if-none-match'];
    }).as('profileInfo');
    cy.intercept('GET', '**/v1/stats/leaderboard').as('leaderboard');

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

    // check if all data loaded
    cy.wait('@profileInfo').then(({ response }) => {
      expect(response).to.have.nested.property('body.articles.nSaved');
      expect(response).to.have.nested.property('body.claims.nPositiveVotes');
      expect(response).to.have.nested.property('body.claims.nNegativeVotes');
      expect(response).to.have.nested.property('body.reviews.nPositiveVotes');
      expect(response).to.have.nested.property('body.reviews.nNegativeVotes');
      expect(response).to.have.nested.property('body.reviews.nNeutralVotes');
      expect(response).to.have.nested.property('body.user.level');
    });
  });
});
