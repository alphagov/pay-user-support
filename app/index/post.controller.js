'use strict'

// Local dependencies
const { validator } = require('../../common/utils/field-validator')
const { paths: somethingsWrong } = require('../somethings-wrong/index')
const { paths: help } = require('../help/index')

module.exports = (req, res) => {
  const supportType = req.body['support-type']

  if (supportType === 'somethings-wrong') {
    return res.redirect(somethingsWrong.index)
  }

  if (supportType === 'help') {
    return res.redirect(help.index)
  }

  const errors = validator([
    {
      name: 'support-type',
      type: 'radio',
      validate: 'required',
      value: req.body['support-type'],
      label: 'How can we help you?',
      id: 'support-type',
      message: 'Please choose an option'
    }
  ])

  if (errors) {
    req.flash('error', errors)
    return res.redirect('/')
  }
}
