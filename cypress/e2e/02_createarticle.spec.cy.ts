/* eslint-disable max-len */
describe('Create article test', () => {
  const link = 'https://dennikn.sk/3359198/prezidentka-zuzana-caputova-je-stale-na-cele-rebricka-doveryhodnosti-najviac-poskocil-simecka-z-progresivneho-slovenska/?ref=tit';
  const headline = 'Prezidentka Zuzana Čaputová je stále na čele rebríčka dôveryhodnosti. Najviac poskočil Šimečka z Progresívneho Slovenska';

  it('creates new article and adds claim', () => {
    cy.intercept('GET', `**/extract/json?url=${link}`).as('scrapeData');
    cy.intercept('POST', '**/v1/articles', (req) => {
      expect(req.body.sourceUrl).to.equal(link);
      expect(req.body.title).to.equal(headline);
    }).as('addarticle');

    // Login
    cy.visit({
      url: 'http://localhost:3001/sign-in',
      method: 'GET',
    });
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('test123');
    cy.get('#signin').click();

    // go to create article
    cy.get('#articlesLink').click();
    cy.get('#addArticleLink').click();

    // scrape from url
    cy.get('#urlTextData').type(link);
    cy.get('#scrapingButton').click();
    // assert correct data returned
    cy.wait('@scrapeData').its('response.body').should((response) => {
      const { title } = JSON.parse(response);
      expect(title).to.equal(headline);
    });

    // add article
    cy.get('#addArticleSubmitButton').click();
    cy.wait('@addarticle').its('response.body').should((response) => {
      const { title } = response;
      expect(title).to.equal(headline);
    });
  });
});
