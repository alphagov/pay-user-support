'use strict'

// The validator expects to be passed an array of objects like so
// [
//   {
//     name: 'support-type',
//     type: 'radio',
//     validate: 'required',
//     value: req.body['support-type'],
//     label: 'How can we help you?',
//     id: 'support-type',
//     message: 'Please choose an option'
//   }
// ]

const { validEmail, isNotEmpty } = require('./field-validations')

const validator = function validator (arrayOfFields) {
  let errors = []

  arrayOfFields.forEach(field => {
    let result
    switch (field.type) {
      case 'email':
        result = validEmail(field)
        break
      default:
        result = isNotEmpty(field)
        break
    }
    if (!result) {
      errors.push(field)
    }
  })

  if (errors.length) {
    const formattedErrors = {}
    const formattedErrorSummary = []
    errors.forEach(erroredField => {
      formattedErrors[erroredField.name] = {
        message: {
          text: erroredField.message
        }
      }
      formattedErrorSummary.push({
        text: erroredField.label,
        href: `#${erroredField.id}`
      })
    })
    return {
      fields: formattedErrors,
      summary: formattedErrorSummary
    }
  }

  return false
}

module.exports = {
  validator
}
