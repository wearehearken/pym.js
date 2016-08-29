// Browsers on Sauce Labs
// Check out https://saucelabs.com/platforms for all browser/platform combos
// and https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
module.exports = {
    // IE
    // Investigating the issue postMessage does not work inside Saucelabs and IE9
    // sl_ie_9: {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   platform: 'Windows 7',
    //   version: '9.0'
    // },
    sl_old_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.9',
      version: '7.0'
    },

};
