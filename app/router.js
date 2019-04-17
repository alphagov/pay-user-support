'use strict'

// Local dependencies
const healthcheck = require('./healthcheck')
const index = require('./index')
const somethingsWrong = require('./somethings-wrong')
const help = require('./help')

// Export
module.exports.bind = app => {
  app.use(healthcheck.router)
  app.use(index.router)
  app.use(somethingsWrong.router)
  app.use(help.router)
}
