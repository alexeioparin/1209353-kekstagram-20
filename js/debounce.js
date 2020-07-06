'use strict';

window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  var eraseBlock = function (block, deletedElemSelector) {
    var allPhotos = document.querySelectorAll(deletedElemSelector);
    for (var i = 0; i < allPhotos.length; i++) {
      block.lastChild.remove();
    }
  };
  var winDebounce = function (cb) {
    eraseBlock(window.main.photoList, '.pictures a');
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  return {
    winDebounce: winDebounce,
  };
})();
