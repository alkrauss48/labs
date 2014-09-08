site-start [![Dependency Status](https://gemnasium.com/Staplegun-US/site-start.svg)](https://gemnasium.com/Staplegun-US/site-start)
==========

A starter site kit that includes:

* Common vendor scripts
  * Compass
  * Susy 2
  * Normalize.css
  * jQuery
  * Underscore.js
  * Modernizr
* Build Automation (via Grunt.js)
  * SASS compilation
  * Javascript built with Browserify
  * Automatic CSS/JS minification
  * Image optimization
  * Pagespeed Analytics
  * Watching for changes
* Common icon fonts pre-installed
* Semantic index HTML file using proper [ARIA](http://w3c.github.io/aria-in-html) roles and settings
* 404 Page (from HTML5 Boilerplate)
* Default root settings files (robots.txt, humans.txt, crossdomain.xml, .editorconfig,
  .htaccess)

## Requirements

To use everything site-start ships with, you must have the following installed:

  * Ruby
  * NPM
  * Bower

## Installation
```bash
git clone https://github.com/Staplegun-US/site-start.git
cd site-start
bin/install
```

Running `bin/install` will take care of installing the necessary gems, bower
components, and node packages you'll need. Packages are only installed on a
local project-level, not globally.

## Usage

The `index.html` comes preset with google analytics code,
css/js file inclusions, base meta settings, and a basic semantic body to get you started. To make full
use of the site-start though, you'll want to use grunt.

## Build Automation with Grunt.js

Grunt Commands
```bash
grunt           # Default command to build everything and watch for changes
grunt images    # Optimize all new images
grunt init      # Install Bower Components
grunt analyze   # Run pagespeed analytics
```

#### Sass
There is a main scss file which site-start uses to build your CSS. Use it to
centralize your imports.

```
src/sass/app.scss       # Main Sass, included in the body

Built to: dist/css
```

#### Javascript
There are 3 main javascript files which site-start uses to build your JS.

```
src/js/app.js           # Main JS File, included in the body
src/js/beforeBody.js    # Included in the head
src/js/ie/app.js        # JS file for IE8

Built to: dist/js
```

All of these files use Node.js-style `require()` calls to include files, which
allows you to include external scripts inside these JS files. These files get
built and bundled with Browserify.

Grunt will watch for all scss and js files in their respective directories, and
recompile after any changes.

All of the final result files that Grunt compiles for you are already
included in the `index.html`, so hack away without worry!

#### Images
Grunt automatically optimizes your images, and keeps unoptimized backups.

```
Place in:  src/images
Built to:  dist/images
```

Only images that have been modified will ever get re-optimized.

* `grunt` will watch the images directory
* `grunt images` will manually minify all new images

## Base Icon Fonts

site-start ships with common icon fonts you may want to use. You can view them
in `dist/fonts/base-icon-fonts/demo.html`. Include them by adding a
`base-icon-[name]` class to any element. Example:

```html
<i class="base-icon-facebook"></i>
```

## Package Managers

site-start uses 3 package managers to manage dependencies:

* Ruby Gems
* Bower
* NPM

After adding any packages, run this to install/update them:
```
bin/install
```

#### Ruby Gems

* File to update when adding package: `Gemfile`
* Packages get built to: `vendor/bundle/`

Some gems will include new executable commands, which can be run as follows:

```bash
bundle exec [command-name]

-or-

bin/bundle/[command-name]
```

#### Bower Components

* File to update when adding package: `bower.json`
* Packages get built to: `vendor/bower_components/`

#### Node Packages

* File to update when adding package: `package.json`
* Packages get built to: `node_modules/`

## License

Copyright (c) 2014 [Staplegun Design](http://staplegun.us)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
