'use strict'

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
  isNotEmpty,
  validEmail
}
