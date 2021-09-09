if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// const DEBUG_MODE = (process.env.DEBUG || "Y") == 'Y';
const DEBUG_MODE = process.env.NODE_ENV !== 'production';
const DEBUG_PORT = 3000;

const constants = {
  is_debug: DEBUG_MODE,
  ip_adress: null,
}

const debug = {
  port: DEBUG_PORT
};

const release = {
  port: process.env.PORT || 5000
};

module.exports = {...(DEBUG_MODE ? debug : release), ...constants};
