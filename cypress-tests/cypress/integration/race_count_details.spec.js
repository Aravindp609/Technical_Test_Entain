/// <reference types="cypress" />

context('Scenario -1 User should be able to see all 5 races', () => {

    beforeEach(() => {
      cy.visit('/')
    })  

    it('User should be able to see all 5 races', () => {
      cy.get('.race-summary').should('have.length',5)
      // other scenario's can't be done with cypress
      // need to cover more tests
    })
  })
  