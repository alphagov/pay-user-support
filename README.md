# GOV.UK Pay User Support

This is a small app that contains a bunch of forms that get info from users and direct the query to the right place.

It’s a Node.js [Express] app and uses [GOV.UK Frontend]

Based on [GDS Node.js Starter]

# Testing

Tests are written in Cypress and are run on PR builds with Travis. The config is within [.travis.yml](.travis.yml).

# Deploys

Travis also triggers deploys on changes to master. It is deployed to [PaaS]. The config is within [.travis.yml](.travis.yml) and [manifest.yml](manifest.yml).

[Express]: https://expressjs.com/
[GOV.UK Frontend]: https://design-system.service.gov.uk/
[GDS Node.js Starter]: https://github.com/alphagov/gds-nodejs-boilerplate
[PaaS]: https://www.cloud.service.gov.uk/
