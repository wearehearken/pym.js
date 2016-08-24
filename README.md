# Pym.js

[![Build Status](https://travis-ci.org/nprapps/pym.js.svg?branch=hearken-and-tests)](https://travis-ci.org/nprapps/pym.js)
[![Sauce Test Status](https://saucelabs.com/buildstatus/jjelosua)](https://saucelabs.com/u/jjelosua)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/jjelosua.svg)](https://saucelabs.com/u/jjelosua)

## About

Using iframes in a responsive page can be frustrating. It&rsquo;s easy enough to make an iframe&rsquo;s width span 100% of its container, but sizing its height is tricky &mdash; especially if the content of the iframe changes height depending on page width (for example, because of text wrapping or media queries) or events within the iframe.

<a href="https://raw.githubusercontent.com/nprapps/pym.js/master/src/pym.js">Pym.js</a> embeds and resizes an iframe responsively (width and height) within its parent container. It also bypasses the usual cross-domain issues.

Use case: The NPR Visuals team uses Pym.js to embed small custom bits of code (charts, maps, etc.) inside our CMS without CSS or JavaScript conflicts. [See an example of this in action.](http://www.npr.org/2014/03/25/293870089/maze-of-college-costs-and-aid-programs-trap-some-families)

### [&rsaquo; Read the documentation](http://blog.apps.npr.org/pym.js/)

### [&rsaquo; Browse the API](http://blog.apps.npr.org/pym.js/api/)

## Development tasks

Grunt configuration is included for running common development tasks.

Javascript can be linted with [jshint](http://jshint.com/):

```
grunt jshint
```

Unminified source can be regenerated with:

```
grunt concat
```

Minified source can be regenerated with:

```
grunt uglify
```

API documention can be generated with [jsdoc](https://github.com/jsdoc3/jsdoc):

```
grunt jsdoc
```

The release process is documented [on the wiki](https://github.com/nprapps/pym.js/wiki/Release-Process).

## Testing

We have introduced unit testing for pym after the 1.0.0 release. Using a combination of [karma](https://karma-runner.github.io/1.0/index.html), [jasmine](http://jasmine.github.io/2.4/introduction.html) and [saucelabs](https://saucelabs.com/) to improve our browser coverage (Saucelabs provides a nice [free tier solution for opensource projects](https://saucelabs.com/open-source))

### Test against your local browsers

*Requires chrome and firefox installed on your machine*

In order to run unit tests each time a change is detected, run:

```
grunt test
```

In order to run a one-off complete test suite, run:

```
npm test
```

### Test against saucelabs browsers

First you will need to make a copy the credentials sample file `sauce_cred_sample.json` and call it `sauce_cred.json` updating your saucelabs `USERNAME` and `ACCESSKEY` that you will obtain once you have setup an account in [saucelabs](https://saucelabs.com/beta/login)

```
$ cd sauce
$ cp sauce_cred_sample.json sauce_cred.json
```

In order to run unit tests each time a change is detected, run:

```
grunt sauce
```

In order to run a one-off complete test suite, run:

```
npm run sauce
```

For local testing the list of browsers to use can be modified on `sauce/saucelabs-local-browsers.js`. We use [Travis CI](https://travis-ci.org/) for our continuous integration, when travis is fired it will use `sauce/saucelabs-browsers.js` as the list of browsers to test on.

## License & Credits

Released under the MIT open source license. See `LICENSE` for details.

Pym.js was built by the [NPR Visuals](http://github.com/nprapps) team, based on work by the [NPR Tech Team](https://github.com/npr/responsiveiframe) and [Ioseb Dzmanashvili](https://github.com/ioseb). Thanks to [Erik Hinton](https://twitter.com/erikhinton) for suggesting the name.

Additional contributors:

* [Pierre-Yves Jamon](https://github.com/Pym)
* [jugglinmike](https://github.com/jugglinmike)
* [David Rogers](https://github.com/al-the-x)
* [Noah Veltman](https://github.com/veltman)
* [Andrei Scheinkman](https://github.com/ascheink)
* [Thomas Wilburn](https://github.com/thomaswilburn)
* [Justin Dearing](https://github.com/zippy1981)
* [Chris Amico](https://github.com/eyeseast)
* [Ryan Murphy](https://github.com/rdmurphy)
* [Corey Haines](https://github.com/coreyhaines)
