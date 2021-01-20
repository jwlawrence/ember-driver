"use strict";

module.exports = {
  name: require("./package").name,
  options: {
    babel: {
      plugins: [require.resolve("ember-auto-import/babel-plugin")],
    },
  },
  included() {
    this._super.included(...arguments);
    this.app.import('node_modules/driver.js/dist/driver.min.css');
  }
};
