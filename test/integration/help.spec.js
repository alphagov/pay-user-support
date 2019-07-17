describe('Help page', () => {
  it('should form for user to report a problem', () => {
    cy.visit('/help')

    cy.title().should('eq', 'Help using GOV.UK Pay - Support - GOV.UK Pay')
    cy.get('#message').should('be.visible')
    cy.get('#name').should('be.visible')
    cy.get('#email').should('be.visible')
  })

  it('should show errors if user leaves everything blank', () => {
    cy.visit('/help')
    cy.get('.govuk-button').click()
    cy.location('pathname').should('eq', `/help`)

    cy.get('.govuk-error-summary').should('be.visible')
    cy.get('.govuk-error-summary__list li').should('have.length', 3)

    cy.get('.govuk-form-group--error').should('have.length', 3)
    cy.get('.govuk-error-message').should('have.length', 3)
    cy.get('.govuk-error-message').eq(0).should('contain', 'Enter your feedback about GOV.UK Pay')
    cy.get('.govuk-error-message').eq(1).should('contain', 'Enter your full name')
    cy.get('.govuk-error-message').eq(2).should('contain', 'Enter an email address in the correct format, like name@example.com')
  })

  it('should show errors if invalid email', () => {
    cy.visit('/help')

    cy.get('#message').type('Hello world')
    cy.get('#name').type('Some Name')
    cy.get('#email').type('your.name@localhost')

    cy.get('.govuk-button').click()
    cy.location('pathname').should('eq', `/help`)

    cy.get('.govuk-error-summary').should('be.visible')
    cy.get('.govuk-error-summary__list li').should('have.length', 1)

    cy.get('.govuk-form-group--error').should('have.length', 1)
    cy.get('.govuk-error-message').should('have.length', 1)
    cy.get('.govuk-error-message').should('contain', 'Enter an email address in the correct format, like name@example.com')
  })

  it('should error if zendesk client not setup properly', () => {
    cy.visit('/help')

    cy.get('#message').type('Hello world')
    cy.get('#name').type('Some Name')
    cy.get('#email').type('your.name@email.com')

    cy.get('.govuk-button').click()
    cy.location('pathname').should('eq', `/help`)
    cy.get('.govuk-error-summary').should('be.visible')
  })
})
