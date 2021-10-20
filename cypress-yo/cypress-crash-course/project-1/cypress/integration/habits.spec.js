/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Habits', () => {
  beforeEach(() => {
    cy.visit('/habits')
  })

  it('should be able to open modal', () => {
    cy.get('#habit-add-btn')
      .click()

    cy.contains('Add a new habit')
      .should('be.visible')
  })

  it('should be able to type into textfield type', () => {
    cy.get('#habit-add-btn')
      .click()

    cy.get('[placeholder="Habit"]')
      .type('Habit One')

    cy.get('input[placeholder="Habit"]')
      .should('have.value', 'Habit One')
  })

  it('should be able to close the modal when click the close button', () => {
    cy.get('#habit-add-btn')
      .click()

    cy.contains('Close')
      .click()

    cy.contains('Habit Checklist')
      .should('be.visible')
  })

  it('should be able to add new habit', () => {
    cy.get('#habit-add-btn')
      .click()

    cy.get('[placeholder="Habit"]')
      .type('Habit One')

    cy.contains('Save Changes')
      .click()

    cy.contains('Habit One')
      .should('be.visible')

    cy.get('[src="/static/media/close.fa7e5ead.svg"]')
      .should('be.visible')
  })

  it('should be able to toggle the created habit', () => {
    cy.get('#habit-add-btn')
      .click()

    cy.get('[placeholder="Habit"]')
      .type('Habit One')

    cy.contains('Save Changes')
      .click()

    cy.contains('Habit One')
      .should('be.visible')

    cy.get('[src="/static/media/close.fa7e5ead.svg"]')
      .should('be.visible')

    cy.contains('Habit One')
      .click()

    cy.get('[src="/static/media/check.9e8832df.svg"]')
      .should('be.visible')
  })
})