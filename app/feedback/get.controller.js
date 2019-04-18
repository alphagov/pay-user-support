'use strict'

module.exports = (req, res) => {
  res.render('app/feedback/template', req.flash())
}
