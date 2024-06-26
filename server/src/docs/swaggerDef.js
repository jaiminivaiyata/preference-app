const { version } = require('../../package.json');
const config = require('../general-resources/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Social Media Application API documentation',
    version,
    // license: {
    //   name: 'MIT',
    //   url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    // },
  },
  servers: [
    {
      url: `https://preference-app.onrender.com/v1`,
    },
  ],
};

module.exports = swaggerDef;
