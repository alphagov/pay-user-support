'use strict'

module.exports = (req, res) => {
  res.render('app/support/template', req.flash())
}
