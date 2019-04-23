'use strict'

// NPM dependencies
const lodash = require('lodash')

module.exports = (req, res) => {
  const data = req.flash()

  if (lodash.has('req', 'session.pageData.somethingsWrong')) {
    data.session = req.session.pageData.somethingsWrong
  }
  res.render('app/somethings-wrong/template', data)
}
