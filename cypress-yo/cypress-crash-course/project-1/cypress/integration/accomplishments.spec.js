/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Accomplishments', () => {
  beforeEach(() => {
    cy.visit('accomplishments')
  })

  it('should the title be visibe', () => {
    cy.contains('Accomplishment')
      .should('be.visible')
  })

  it('should be able to submit accomplishments', () => {
    cy.getByTestId('accomplishment-title-input')
      .type('Accomplishment')
    
    cy.getByTestId('accomplishment-input')
      .type('My Accomplishment')

    cy.getByTestId('accomplishment-checkbox')
      .click()

    cy.contains('Submit Accomplishment')
      .click()

    cy.contains('This Accomplisment was Successfully Submitted')
      .should('be.visible')

    cy.get('.Accomplishment-btn', { timeout: 10000 })
      .click()
  })
})