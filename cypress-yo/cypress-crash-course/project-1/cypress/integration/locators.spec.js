/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Locators', () => {
    beforeEach(() => {
        cy.visit('/elements')
    })

    it('Locate elements with get', () => {
        cy.get('button')
        cy.get('button.btn-with-class')
        cy.get('[type="submit"]')
        cy.get('#btn-with-id')
        cy.getByTestId('btn-id-1')
    })

    it('Locate elements with contains', () => {
        cy.contains('Unique Text')
        cy.contains('Not Unique Text')
        cy.contains('[type="submit"]', 'Not Unique Text')
    })

    it('Locate elements with find', () => {
        cy.get('#form-1').find('.btn-1')
    })
})