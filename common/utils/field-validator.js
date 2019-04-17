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

'use strict'

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

const isNotEmpty = function isNotEmpty (field) {
  if (field.value) {
    return field.value.trim() !== ''
  } else {
    return false
  }
}

const validEmail = function validEmail (field) {
  return field.value !== ''
}

module.exports = {
  validator
}
