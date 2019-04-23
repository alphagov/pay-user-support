'use strict'

module.exports = (req, res) => {
  const data = req.flash()

  if (req.session.pageData.help) {
    data.session = req.session.pageData.help
  }
  res.render('app/help/template', data)
}
