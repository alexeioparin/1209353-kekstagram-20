'use strict';

window.main = (function () {
  var IMAGE_SIZE = 100;
  var ESC_BUTTON = 'Escape';
  var ENTER_BUTTON = 'Enter';
  var template = document.querySelector('#picture').content.querySelector('a');
  var getRandom = function (number) {
    return Math.floor(Math.random() * number);
  };
  var photoList = document.querySelector('.pictures');
  var indexBody = document.querySelector('body');
  var sortBlock = document.querySelector('.img-filters');
  var loadedData = [];

  // Создание DOM элемента

  var getUserElement = function (user) {
    var userElement = template.cloneNode(true);
    userElement.querySelector('.picture__img').setAttribute('src', user.url);
    userElement.querySelector('.picture__likes').textContent = user.likes;
    userElement.querySelector('.picture__comments').textContent = user.comments.length;
    return userElement;
  };

  // Отрисовка похожих элементов

  var setUserElement = function (userPhotoList, addTemplateFunc, placeToAdd, elementLimit) {
    var fragment = document.createDocumentFragment();
    var elemNumber;
    if (elementLimit) {
      elemNumber = elementLimit;
    } else {
      elemNumber = userPhotoList.length;
    }
    for (var i = 0; i < elemNumber; i++) {
      fragment.appendChild(addTemplateFunc(userPhotoList[i]));
    }
    placeToAdd.appendChild(fragment);
  };

  // Успешное добавление изображений с сервера

  var successHandler = function (data) {
    window.main.loadedData = data;
    setUserElement(window.main.loadedData, window.main.getUserElement, window.main.photoList);
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
    errorHandler: errorHandler,
    getUserElement: getUserElement,
    setUserElement: setUserElement,
    loadedData: loadedData,
  };
})();
