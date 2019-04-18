'use strict'

module.exports = (req, res) => {
  res.render('app/index/template', req.flash())
}
