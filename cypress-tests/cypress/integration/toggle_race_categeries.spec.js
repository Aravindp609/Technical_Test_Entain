/// <reference types="cypress" />

context('Scenario -3 User should be able to toggle race categories to view belonging races', () => {

    beforeEach(() => {
      cy.visit('/')
    })  

    it('Greyhound race should be visible when the checkbox on', () => {
      cy.get('#input-7').click({force:true})
      cy.get('#input-11').click({force:true})
      cy.get('.race-summary').contains('Greyhound').should('be.visible')
    })

    it('Greyhound race should be visible when the checkbox off', () => {          
      cy.get('#input-3').click({force:true})
      cy.get('.race-summary').contains('Greyhound').should('not.exist')
    })

    it('Harness race should be visible when the checkbox on', () => {
      cy.get('#input-3').click({force:true})
      cy.get('#input-11').click({force:true})
      cy.get('.race-summary').contains('Harness').should('be.visible')

    })

    it('Harness race should be visible when the checkbox off', () => {
      cy.get('#input-7').click({force:true})
      cy.get('.race-summary').contains('Harness').should('not.exist')
    })
  
    it('Thoroughbred race should be visible when the checkbox on', () => {
      cy.get('#input-7').click({force:true})
      cy.get('#input-3').click({force:true})
      cy.get('.race-summary').contains('Thoroughbred').should('be.visible')
    })

    it('Thoroughbred race should be visible when the checkbox on', () => {
      cy.get('#input-11').click({force:true})
      cy.get('.race-summary').contains('Thoroughbred').should('not.exist')
    })
  })
  