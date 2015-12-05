jQuery-flexImages
===================

A lightweight jQuery plugin for creating fluid galleries as seen on Flickr and Google Images.

Compatible with jQuery 1.7.0+ in Firefox, Safari, Chrome, Opera, Internet Explorer 7+. No dependencies except the jQuery library.
Released under the MIT License: http://www.opensource.org/licenses/mit-license.php

This plugin was developed by and for [Pixabay.com](https://pixabay.com/) - an international repository for sharing free public domain images.
We have implemented this plugin in production and we share this piece of software - in the spirit of Pixabay - freely with others.

## Demo and Documentation

https://goodies.pixabay.com/jquery/flex-images/demo.html

## Features

* Lightweight: 1.4 kB of JavaScript - less than 0.7 kB gzipped
* Source images/objects can have any size
* Works with more than just images, e.g. videos, iframes and plain text
* Responsive
* Equal margins between images controlled via CSS
* No cropping or reordering
* AJAX ready, e.g. for infinite scrolling
* Support for lazy loading of images and iframe contents
* Layout options to control e.g. the maximum number of rows - or whether or not to display an incomplete (last) row.

## Changelog

### Version 1.0.4 - 2015/12/05

* Fixed #9 and #15: Incorrect width in Chrome.

### Version 1.0.3 - 2015/10/30

* Fixed error in calculation that caused the last image in each row to be cut off

### Version 1.0.2 - 2015/04/01

* Improved rendering performance by using Vanilla JS.

### Version 1.0.1 - 2014/09/14

* Cleaned up JavaScript code.

### Version 1.0.0 - 2014/09/14

* Initial release
