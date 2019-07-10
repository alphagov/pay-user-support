'use strict'

// NPM dependencies
const csrf = require('csrf')

// Local
const errorMessage = {
  message: 'There is a problem with the payments platform'
}

function isValidCsrf (req) {
  return csrf().verify(req.session.csrfSecret, req.body.csrfToken)
}

const validateAndRefreshCsrf = function validateAndRefreshCsrf (req, res, next) {
  const session = req.session
  if (!session) {
    console.error('Session is not defined')
    return res.render('common/templates/error', errorMessage)
  }

  if (!session.csrfSecret) {
    console.error('CSRF secret is not defined for session')
    return res.render('common/templates/error', errorMessage)
  }

  if (req.method !== 'GET' && !isValidCsrf(req)) {
    console.error('CSRF secret provided is invalid')
    return res.render('common/templates/error', errorMessage)
  }

  res.locals.csrf = csrf().create(session.csrfSecret)
  next()
}

const ensureSessionHasCsrfSecret = function ensureSessionHasCsrfSecret (req, res, next) {
  if (req.session.csrfSecret) return next()
  req.session.csrfSecret = csrf().secretSync()

  return next()
}

module.exports = {
  validateAndRefreshCsrf,
  ensureSessionHasCsrfSecret
}
