/*
  * Revealing Module Pattern
  * 1. Define all of our functions and variables in the private scope
  * 2. Return an anonymous object with pointers to the private functionality we wished to reveal as public
  * Reference: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
  */

var App = (function () {

  //=== Use Strict ===//
  'use strict';


  //=== Private Variables ===//
  var body = document.body,
      enhanceClass = 'cutsmustard';

  //=== Private Methods ===//
  var cutsMustard = (function() {
    document.documentElement.className += ' ' + enhanceClass;
  }());

  //=== Public Methods ===//
  function init() {

    // Initialize SmoothScroll
    smoothScroll.init({
      speed: 300,
      easing: 'easeInOutQuad',
      updateURL: false,
      offset: 100,
      callbackBefore: function ( toggle, anchor ) {}
    });

  }

  //=== Make Methods Public ===//
  return {
    init: init
  };

})();

App.init();