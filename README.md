# Express Starter Template

This repo is mean as a starter for express projects that goes beyond the basics.

It is meant to support a VSC project using the EsLint and Prettier extensions.

It features:

- .env for configuration
- Eslint, Prettier and the Airbnb style guide for consistant code style
- Jsdoc for code comments
- Jest with supertest for code testing and mocking
- Helmet for security through setting headers
- Compression for gzip/deflate of network calls
- Passport with JWT for authentication

It is tagged at various points in its creation.

## Express Project with VSC env and Airbnb Style guide

### #Base

- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Airbnb style guide](https://github.com/airbnb/javascript)
- [Visual Studio code](https://visualstudio.microsoft.com) configured for code standards

### #Rollup

- [Rollup](https://rollupjs.org/guide/en/) with copy files
- [Rimraf](https://github.com/isaacs/rimraf) to clean dist directory
- [Concurrently](https://github.com/open-cli-tools/concurrently) to run node server and run rollup on client code

### #Logging

- [Winston](https://github.com/winstonjs/winston)
- [Morgan](https://github.com/expressjs/morgan)

### #Docs

- [JsDoc](https://jsdoc.app)

### #Tests

- [Jest](https://jestjs.io)
- [-supertest](https://github.com/visionmedia/supertest)

### #DataStore

- [nativeMongo](https://github.com/mongodb/node-mongodb-native)

### #Authentication

- [Passport](http://www.passportjs.org)
- [JWT Strategy](http://www.passportjs.org/packages/passport-jwt/)

### #Security

- [Helmet](https://github.com/helmetjs/helmet)

### #Optimization

- [Compression](http://expressjs.com/en/resources/middleware/compression.html)
