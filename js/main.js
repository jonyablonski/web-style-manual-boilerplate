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
      enhanceClass = 'cutsmustard',
      section = document.querySelectorAll('.section'),
      menu = document.getElementById('js-content-menu'),
      menuContents = "";

  //=== Private Methods ===//
  var cutsMustard = (function() {
    document.documentElement.className += ' ' + enhanceClass;
  }());


  var createMenu = (function() {
    [].forEach.call(section, function(el) {
      var id = el.getAttribute('id'),
      link = "#" + id,
      text = el.getAttribute('id'),
      title = text.charAt(0).toUpperCase() + text.substring(1),
      newLine = "<a href='" + link + "'>" + title + "</a>";
      menuContents += newLine;
    });
    menu.insertAdjacentHTML('beforeend', menuContents);
  })();


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