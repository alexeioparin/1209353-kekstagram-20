'use strict';

window.photoRedactorEffect = (function () {

  var IMAGE_MIN_SIZE = 25;
  var IMAGE_MAX_SIZE = 100;
  var iSize = window.main.IMAGE_SIZE;
  var filterName;

  return {

    filterName: filterName,

    // +- Картинки превью

    growImagePreview: function () {
      if (iSize > IMAGE_MIN_SIZE) {
        iSize -= 25;
        window.photoRedactor.userImagePreview.setAttribute('style', 'transform: scale(' + iSize / 100 + ')');
        window.photoRedactor.imageSizeWindow.setAttribute('value', String(iSize) + '%');
      }
    },

    shrinkImagePreview: function () {
      if (iSize < IMAGE_MAX_SIZE) {
        iSize += 25;
        window.photoRedactor.userImagePreview.setAttribute('style', 'transform: scale(' + iSize / 100 + ')');
        window.photoRedactor.imageSizeWindow.setAttribute('value', String(iSize) + '%');
      }
    },

    // Показ-скрытие регулятора фильтров + установка фильтров
    setEffect: function (inputElement) {
      window.effectScrollbar.userPhoto.setAttribute('style', 'none');
      window.effectScrollbar.userPhoto.classList.add('effects__preview--' + inputElement);
      window.effectScrollbar.userPhoto.classList.remove(window.effectScrollbar.userPhoto.classList.item(0));
    },

    hidingEffectBar: function (evt) {
      if (evt.target.id !== 'effect-none') {
        window.photoRedactor.effectLevelBar.classList.remove('hidden');
        window.effectScrollbar.effectLevelPin.style.left = '449px';
        window.effectScrollbar.effectLevelDepth.style.width = '449px';
        window.photoRedactorEffect.setEffect(evt.target.value);
        if (evt.target.value === 'chrome') {
          window.photoRedactorEffect.filterName = 'grayscale';
        } else if (evt.target.value === 'sepia') {
          window.photoRedactorEffect.filterName = 'sepia';
        } else if (evt.target.value === 'marvin') {
          window.photoRedactorEffect.filterName = 'invert';
        } else if (evt.target.value === 'phobos') {
          window.photoRedactorEffect.filterName = 'blur';
        } else if (evt.target.value === 'heat') {
          window.photoRedactorEffect.filterName = 'brightness';
        }
      } else {
        window.photoRedactor.effectLevelBar.classList.add('hidden');
        window.effectScrollbar.userPhoto.classList.add('effects__preview--' + evt.target.value);
        window.effectScrollbar.userPhoto.classList.remove(window.effectScrollbar.userPhoto.classList.item(0));
        window.effectScrollbar.userPhoto.setAttribute('style', 'none');
      }
    },
  };
})();
