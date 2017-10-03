"use strict";

if (process.env.NODE_ENV === "production") {
  // we are in production
  console.log('Production: ', process.env.NODE_ENV)
  module.exports = require("./prod");
} else {
  // we are in development
    console.log('Development: ', process.env.NODE_ENV)
  module.exports = require("./secret");
}
