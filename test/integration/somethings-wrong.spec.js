describe('Somethings wrong page', () => {
  it('should form for user to report a problem', () => {
    cy.visit('/somethings-wrong')

    cy.title().should('eq', 'Report a problem with my live service - Support - GOV.UK Pay')
    cy.get('#message').should('be.visible')
    cy.get('#name').should('be.visible')
    cy.get('#email').should('be.visible')
  })

  it('should show errors if user leaves everything blank', () => {
    cy.visit('/somethings-wrong')
    cy.get('.govuk-button').click()
    cy.location('pathname').should('eq', `/somethings-wrong`)

    cy.get('.govuk-error-summary').should('be.visible')
    cy.get('.govuk-error-summary__list li').should('have.length', 3)

    cy.get('.govuk-form-group--error').should('have.length', 3)
    cy.get('.govuk-error-message').should('have.length', 3)
    cy.get('.govuk-error-message').eq(0).should('contain', 'This field is required')
    cy.get('.govuk-error-message').eq(1).should('contain', 'Enter your full name')
    cy.get('.govuk-error-message').eq(2).should('contain', 'Enter an email address in the correct format, like name@example.com')
  })

  it('should show errors if invalid email', () => {
    cy.visit('/somethings-wrong')

    cy.get('#message').type('Hello world')
    cy.get('#name').type('Some Name')
    cy.get('#email').type('your.name@localhost')

    cy.get('.govuk-button').click()
    cy.location('pathname').should('eq', `/somethings-wrong`)

    cy.get('.govuk-error-summary').should('be.visible')
    cy.get('.govuk-error-summary__list li').should('have.length', 1)

    cy.get('.govuk-form-group--error').should('have.length', 1)
    cy.get('.govuk-error-message').should('have.length', 1)
    cy.get('.govuk-error-message').should('contain', 'Enter an email address in the correct format, like name@example.com')
  })

  it('should error if zendesk client not setup properly', () => {
    cy.visit('/somethings-wrong')

    cy.get('#message').type('Hello world')
    cy.get('#name').type('Some Name')
    cy.get('#email').type('your.name@email.com')

    cy.get('.govuk-button').click()
    cy.location('pathname').should('eq', `/somethings-wrong`)
    cy.get('.govuk-error-summary').should('be.visible')
  })
})
