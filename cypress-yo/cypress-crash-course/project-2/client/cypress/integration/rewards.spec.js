/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Rewards', () => {
  beforeEach(() => {
    cy.visit('/rewards')
  })

  it('should display Rewards title', () => {
    cy.contains('Rewards')
      .should('be.visible')
  })

  it('should display a list of rewards', () => {
    cy.intercept('GET', 'http://localhost:4000/rewards', { fixture: 'rewards.json' })

    cy.get('ul.Rewards-cards-container')
      .find('li')
      .should('have.length', 3)
  })
})