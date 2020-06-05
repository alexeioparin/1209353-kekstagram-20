'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Кекс', 'Наташа', 'Вася', 'Артемий', 'Евлампий', 'Маня', 'Слава', 'Ашот', 'Арнольд', 'Рудольф'];
var ALTS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
var template = document.querySelector('#picture').content.querySelector('a');
var getRandom = function (number) {
  return Math.floor(Math.random() * number);
};

/* Формирование комментариев */

var getComments = function () {
  var com = [];
  for (var i = 0; i <= getRandom(4); i++) {
    com[i] = {
      avatar: 'img/avatar-' + getRandom(6) + 1 + '.svg',
      message: COMMENTS[getRandom(COMMENTS.length)],
      name: NAMES[getRandom(NAMES.length)],
    };
  }
  return com;
};

/* Формирование фотографий с комментариями */

var getUserPhotos = function () {
  var userPhotos = [];
  for (var i = 0; i < 25; i++) {
    userPhotos[i] = {
      url: 'photos/' + i + 1 + '.jpg',
      description: ALTS[i],
      likes: getRandom(186) + 15,
      comments: getComments(),
    };
  }
  return userPhotos;
};

/* Создание DOM элемента */

var getUserElement = function (user) {
  var userElement = template.cloneNode(true);
  userElement.querySelector('.picture__img').setAttribute('src', user.url);
  userElement.querySelector('.picture__likes').textContent(String(user.likes));
  userElement.querySelector('.picture__comments').textContent(String(user.comments.length));
  return userElement;
};

/* Отрисовка DOM элемента */

var setUserElement = function (userPhotoList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < userPhotoList.length; i++) {
    fragment.appendChild(getUserElement(userPhotoList[i]));
  }
  return fragment;
};

var photoList = document.querySelector('.pictures');
photoList.appendChild(setUserElement(getUserPhotos()));
