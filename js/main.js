'use strict';

window.main = (function () {
  var IMAGE_SIZE = 100;
  var ESC_BUTTON = 'Escape';
  var ENTER_BUTTON = 'Enter';
  var photoTemplate = document.querySelector('#picture').content.querySelector('a');
  var getRandom = function (number) {
    return Math.floor(Math.random() * number);
  };
  var photoList = document.querySelector('.pictures');
  var indexBody = document.querySelector('body');
  var indexMain = document.querySelector('main');
  var sortBlock = document.querySelector('.img-filters');
  var loadedData = [];

  // Создание миниатюры фото

  var createSmallPhoto = function (user) {
    var userElement = photoTemplate.cloneNode(true);
    userElement.querySelector('.picture__img').setAttribute('src', user.url);
    userElement.querySelector('.picture__likes').textContent = user.likes;
    userElement.querySelector('.picture__comments').textContent = user.comments.length;
    return userElement;
  };

  // Отрисовка шаблонных элементов

  var setSimilarElement = function (itemList, addTemplateFunc, placeToAdd, elementLimit) {
    var fragment = document.createDocumentFragment();
    var elemNumber;
    if (elementLimit && elementLimit < itemList.length) {
      elemNumber = elementLimit;
    } else {
      elemNumber = itemList.length;
    }
    for (var i = 0; i < elemNumber; i++) {
      fragment.appendChild(addTemplateFunc(itemList[i]));
    }
    placeToAdd.appendChild(fragment);
  };

  // Успешное добавление изображений с сервера

  var successHandler = function (data) {
    window.main.loadedData = data;
    setSimilarElement(window.main.loadedData, window.main.createSmallPhoto, window.main.photoList);
    sortBlock.classList.remove('img-filters--inactive');
  };

  // Отображение окна ошибок

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  return {
    photoList: photoList,
    IMAGE_SIZE: IMAGE_SIZE,
    ESC_BUTTON: ESC_BUTTON,
    ENTER_BUTTON: ENTER_BUTTON,
    getRandom: getRandom,
    indexBody: indexBody,
    indexMain: indexMain,
    errorHandler: errorHandler,
    createSmallPhoto: createSmallPhoto,
    setSimilarElement: setSimilarElement,
    loadedData: loadedData,
  };
})();
