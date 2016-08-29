// Browsers on Sauce Labs
// Check out https://saucelabs.com/platforms for all browser/platform combos
// and https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
module.exports = {
    // Mobile
    sl_ios_safari: {
      base: 'SauceLabs',
      appiumVersion: '1.4.16',
      deviceName: 'iPhone Simulator',
      deviceOrientation: 'portrait',
      platformVersion: '7.0',
      platformName: 'iOS',
      browserName: 'Safari'
    },
    sl_android_browser: {
      base: 'SauceLabs',
      appiumVersion: '1.5.3',
      deviceName: 'Android Emulator',
      deviceType: 'phone',
      deviceOrientation: 'portrait',
      platformVersion: '5.1',
      platformName: 'Android',
      browserName: 'Browser'
    },
    // ***** Desktop *******
    // IE
    // Investigating the issue postMessage does not work inside Saucelabs and IE9
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9.0'
    },
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '10.0'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11.0'
    },
    // Chrome
    sl_old_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'OS X 10.9',
      version: '32.0'
    },
    sl_new_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'OS X 10.11',
      version: '51.0'
    },
    // Firefox
    sl_old_firefox: {
      base: 'SauceLabs',
      platform: 'OS X 10.9',
      browserName: 'firefox',
      version: '26.0'
    },
    sl_new_firefox: {
      base: 'SauceLabs',
      platform: 'OS X 10.11',
      browserName: 'firefox',
      version: '47.0'
    },
    // Safari
    sl_old_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.9',
      version: '7.0'
    },
    sl_new_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.11',
      version: '9.0'
    }
};
