/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable max-len */

describe('Edit article Test', () => {
  const editedTitle = 'Edit Title of article';
  const editedUrl = 'Edit url of article';
  it('go to profile, edit my articles and edit first article test', () => {
    cy.intercept('PATCH', '/v1/articles/**', (req) => {
      expect(req.body.sourceUrl).to.equal(editedUrl);
      expect(req.body.title).to.equal(editedTitle);
    }).as('editArticle');

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

    // edit first article
    cy.wait(600);
    cy.get('.myArticlesProfile').first().click();
    cy.get('.articleComponent .editArticleProfile').first().click();
    cy.get('#editTitleArticle').clear();
    cy.get('#editTitleArticle').type(editedTitle);
    cy.get('#editSourceUrlArticle').clear();
    cy.get('#editSourceUrlArticle').type(editedUrl);
    cy.get('#submitChangedArticle').click();

    cy.wait('@editArticle').its('response.body').should((response) => {
      const { sourceUrl, title } = response;
      expect(sourceUrl).to.equal(editedUrl);
      expect(title).to.equal(editedTitle);
    });
  });
});
