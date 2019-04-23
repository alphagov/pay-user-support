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
    email: req.body['email'].length < 1 ? 'anonymous@example.com' : req.body['email'],
    name: req.body['name'].length < 1 ? 'Anonymous' : req.body['name'],
    subject: '[govuk-pay-support] Ask a question or give feedback ',
    message: formattedMessage,
    type: 'question'
  }

  lodash.set(req, 'session.pageData.feedback', {
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
      label: 'Enter your message',
      id: 'message',
      message: 'This field is required'
    }
  ])

  if (errors) {
    req.flash('error', errors)
    return res.redirect('/ask-a-question') // Embarrassing use of string cos import at top not working for no good reason
  }

  zendesk.createTicket(ticket)
    .then(() => {
      lodash.unset(req, 'session.pageData.feedback')
      return res.redirect('/success') // Embarrassing use of string cos import at top not working for no good reason
    })
    .catch(err => {
      logger.error(`Error posting request to Zendesk - ${err}`)
      req.flash('error', {
        message: 'We couldn’t send your feedback, please try again'
      })
      return res.redirect('/ask-a-question') // Embarrassing use of string cos import at top not working for no good reason
    })
}
