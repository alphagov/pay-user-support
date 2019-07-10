'use strict'

// NPM dependencies
const express = require('express')

/**
 * @param opts Options to build controller
 * @param opts.path Path to page
 * @param opts.get Get controller
 * @param opts.post Post controller
 */
module.exports = function createControllers (opts) {
  // Initialisation
  const router = new express.Router()
  const paths = {
    index: opts.path
  }

  const defaultGet = (req, res) => {
    res.render(`app${opts.path}/template`, req.flash())
  }

  router.get(paths.index, opts.get ? opts.get : defaultGet)
  if (opts.post) {
    router.post(paths.index, opts.post)
  }

  // Export
  return {
    router,
    paths
  }
}
