/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable max-len */

describe('Article author profile Test', () => {
  // eslint-disable-next-line no-undef-init
  it('open hot articles and open profile of first author, check if all apis were loaded to page test', () => {
    // Login
    cy.visit({
      url: 'http://localhost:3001/sign-in',
      method: 'GET',
    });
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('test123');
    cy.get('#signin').click();

    // go to hot articles
    cy.get('#articlesLink').click();

    cy.intercept('GET', '**/v1/users/**/claims', (req) => {
      delete req.headers['if-none-match'];
    }).as('claims');
    cy.intercept('GET', '**/v1/users/**/articles', (req) => {
      delete req.headers['if-none-match'];
    }).as('articles');
    cy.intercept('GET', '**/v1/stats?userId=*', (req) => {
      delete req.headers['if-none-match'];
    }).as('userStats');

    cy.get('.articleComponent .authorArticle').first().click();

    // check if all loaded
    cy.get('@claims.all').should('have.length', 2);
    cy.get('@articles.all').should('have.length', 1);
    cy.get('@userStats.all').should('have.length', 1);
  });
});
