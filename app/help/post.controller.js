'use strict'

module.exports = (req, res) => {
  const supportType = req.body['support-type']

  if (supportType === 'somethings-wrong') {
    return res.redirect()
  }

  if (supportType === 'help') {
    return res.redirect()
  }
}
