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

Code tagged at various points in its creation.

### v1.0 #Base

- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Airbnb style guide](https://github.com/airbnb/javascript)
- [Visual Studio code](https://visualstudio.microsoft.com) configured for uniform code standards/style

### v1.1 #Rollup

- [Rollup](https://rollupjs.org/guide/en/) with copy files
- [Rimraf](https://github.com/isaacs/rimraf) to clean dist directory
- [Concurrently](https://github.com/open-cli-tools/concurrently) to run node server and run rollup on client code

### v1.2 #Logging

- [Winston](https://github.com/winstonjs/winston)
- [Morgan](https://github.com/expressjs/morgan)

### v1.3 #Docs

- [JsDoc](https://jsdoc.app)

### v1.4 #Tests

- [Jest](https://jestjs.io)
- [-supertest](https://github.com/visionmedia/supertest)

### v1.5 #DataStore

- [nativeMongo](https://github.com/mongodb/node-mongodb-native)

### v1.6 #Authentication

- [Passport](http://www.passportjs.org)
- [JWT Strategy](http://www.passportjs.org/packages/passport-jwt/)

### v1.7 #Security

- [Helmet](https://github.com/helmetjs/helmet)

### v1.8 #Optimization

- [Compression](http://expressjs.com/en/resources/middleware/compression.html)
