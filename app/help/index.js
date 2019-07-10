'use strict'

// Local dependencies
const createControllers = require('./../../common/utils/create-controllers')
const getController = require('./get.controller')
const postController = require('./post.controller')

module.exports = createControllers({
  path: '/help',
  get: getController,
  post: postController
})
