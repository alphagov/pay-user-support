'use strict'

const rfc822Validator = require('rfc822-validate')

const isNotEmpty = function isNotEmpty (field) {
  if (field.value) {
    return field.value.trim() !== ''
  }
}

const validEmail = function validEmail (field) {
  if (!rfc822Validator(field.value)) {
    return false
  }
  // Futher check because technically name@email is a valid email
  let domain = field.value.split('@')[1]
  return !(domain && domain.indexOf('.') === -1)
}

module.exports = {
  isNotEmpty,
  validEmail
}
