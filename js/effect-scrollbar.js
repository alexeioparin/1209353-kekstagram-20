'use strict';

window.effectScrollbar = (function () {
  var BAR_LENGTH = 450;
  var effectLevelPin = window.photoRedactor.effectLevelBar.querySelector('.effect-level__pin');
  var effectLevelDepth = window.photoRedactor.effectLevelBar.querySelector('.effect-level__depth');
  var effectLevelValue = window.main.photoList.querySelector('.effect-level__value');
  var userPhoto = window.main.photoList.querySelector('.img-upload__preview img');

  var setEffectOnPhoto = function (elemnt) {
    elemnt.setAttribute('style', 'filter: ' + window.photoRedactorEffect.filterName + '(' + effectLevelValue.value / BAR_LENGTH + ')');
    if (window.photoRedactorEffect.filterName === 'invert') {
      elemnt.setAttribute('style', 'filter: ' + window.photoRedactorEffect.filterName + '(' + effectLevelValue.value / (BAR_LENGTH / 100) + '%)');
    } else if (window.photoRedactorEffect.filterName === 'blur') {
      elemnt.setAttribute('style', 'filter: ' + window.photoRedactorEffect.filterName + '(' + effectLevelValue.value / BAR_LENGTH * 3 + 'px)');
    } else if (window.photoRedactorEffect.filterName === 'brightness') {
      elemnt.setAttribute('style', 'filter: ' + window.photoRedactorEffect.filterName + '(' + (effectLevelValue.value / BAR_LENGTH * 2 + 1) + ')');
    }
  };

  // Реализация перемещения ползунка регулятора

  var setScrollBarBehavior = function (elemntShift, cursorShift, onMouseMoveFunc, onMouseUpFunc) {

    if (elemntShift >= 1 && elemntShift <= BAR_LENGTH - 1) {
      effectLevelPin.style.left = (effectLevelPin.offsetLeft - cursorShift) + 'px'; // позиция бегунка бара
      effectLevelDepth.style.width = (effectLevelPin.offsetLeft - cursorShift) + 'px'; // длина окрашенной области бара
      effectLevelValue.value = effectLevelPin.offsetLeft - cursorShift; // глубина эффекта
      if (effectLevelValue.value < 0) { // защита от отрицательных значений эффектов
        effectLevelValue.value = 0;
      }
      // применение фильтров
      window.effectScrollbar.setEffectOnPhoto(userPhoto);

    } else if (elemntShift < 1) { // ограничение бегунка и защита от прилипания
      document.removeEventListener('mousemove', onMouseMoveFunc);
      document.removeEventListener('mouseup', onMouseUpFunc);
      effectLevelPin.style.left = '1px';
      effectLevelDepth.style.width = '1px';

    } else {
      document.removeEventListener('mousemove', onMouseMoveFunc);
      document.removeEventListener('mouseup', onMouseUpFunc);
      effectLevelPin.style.left = String(BAR_LENGTH - 1) + 'px';
      effectLevelDepth.style.width = String(BAR_LENGTH - 1) + 'px';
    }
  };

  var effectScrollBar = function (evt) {
    evt.preventDefault();
    var currentCoords = evt.clientX;
    var currentPinShift;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = currentCoords - moveEvt.clientX;
      currentCoords = moveEvt.clientX;
      currentPinShift = Number(effectLevelPin.style.left.slice(0, -2));
      window.effectScrollbar.setScrollBarBehavior(currentPinShift, shift, onMouseMove, onMouseUp);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return {
    effectLevelPin: effectLevelPin,
    effectLevelDepth: effectLevelDepth,
    effectLevelValue: effectLevelValue,
    userPhoto: userPhoto,
    setEffectOnPhoto: setEffectOnPhoto,
    setScrollBarBehavior: setScrollBarBehavior,
    effectScrollBar: effectScrollBar,
  };
})();
