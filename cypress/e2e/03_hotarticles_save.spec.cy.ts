/* eslint-disable max-len */

describe('Hot articles plus saving Test', () => {
  // eslint-disable-next-line no-undef-init
  let isSaved: boolean | undefined = undefined;
  it('checks hot articles and saves/unsaves some of them', () => {
    // repeat request if cached answer (cypress bug)
    cy.intercept('GET', '**/v1/articles*', (req) => {
      delete req.headers['if-none-match'];
    }).as('getFirstPage');

    // intercept saving of articles - check if save or unsave
    cy.intercept('**/save?articleId=*', (req) => {
      if (isSaved !== undefined && isSaved === false) {
        expect(req.method).to.equal('POST');
      } else if (isSaved !== undefined && isSaved === true) {
        expect(req.method).to.equal('DELETE');
      }
    }).as('save');

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

    // find out if first article is saved or unsaved
    cy.wait('@getFirstPage').then((response) => {
      isSaved = response?.response?.body[0].isSavedByUser;
      console.log(isSaved);
      expect(isSaved).to.not.equal(undefined);
    });

    cy.get('.articleComponent .save-for-later').first().click();

    // check if saved was unsaved or unsaved was saved successfully
    cy.wait('@save').then(({ response }) => {
      if (isSaved !== undefined && isSaved === false) {
        expect(response?.statusCode).to.equal(201);
      } else if (isSaved !== undefined && isSaved === true) {
        expect(response?.statusCode).to.equal(204);
      }
    });
  });
});
