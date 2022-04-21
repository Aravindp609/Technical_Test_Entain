/// <reference types="cypress" />

context('Scenario -2 User should be able to see race details', () => {

    beforeEach(() => {
      cy.visit('/')
    })  

    it('User should be able to see race details', () => {
      // meeting name (meeting_name)
      cy.get('.race-summary').first().find('h3').contains(/^(\w+ ?){1,4}(.*?)$/)

      // race number (race_number) 
      cy.get('.race-summary').first().find('p').contains(/Race \d/)

      // countdown timer here I am checking it is visible 
      cy.get('.race-summary').first().find('p').should('be.visible')
    })
  })
  