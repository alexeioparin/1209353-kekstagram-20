'use strict';

window.photoRedactorEffect = (function () {

  var IMAGE_MIN_SIZE = 25;
  var IMAGE_MAX_SIZE = 100;
  var iSize = window.main.IMAGE_SIZE;
  var filterName;
  var filtersByTargetValue = {
    chrome: 'grayscale',
    sepia: 'sepia',
    marvin: 'invert',
    phobos: 'blur',
    heat: 'brightness',
  };

  // +- Картинки превью

  var growImagePreview = function () {
    if (iSize > IMAGE_MIN_SIZE) {
      iSize -= 25;
      window.photoRedactor.userImagePreview.style.transform = ('scale(' + iSize / 100 + ')');
      window.photoRedactor.imageSizeWindow.setAttribute('value', String(iSize) + '%');
    }
  };

  var shrinkImagePreview = function () {
    if (iSize < IMAGE_MAX_SIZE) {
      iSize += 25;
      window.photoRedactor.userImagePreview.style.transform = ('scale(' + iSize / 100 + ')');
      window.photoRedactor.imageSizeWindow.setAttribute('value', String(iSize) + '%');
    }
  };

  // Показ-скрытие регулятора фильтров + установка фильтров

  var setEffect = function (inputElement) {
    window.effectScrollbar.userPhoto.setAttribute('style', 'none');
    window.effectScrollbar.userPhoto.classList.add('effects__preview--' + inputElement);
    window.effectScrollbar.userPhoto.classList.remove(window.effectScrollbar.userPhoto.classList.item(0));
  };

  var hidingEffectBar = function (evt) {
    if (evt.target.classList[0] === 'effects__radio') {
      if (evt.target.id !== 'effect-none') {
        window.photoRedactor.effectLevelBar.classList.remove('hidden');
        window.effectScrollbar.effectLevelPin.style.left = '449px';
        window.effectScrollbar.effectLevelDepth.style.width = '449px';
        window.photoRedactorEffect.setEffect(evt.target.value);
        window.photoRedactorEffect.filterName = filtersByTargetValue[evt.target.value];
      } else {
        window.photoRedactor.effectLevelBar.classList.add('hidden');
        window.effectScrollbar.userPhoto.classList.add('effects__preview--' + evt.target.value);
        window.effectScrollbar.userPhoto.classList.remove(window.effectScrollbar.userPhoto.classList.item(0));
        window.effectScrollbar.userPhoto.setAttribute('style', 'none');
      }
    }
  };

  return {
    filterName: filterName,
    growImagePreview: growImagePreview,
    shrinkImagePreview: shrinkImagePreview,
    setEffect: setEffect,
    hidingEffectBar: hidingEffectBar,
    iSize: iSize,
  };
})();
