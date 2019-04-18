describe('Ask a question page', () => {
  it('should form for user to report a problem', () => {
    cy.visit('/ask-a-question')

    cy.title().should('eq', 'Ask a question or give feedback - Support - GOV.UK Pay')
    cy.get('#message').should('be.visible')
    cy.get('#name').should('be.visible')
    cy.get('#email').should('be.visible')
  })

  it('should show errors if user leaves everything blank', () => {
    cy.get('.govuk-button').click()
    cy.location('pathname').should('eq', `/ask-a-question`)

    cy.get('.govuk-error-summary').should('be.visible')
    cy.get('.govuk-error-summary__list li').should('have.length', 1)

    cy.get('.govuk-form-group--error').should('have.length', 1)
    cy.get('.govuk-error-message').should('have.length', 1)
    cy.get('.govuk-error-message').should('contain', 'This field is required')
  })

  it('should submit successfully with a message', () => {
    cy.visit('/ask-a-question')

    cy.get('#message').type('Hello world')
    cy.get('#name').type('Some Name')
    cy.get('#email').type('your.name@email.com')

    cy.get('.govuk-button').click()
    cy.location('pathname').should('eq', `/ask-a-question`)
    cy.get('.info-box').should('be.visible')
  })
})
