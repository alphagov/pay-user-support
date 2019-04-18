describe('Landing page', () => {
  it('should show radios buttons to choose which type of support a user needs', () => {
    cy.visit('/')

    cy.title().should('eq', 'Support - GOV.UK Pay')
    cy.get('#support-type-1').should('be.visible')
    cy.get('#support-type-2').should('be.visible')
  })

  it('choosing there is a problem should take you to form', () => {
    cy.visit('/')

    cy.title().should('eq', 'Support - GOV.UK Pay')
    cy.get('#support-type-1').should('be.visible')
    cy.get('.govuk-button').click()

    cy.location('pathname').should('eq', `/somethings-wrong`)
  })

  it('choosing help should take you to form', () => {
    cy.visit('/')

    cy.title().should('eq', 'Support - GOV.UK Pay')
    cy.get('#support-type-2').should('be.visible')
    cy.get('#support-type-2').click()
    cy.get('.govuk-button').click()

    cy.location('pathname').should('eq', `/help`)
  })

  it('click the link should take you to ask a question form', () => {
    cy.visit('/')

    cy.title().should('eq', 'Support - GOV.UK Pay')
    cy.get('p a').should('be.visible')
    cy.get('p a').click()

    cy.location('pathname').should('eq', `/ask-a-question`)
  })
})
