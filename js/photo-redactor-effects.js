'use strict';

window.photoRedactorEffect = (function () {
  var BAR_LENGTH = 450;
  var iSize = window.main.IMAGE_SIZE;
  var effectLevelPin = window.photoRedactor.effectLevelBar.querySelector('.effect-level__pin');
  var effectLevelDepth = window.photoRedactor.effectLevelBar.querySelector('.effect-level__depth');
  var userPhoto = window.main.photoList.querySelector('.img-upload__preview img');
  var effectLevelValue = window.main.photoList.querySelector('.effect-level__value');
  var filterName;

  // Реализация перемещения ползунка регулятора

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var currentCoords = evt.clientX;
    var currentPinShift;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = currentCoords - moveEvt.clientX;
      currentCoords = moveEvt.clientX;

      currentPinShift = Number(effectLevelPin.style.left.slice(0, -2));
      if (currentPinShift >= 1 && currentPinShift <= BAR_LENGTH - 1) {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + 'px'; // позиция бегунка бара
        effectLevelDepth.style.width = (effectLevelPin.offsetLeft - shift) + 'px'; // длина окрашенной области бара
        effectLevelValue.value = effectLevelPin.offsetLeft - shift; // глубина эффекта
        if (effectLevelValue.value < 0) { // защита от отрицательных значений эффектов
          effectLevelValue.value = 0;
        }
        // применение фильтров
        userPhoto.setAttribute('style', 'filter: ' + filterName + '(' + effectLevelValue.value / 450 + ')');
        if (filterName === 'invert') {
          userPhoto.setAttribute('style', 'filter: ' + filterName + '(' + effectLevelValue.value / 4.5 + '%)');
        } else if (filterName === 'blur') {
          userPhoto.setAttribute('style', 'filter: ' + filterName + '(' + effectLevelValue.value / 450 * 3 + 'px)');
        } else if (filterName === 'brightness') {
          userPhoto.setAttribute('style', 'filter: ' + filterName + '(' + (effectLevelValue.value / 450 * 2 + 1) + ')');
        }
      } else if (currentPinShift < 1) { // ограничение бегунка и защита от прилипания
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        effectLevelPin.style.left = '1px';
        effectLevelDepth.style.width = '1px';

      } else {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        effectLevelPin.style.left = String(BAR_LENGTH - 1) + 'px';
        effectLevelDepth.style.width = String(BAR_LENGTH - 1) + 'px';

      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  return {

    // +- Картинки превью

    growImagePreview: function () {
      if (iSize > 25) {
        iSize -= 25;
        window.photoRedactor.userImagePreview.setAttribute('style', 'transform: scale(' + iSize / 100 + ')');
        window.photoRedactor.imageSizeWindow.setAttribute('value', String(iSize) + '%');
      }
    },

    shrinkImagePreview: function () {
      if (iSize < 100) {
        iSize += 25;
        window.photoRedactor.userImagePreview.setAttribute('style', 'transform: scale(' + iSize / 100 + ')');
        window.photoRedactor.imageSizeWindow.setAttribute('value', String(iSize) + '%');
      }
    },

    // Показ-скрытие регулятора фильтров + установка фильтров

    hidingEffectBar: function (evt) {
      if (evt.target.id !== 'effect-none') {
        window.photoRedactor.effectLevelBar.classList.remove('hidden');
        effectLevelPin.style.left = '449px';
        effectLevelDepth.style.width = '449px';
        if (evt.target.value === 'chrome') {
          userPhoto.setAttribute('style', 'none');
          userPhoto.classList.add('effects__preview--' + evt.target.value);
          userPhoto.classList.remove(userPhoto.classList.item(0));
          filterName = 'grayscale';
        } else if (evt.target.value === 'sepia') {
          userPhoto.setAttribute('style', 'none');
          userPhoto.classList.add('effects__preview--' + evt.target.value);
          userPhoto.classList.remove(userPhoto.classList.item(0));
          filterName = 'sepia';
        } else if (evt.target.value === 'marvin') {
          userPhoto.setAttribute('style', 'none');
          userPhoto.classList.add('effects__preview--' + evt.target.value);
          userPhoto.classList.remove(userPhoto.classList.item(0));
          filterName = 'invert';
        } else if (evt.target.value === 'phobos') {
          userPhoto.setAttribute('style', 'none');
          userPhoto.classList.add('effects__preview--' + evt.target.value);
          userPhoto.classList.remove(userPhoto.classList.item(0));
          filterName = 'blur';
        } else if (evt.target.value === 'heat') {
          userPhoto.setAttribute('style', 'none');
          userPhoto.classList.add('effects__preview--' + evt.target.value);
          userPhoto.classList.remove(userPhoto.classList.item(0));
          filterName = 'brightness';
        }
      } else {
        window.photoRedactor.effectLevelBar.classList.add('hidden');
        userPhoto.classList.add('effects__preview--' + evt.target.value);
        userPhoto.classList.remove(userPhoto.classList.item(0));
        userPhoto.setAttribute('style', 'none');
      }
    },
  };
})();
