'use strict'

// NPM dependencies
const lodash = require('lodash')

module.exports = (req, res) => {
  const data = req.flash()

  if (lodash.has('req', 'session.pageData.help')) {
    data.session = req.session.pageData.help
  }
  res.render('app/help/template', data)
}
