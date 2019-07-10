'use strict'

// Local dependencies
const createControllers = require('./../../common/utils/create-controllers')
const getController = require('./get.controller')

module.exports = createControllers({
  path: '/healthcheck',
  get: getController
})
