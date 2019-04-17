'use strict'

// NPM dependencies
const express = require('express')

// Local dependencies
const getController = require('./get.controller')
const postController = require('./post.controller')

// Initialisation
const router = new express.Router()
const paths = {
  index: '/help'
}

// Routing
router.get(paths.index, getController)
router.post(paths.index, postController)

// Export
module.exports = {
  router,
  paths
}
