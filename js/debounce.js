'use strict';

window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  var eraseBlock = function (block, deletedElemSelector) {
    var allPhotos = document.querySelectorAll(deletedElemSelector);
    allPhotos.forEach(function () {
      block.lastChild.remove();
    });
  };
  var photoShowTimeoutRefresh = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      eraseBlock(window.main.photoList, '.pictures a');
      window.main.setUserElement(window.sortPhoto.massForShow, window.main.getUserElement, window.main.photoList);
    }, DEBOUNCE_INTERVAL);
  };

  return {
    photoShowTimeoutRefresh: photoShowTimeoutRefresh,
    eraseBlock: eraseBlock,
  };
})();
