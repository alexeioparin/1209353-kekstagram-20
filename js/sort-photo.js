'use strict';

window.sortPhoto = (function () {
  var SHORT_MASS_LENGTH = 10;
  var defaultButton = document.querySelector('#filter-default');
  var randomButton = document.querySelector('#filter-random');
  var discussedButton = document.querySelector('#filter-discussed');

  // Обработчик кнопки по умолчанию

  defaultButton.addEventListener('click', function () {
    var tempFunc = function () {
      window.main.setUserElement(window.backend.loadedData);
    };
    window.debounce.winDebounce(tempFunc);
    defaultButton.classList.add('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');
  });

  // Обработчик для отображения 10 случайных фото

  randomButton.addEventListener('click', function () {
    // Формирование массива случайных элементов
    var userShortPhotoList = function (mass, elemLimit) {
      var shortMass = [];
      var massCopy = mass.slice();
      for (var i = 0; i < elemLimit; i++) {
        var randIndex = window.main.getRandom(massCopy.length);
        shortMass[i] = massCopy[randIndex];
        massCopy.splice(randIndex, 1);
      }
      return shortMass;
    };
    var newMass = userShortPhotoList(window.backend.loadedData, SHORT_MASS_LENGTH);
    var tempFunc = function () {
      window.main.setUserElement(newMass);
    };
    window.debounce.winDebounce(tempFunc);
    randomButton.classList.add('img-filters__button--active');
    defaultButton.classList.remove('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');
  });

  // Обработчик для выведения самых обсуждаемых фото

  discussedButton.addEventListener('click', function () {
    var newMass = window.backend.loadedData.slice();
    newMass.sort(function (a, b) {
      var diff;
      if (a.comments > b.comments) {
        diff = -1;
      }
      if (a.comments === b.comments) {
        diff = 0;
      }
      if (a.comments < b.comments) {
        diff = 1;
      }
      return diff;
    });
    var tempFunc = function () {
      window.main.setUserElement(newMass);
    };
    window.debounce.winDebounce(tempFunc);
    defaultButton.classList.remove('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    discussedButton.classList.add('img-filters__button--active');
  });

})();
