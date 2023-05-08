/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable max-len */

describe('Complete article Test', () => {
  // eslint-disable-next-line no-undef-init
  it('open hot articles, open first, add claim, add review, add reaction to review test', () => {
    const claimText = 'this is some random text';
    const reviewText = 'this is review text';
    const reviewLinks = 'this is review link';

    cy.intercept('POST', '**/v1/articles/**/claims', (req) => {
      expect(req.body.text).to.equal(claimText);
    }).as('addclaim');

    cy.intercept('POST', '**/v1/articles/**/claims/**/reviews', (req) => {
      expect(req.body.text).to.equal(reviewText);
    }).as('addreview');

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

    // create claim
    cy.get('.articleComponent .articlesTitleLink').first().click();
    cy.get('.createClaimModal').click();
    cy.get('#createClaimText').type(claimText);
    cy.get('#createClaimSubmitButton').click();

    cy.wait('@addclaim').its('response.body').should((response) => {
      const { text } = response;
      expect(text).to.equal(claimText);
    });

    // add review
    cy.get('.addReviewButton').first().click();
    cy.wait(200);
    cy.get('#reviewTextForm').type(reviewText);
    cy.get('#reviewLinksForm').type(reviewLinks);
    cy.get('#reviewSubmitForm').click();

    cy.wait('@addreview').its('response.body').should((response) => {
      const { text, links } = response;
      expect(text).to.equal(reviewText);
      const linkInclude = links.includes(reviewLinks);
      expect(linkInclude).to.equal(true);
    });
  });
});
