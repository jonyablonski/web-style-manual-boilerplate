var App = (function () {

  //=== Use Strict ===//
  'use strict';


  //=== Private Variables ===//
  var body = document.body,
      enhanceClass = 'cutsmustard',
      lastScrollY = 0,
      header = document.getElementById('js-header'),
      menu = document.getElementById('js-contents-menu'),
      menuContents = "",
      section = document.querySelectorAll('.section');

  //=== Private Methods ===//
  var cutsMustard = (function() {
    document.documentElement.className += ' ' + enhanceClass;
  }());


  //=== Scroll ===//
  var removeQuotes = function(string) {
    if (typeof string === 'string' || string instanceof String) {
        string = string.replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, '');
    }
    return string;
  };


  var debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };


  var throttle = function(callback, limit) {
    var wait = false;
    return function () {
      if (!wait) {
        callback.call();
        wait = true;
        setTimeout(function () {
          wait = false;
        }, limit);
      }
    };
  };


  var eventCheck = function() {
    var size = window.getComputedStyle(document.body,':after').getPropertyValue('content');
    return removeQuotes(size);
  };


  var onScroll = function() {
    if ( eventCheck() == "medium" ) {
      lastScrollY = window.pageYOffset;
      stickyElement(menu, header);
    } else {
      return;
    }
  };


  var onResize = throttle(function() {
    eventCheck();
    if ( menu.classList.contains('is-sticky') && eventCheck() == "small" ) {
      menu.classList.remove('is-sticky');
    }
  }, 100);


  var stickyElement = function(element, offset) {
    var currentScrollY = lastScrollY,
    elementTop = element.offsetTop,
    offsetHeight = offset.clientHeight;

    if ( currentScrollY > offsetHeight ) {
      element.classList.add('is-sticky');
    } else if ( currentScrollY < offsetHeight && element.classList.contains('is-sticky') ) {
      element.classList.remove('is-sticky');
    } else {
      return;
    }
  };


  var createMenu = (function() {
    [].forEach.call(section, function(el) {
      var id = el.getAttribute('id'),
      link = "#" + id,
      text = el.getAttribute('id'),
      title = text.charAt(0).toUpperCase() + text.substring(1),
      newLine = "<a href='" + link + "' data-scroll>" + title + "</a>";
      menuContents += newLine;
    });
    menu.insertAdjacentHTML('beforeend', menuContents);
  })();


  //=== Public Methods ===//
  function init() {


    // Listen for window scroll
    window.addEventListener('scroll', onScroll, false);


    // Listen for window resize
    window.addEventListener('resize', onResize, false);


    // Fire Event Check Function
    eventCheck();


    // Initialize SmoothScroll
    smoothScroll.init({
      speed: 300,
      easing: 'easeInOutQuad',
      updateURL: false,
      offset: 24,
      callbackBefore: function ( toggle, anchor ) {}
    });


  }

  //=== Make Methods Public ===//
  return {
    init: init
  };

})();

App.init();