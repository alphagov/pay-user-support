'use strict'

module.exports = (req, res) => {
  const data = req.flash()

  if (req.session.pageData.somethingsWrong) {
    data.session = req.session.pageData.somethingsWrong
  }
  res.render('app/somethings-wrong/template', data)
}
