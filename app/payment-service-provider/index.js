'use strict'

// NPM dependencies
const express = require('express')

// Initialisation
const router = new express.Router()
const paths = {
  index: '/payment-service-provider'
}

// Routing
router.get(paths.index, (req, res) => {
  res.render(`app${paths.index}/template`)
})

// Export
module.exports = {
  router,
  paths
}
