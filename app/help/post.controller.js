'use strict'

// NPM dependencies
const logger = require('pino')

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
    subject: '[govuk-pay-support] I need help using GOV.UK Pay',
    message: formattedMessage,
    type: 'question'
  }

  const errors = validator([
    {
      name: 'message',
      type: 'string',
      validate: 'required',
      value: req.body['message'],
      label: 'Describe what you’re trying to do',
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
      message: 'This field is required'
    },
    {
      name: 'email',
      type: 'email',
      validate: 'email',
      value: req.body['email'],
      label: 'Email',
      id: 'email',
      message: 'Please use a valid email address'
    }
  ])

  if (errors) {
    req.flash('error', errors)
    return res.redirect('/help') // Embarrassing use of string cos import at top not working for no good reason
  }

  zendesk.createTicket(ticket)
    .then(() => {
      console.log('success')
      req.flash('info', {
        title: 'Thanks for your getting in touch',
        body: 'We will respond shortly'
      })
      return res.redirect('/help') // Embarrassing use of string cos import at top not working for no good reason
    })
    .catch(err => {
      console.log('fail')
      logger('error', `Error posting request to Zendesk - ${err}`)
      req.flash('error', {
        message: 'We couldn’t send your feedback, please try again'
      })
      return res.redirect('/help') // Embarrassing use of string cos import at top not working for no good reason
    })
}
