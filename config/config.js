// config.js
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    env: process.env.NODE_ENV,

    analytics: {
        trackingId: process.env.GA_TRACKING_ID
    }
};