'use strict'

// NPM dependencies
const express = require('express')

// Initialisation
const router = new express.Router()
const paths = {
  index: '/get-started',
  legacy: '/getstarted'
}

// Routing
router.get(paths.index, (req, res) => {
  res.render(`app${paths.index}/template`)
})

// On the old pay-product-page we used a different URL
router.get(paths.legacy, (req, res) => {
  res.redirect(301, paths.index)
})

// Export
module.exports = {
  router,
  paths
}
