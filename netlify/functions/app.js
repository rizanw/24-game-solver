// Runs the Express app as a Netlify Function.
const serverless = require("serverless-http");
const app = require("../../main");

module.exports.handler = serverless(app);
