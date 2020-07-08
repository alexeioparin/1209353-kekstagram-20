'use strict';

window.main = (function () {
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Кекс', 'Наташа', 'Вася', 'Артемий', 'Евлампий', 'Маня', 'Слава', 'Ашот', 'Арнольд', 'Рудольф'];
  var ALTS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
  var MAX_COMMENTS = 4;
  var IMAGE_SIZE = 100;
  var ESC_BUTTON = 'Escape';
  var ENTER_BUTTON = 'Enter';
  var template = document.querySelector('#picture').content.querySelector('a');
  var getRandom = function (number) {
    return Math.floor(Math.random() * number);
  };
  var photoList = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureFoto = bigPicture.querySelector('.big-picture__img');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureComments = bigPicture.querySelector('.comments-count');
  // var commentList = bigPicture.querySelector('.social__comments');
  var indexBody = document.querySelector('body');
  var sortBlock = document.querySelector('.img-filters');
  var loadedData = [];

  // Формирование комментариев

  var getComments = function () {
    var comments = [];
    for (var i = 0; i <= getRandom(MAX_COMMENTS); i++) {
      comments[i] = {
        avatar: 'img/avatar-' + getRandom(6) + 1 + '.svg',
        message: COMMENTS[getRandom(COMMENTS.length)],
        name: NAMES[getRandom(NAMES.length)],
      };
    }
    return comments;
  };

  // Формирование фотографий с комментариями

  var getUserPhotos = function () {
    var userPhotos = [];
    for (var i = 0; i < 25; i++) {
      userPhotos[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        description: ALTS[i],
        likes: getRandom(186) + 15,
        comments: getComments(),
      };
    }
    return userPhotos;
  };

  // Создание DOM элемента

  var getUserElement = function (user) {
    var userElement = template.cloneNode(true);
    userElement.querySelector('.picture__img').setAttribute('src', user.url);
    userElement.querySelector('.picture__likes').textContent = String(user.likes);
    userElement.querySelector('.picture__comments').textContent = String(user.comments.length);
    return userElement;
  };

  // Отрисовка похожих элементов

  var setUserElement = function (userPhotoList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < userPhotoList.length; i++) {
      fragment.appendChild(getUserElement(userPhotoList[i]));
    }
    photoList.appendChild(fragment);
  };

  // Успешное добавление изображений с сервера

  var successHandler = function (data) {
    window.main.loadedData = data;
    setUserElement(window.main.loadedData);
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


  // bigPicture.classList.remove('hidden');

  // Определение свойств элементов большого фото

  bigPictureFoto.src = getUserPhotos()[0].url;
  bigPictureLikes.textContent = String(getUserPhotos()[0].likes);
  bigPictureComments.textContent = String(getUserPhotos()[0].comments.length);

  return {
    photoList: photoList,
    COMMENTS: COMMENTS,
    NAMES: NAMES,
    ALTS: ALTS,
    MAX_COMMENTS: MAX_COMMENTS,
    IMAGE_SIZE: IMAGE_SIZE,
    ESC_BUTTON: ESC_BUTTON,
    ENTER_BUTTON: ENTER_BUTTON,
    getRandom: getRandom,
    indexBody: indexBody,
    errorHandler: errorHandler,
    setUserElement: setUserElement,
    loadedData: loadedData,
  };
})();
