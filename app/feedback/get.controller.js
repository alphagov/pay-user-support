'use strict'

// NPM dependencies
const lodash = require('lodash')

module.exports = (req, res) => {
  const data = req.flash()

  if (lodash.has('req', 'session.pageData.feedback')) {
    data.session = req.session.pageData.feedback
  }
  res.render('app/feedback/template', data)
}
