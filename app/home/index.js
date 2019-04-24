'use strict'

// NPM dependencies
const express = require('express')

// Initialisation
const router = new express.Router()
const paths = {
  index: '/'
}

// Routing
router.get(paths.index, (req, res) => {
  res.render(`app/home/template`)
})

// Export
module.exports = {
  router,
  paths
}
