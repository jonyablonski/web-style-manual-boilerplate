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
      navToggle = document.getElementById('js-nav-toggle'),
      toggledNavClass = 'nav-is-toggled',
      header = document.getElementById('js-header'),
      headerHeight = header.offsetHeight,
      shareLink = document.getElementById('js-share');


  //=== Private Methods ===//
  var cutsMustard = (function() {
    document.documentElement.className += ' ' + enhanceClass;
  }());


  var loadSVG = (function() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../../svg-defs.svg", true);
    ajax.send();
    ajax.onload = function(e) {
      var div = document.createElement("div");
      div.innerHTML = ajax.responseText;
      document.body.insertBefore(div, document.body.childNodes[0]);
    }
  })();


  var toggleNav = function(event) {
    if (body.classList.contains(toggledNavClass) ) {
      body.classList.remove(toggledNavClass);
    } else {
      body.classList.add(toggledNavClass);
    }
    event.preventDefault();
  };


  var shareOnTwitter = function(event) {
      var link = event.currentTarget,
      shareName = link.getAttribute('data-name'),
      shareLink = link.getAttribute('data-link'),
      shareContributors = '@JonYablonski',
      shareSettings = "'sharer','toolbar=0,status=0,width=180,height=325'";
      event.preventDefault();
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('Check out the Web Style Manual: a styleguide boilerplate for web projects. ' + shareLink + ' via ' + shareContributors), shareSettings );
      return false;
  };


  //=== Public Methods ===//
  function init() {

    // Listen for Clicks on #js-nav-toggle
    navToggle.addEventListener('click', toggleNav, false);

    // Listen for Clicks on #js-share
    shareLink.addEventListener('click', shareOnTwitter, false);


    // Initialize SmoothScroll
    smoothScroll.init({
      speed: 300,
      easing: 'easeInOutQuad',
      updateURL: false,
      offset: headerHeight,
      callbackBefore: function ( toggle, anchor ) {
        if (body.classList.contains(toggledNavClass) ) {
          body.classList.remove(toggledNavClass);
        }
      }
    });

  }

  //=== Make Methods Public ===//
  return {
    init: init
  };

})();

App.init();