'use strict'

module.exports = (req, res) => {
  res.render('app/index/index', req.flash())
}
