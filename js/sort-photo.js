'use strict';

window.sortPhoto = (function () {
  var SHORT_MASS_LENGTH = 10;
  var defaultButton = document.querySelector('#filter-default');
  var randomButton = document.querySelector('#filter-random');
  var discussedButton = document.querySelector('#filter-discussed');
  var massForShow = [];

  // Обработчик кнопки по умолчанию

  defaultButton.addEventListener('click', function () {
    window.sortPhoto.massForShow = window.main.loadedData;
    window.debounce.photoShowTimeoutRefresh();
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
    window.sortPhoto.massForShow = userShortPhotoList(window.main.loadedData, SHORT_MASS_LENGTH);
    window.debounce.photoShowTimeoutRefresh();
    randomButton.classList.add('img-filters__button--active');
    defaultButton.classList.remove('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');
  });

  // Обработчик для выведения самых обсуждаемых фото

  discussedButton.addEventListener('click', function () {
    var newMass = window.main.loadedData.slice();
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
    window.sortPhoto.massForShow = newMass;
    window.debounce.photoShowTimeoutRefresh();
    defaultButton.classList.remove('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    discussedButton.classList.add('img-filters__button--active');
  });

  return {
    massForShow: massForShow,
  };
})();
