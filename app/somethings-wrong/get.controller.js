'use strict'

module.exports = (req, res) => {
  res.render('app/somethings-wrong/template', req.flash())
}
