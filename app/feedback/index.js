'use strict'

// Local dependencies
const createControllers = require('./../../common/utils/create-controllers')
const getController = require('./get.controller')
const postController = require('./post.controller')

module.exports = createControllers({
  path: '/ask-a-question',
  get: getController,
  post: postController
})
