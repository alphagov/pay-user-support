'use strict'

// NPM dependencies
const logger = require('winston')
const lodash = require('lodash')

// Local dependencies
const zendesk = require('../../common/clients/zendesk')
const { validator } = require('../../common/utils/field-validator')
// const { paths } = require('./index') this isn’t working and I can’t work it out

module.exports = (req, res) => {
  const formattedMessage = `_Message submitted via GOV.UK Pay Support pages_
  ----
  ${req.body['message']}`

  const ticket = {
    email: req.body['email'],
    name: req.body['name'],
    subject: '[govuk-pay-support] Report a problem with my live service',
    message: formattedMessage,
    type: 'question'
  }

  lodash.set(req, 'session.pageData.somethingsWrong', {
    email: req.body['email'] || '',
    name: req.body['name'] || '',
    message: req.body['message']
  })

  const errors = validator([
    {
      name: 'message',
      type: 'string',
      validate: 'required',
      value: req.body['message'],
      label: 'Describe the problem',
      id: 'message',
      message: 'This field is required'
    },
    {
      name: 'name',
      type: 'string',
      validate: 'required',
      value: req.body['name'],
      label: 'Name',
      id: 'name',
      message: 'Enter your full name'
    },
    {
      name: 'email',
      type: 'email',
      validate: 'email',
      value: req.body['email'],
      label: 'Email',
      id: 'email',
      message: 'Enter an email address in the correct format, like name@example.com'
    }
  ])

  if (errors) {
    req.flash('error', errors)
    return res.redirect('/somethings-wrong') // Embarrassing use of string cos import at top not working for no good reason
  }

  zendesk.createTicket(ticket)
    .then(() => {
      lodash.unset(req, 'session.pageData.somethingsWrong')
      return res.redirect('/success') // Embarrassing use of string cos import at top not working for no good reason
    })
    .catch(err => {
      logger.error(`Error posting request to Zendesk - ${err}`)
      req.flash('error', {
        message: 'Something went wrong. Try again or email the team at govuk-pay-support@digital.cabinet-office.gov.uk with your feedback.'
      })
      return res.redirect('/somethings-wrong') // Embarrassing use of string cos import at top not working for no good reason
    })
}
