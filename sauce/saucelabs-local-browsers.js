// Browsers on Sauce Labs
// Check out https://saucelabs.com/platforms for all browser/platform combos
// and https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
module.exports = {
    // IE
    // Investigating the issue postMessage does not work inside Saucelabs and IE9
    sl_new_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'OS X 10.11',
      version: '51.0'
    },
};
