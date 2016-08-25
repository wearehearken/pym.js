Pym.js
======

[![Build Status](https://travis-ci.org/nprapps/pym.js.svg?branch=hearken-and-tests)](https://travis-ci.org/nprapps/pym.js)
[![Sauce Test Status](https://saucelabs.com/buildstatus/jjelosua)](https://saucelabs.com/u/jjelosua)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/jjelosua.svg)](https://saucelabs.com/u/jjelosua)

* [What is this?](#what-is-this)
* [Assumptions](#assumptions)
* [What's in here?](#whats-in-here)
* [Bootstrap the project](#bootstrap-the-project)
* [Hide project secrets](#hide-project-secrets)
* [Run the project](#run-the-project)
* [Test the project](#test-the-project)
* [Build the project](#build-the-project)
* [Versioning](#versioning)
* [Why do we need a loader script?](#why-do-we-need-a-loader-script)
* [License and credits](#license-and-credits)
* [Additional contributors](#additional-contributors)


What is this?
-------------

Using iframes in a responsive page can be frustrating. It&rsquo;s easy enough to make an iframe&rsquo;s width span 100% of its container, but sizing its height is tricky &mdash; especially if the content of the iframe changes height depending on page width (for example, because of text wrapping or media queries) or events within the iframe.

<a href="https://raw.githubusercontent.com/nprapps/pym.js/master/src/pym.js">Pym.js</a> embeds and resizes an iframe responsively (width and height) within its parent container. It also bypasses the usual cross-domain issues.

Use case: The NPR Visuals team uses Pym.js to embed small custom bits of code (charts, maps, etc.) inside our CMS without CSS or JavaScript conflicts. [See an example of this in action.](http://www.npr.org/2014/03/25/293870089/maze-of-college-costs-and-aid-programs-trap-some-families)

## [&rsaquo; Read the documentation](http://blog.apps.npr.org/pym.js/)

## [&rsaquo; Browse the API](http://blog.apps.npr.org/pym.js/api/)

Assumptions
-----------

The following things are assumed to be true in this documentation.

* You are running OS X.
* You have installed Node.js.
* You have installed Grunt globally.

For more details on the technology stack used in NPR Visuals app template, see our [development environment blog post](http://blog.apps.npr.org/2013/06/06/how-to-setup-a-developers-environment.html).

Modern versions of Windows and Linux should work equally well but are untested by the NPR Visuals Team.

What's in here?
---------------

The project contains the following folders and important files:

* ``dist`` -- Unminified and minified versions of Versions pym.js library and pym-loader.js
* ``examples`` -- Compilation of working use cases for pym.js
* ``src`` -- Source files for this project
* ``test/pym`` -- Unit testing specs for pym.js
* ``test/pym-loader`` -- Unit testing specs for pym-loader.js
* ``test/html`` -- Child pages used for pym.js testing
* ``test/html-fixtures`` -- HTML templates for testing loader through the htmljs karma preprocessor
* ``.travis.yml`` -- [Travis CI](https://travis-ci.org/) config file
* ``Gruntfile.js`` -- [Grunt.js](http://gruntjs.com/) task runner config file
* ``karma.conf.js`` -- [Karma](https://karma-runner.github.io/1.0/index.html) runner configuration file
* ``karma.conf-sauce.js`` -- [Karma](https://karma-runner.github.io/1.0/index.html) runner configuration file for saucelabs

Bootstrap the project
---------------------

Node.js is required. If you don't already have it, get it like this:

```
brew install node
curl https://npmjs.org/install.sh | sh
```

Then bootstrap the project:

```
npm install
```

In order to do your own tests in saucelabs (_optional_) you will need to have a [saucelabs account](https://saucelabs.com/beta/login) (they have a FREE tier for [opensource projects](https://saucelabs.com/open-source) so let's give them some credit).

Once you have an account you will need to copy the example credentials file in the sauce folder into the actual credentials that are going to be used.

```
$ cd sauce
$ cp sauce_cred_sample.json sauce_cred.json
```

Then fill in your _USERNAME_ and _ACCESSKEY_ from [user settings](https://saucelabs.com/beta/user-settings)

Hide project secrets
--------------------

In this project the only project secrets that we have are the saucelabs credentials to secure a tunnel between travis and saucelabs used in our continuous integration process. Those keys have been encrypted through travis you can read more about that process [here](https://docs.travis-ci.com/user/encryption-keys/)

Project secrets should **never** be stored anywhere else in the repository. They will be leaked to the client if you do. Instead, always store passwords, keys, etc. in environment variables and document that they are needed here in the README.

Run the project
---------------

In order to run pym.js the best approach is to fire up a local webserver and go to the examples to see it in action.

The inlcuded server includes `livereload` so each time you change something on the `examples` or `src` folder the server will refresh the page for you.

```
$ cd pym.js
$ grunt server
```


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

Test the project
----------------

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
$ grunt sauce
```

In order to run a one-off complete test suite, run:

```
$ npm run sauce
```

For local testing the list of browsers to use can be modified on `sauce/saucelabs-local-browsers.js`. We use [Travis CI](https://travis-ci.org/) for our continuous integration, when travis is fired it will use `sauce/saucelabs-browsers.js` as the list of browsers to test on.

Build the project
-----------------

We use grunt tasks to build the project into the `dist` folder. Linting JS, preprocessing, uglyfing, etc.

```
$ grunt
```

We generate two copies of the pym and pym-loader libraries due to some really _tight length requirements_ when embedding scripts in the homepage of some of our users CMSs.

* **p.v1.m.js is a copy of pym-v1.min.js**
* **pl.v1.m.js is a copy of pym-loader-v1.min.js**

Versioning
----------

From *Pym v1.0.0* on we are going to follow the [semantic versioning](http://semver.org/) pattern MAJOR.MINOR.PATCH.

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

To minimize the impact on our current and future customers, on the minified production side of pym we are only going to keep the major version exposed. That we can apply *PATCHES* and *MINOR* version changes without any change being made on our customer's code but we maintain the possibility of new major releases that are somewhat disruptive with previous versions of the library.

* pym-v1.0.0 and pym-v1.1.1 will both end up minified into the same pym.v1.min.js.

NPR will host and serve pym.js and pym-loader.js through a canonical CDN at `pym.nprapps.com`. We recommend that you link directly there to benefit instantaneously from the patches and minor releases.

Why do we need a loader script?
-------------------------------

This new Pym v1.0.0 has been driven by a change needed to extend the ability to use pym in certain CMSs from our member stations and other use cases found by our collaborators that broke the loading process of pym.js into the page and thus made the embeds unusable.

We have decided to separate the particular needs of the pym.js loading process in custom situations to a separate script that will act as loader wrapper instead of polluting the pym.js library itself with special needs of certain CMSs.

We want to keep this as manageable as possible but due to the extensive use of pym.js in various environments and CMS combinations we do not close the door at creating special loaders for special customer situations that require really concise loading implementations.

License and credits
-------------------

Released under the MIT open source license. See `LICENSE` for details.

Pym.js was built by the [NPR Visuals](http://github.com/nprapps) team, based on work by the [NPR Tech Team](https://github.com/npr/responsiveiframe) and [Ioseb Dzmanashvili](https://github.com/ioseb). Thanks to [Erik Hinton](https://twitter.com/erikhinton) for suggesting the name.

Additional contributors
-----------------------

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
