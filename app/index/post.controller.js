'use strict'

const { paths: somethingsWrong } = require('../somethings-wrong/index')
const { paths: help } = require('../help/index')

module.exports = (req, res) => {
  const supportType = req.body['support-type']

  if (supportType === 'somethings-wrong') {
    return res.redirect(somethingsWrong.index)
  }

  if (supportType === 'help') {
    return res.redirect(help.index)
  }
}
