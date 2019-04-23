'use strict'

module.exports = (req, res) => {
  const data = req.flash()

  if (req.session.pageData.feedback) {
    data.session = req.session.pageData.feedback
  }
  res.render('app/feedback/template', data)
}
