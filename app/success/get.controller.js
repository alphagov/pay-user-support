'use strict'

module.exports = (req, res) => {
  res.render('app/success/template', req.flash())
}
