'use strict';

window.validator = (function () {

  // вызов обработчика скроллбара эффектов

  window.effectScrollbar.effectLevelPin.addEventListener('mousedown', window.effectScrollbar.effectScrollBar);

  // Валидация инпута шэштегов

  return {
    // ...на повторы

    checkInputForRepeat: function (checkLength, checkedTags) {
      var isRepeat;
      for (var j = 0; j < checkLength; j++) {
        if (checkedTags[j] === checkedTags[checkLength]) {
          isRepeat = true;
        }
      }
      return isRepeat;
    },

    // ...на формат данных

    checkInputForFormat: function (regularExp, checkedTags) {
      var isInvalid = {};
      for (var i = 0; i < checkedTags.length; i++) {
        if (!regularExp.test(checkedTags[i]) && checkedTags[i] !== '' && checkedTags[i] !== '#') {
          isInvalid.format = true;
        }
        if (window.validator.checkInputForRepeat(i, checkedTags)) {
          isInvalid.repeat = true;
        }
      }
      return isInvalid;
    },

    // Обработка инпута

    checkHashtagInpit: function () {
      var userHashtags = window.photoRedactor.hashtagInput.value.split(' ', 5);
      var isInvalid = window.validator.checkInputForFormat(window.photoRedactor.hashtagExample, userHashtags);
      if (isInvalid.format) {
        window.photoRedactor.hashtagInput.setAttribute('style', 'background-color: pink');
        window.photoRedactor.hashtagInput.setCustomValidity('Неверный формат хэштега');
      } else if (isInvalid.repeat) {
        window.photoRedactor.hashtagInput.setAttribute('style', 'background-color: pink');
        window.photoRedactor.hashtagInput.setCustomValidity('Повторение хэштега');
      } else {
        window.photoRedactor.hashtagInput.setAttribute('style', 'none');
        window.photoRedactor.hashtagInput.setCustomValidity('');
      }
    },
  };
})();
