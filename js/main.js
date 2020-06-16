'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Кекс', 'Наташа', 'Вася', 'Артемий', 'Евлампий', 'Маня', 'Слава', 'Ашот', 'Арнольд', 'Рудольф'];
var ALTS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
var MAX_COMMENTS = 4;
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

/* Формирование комментариев */

var getComments = function () {
  var com = [];
  for (var i = 0; i <= getRandom(MAX_COMMENTS); i++) {
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
      url: 'photos/' + (i + 1) + '.jpg',
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
  userElement.querySelector('.picture__likes').textContent = String(user.likes);
  userElement.querySelector('.picture__comments').textContent = String(user.comments.length);
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

photoList.appendChild(setUserElement(getUserPhotos()));

/* bigPicture.classList.remove('hidden'); */

/* Определение свойств элементов большого фото */

bigPictureFoto.src = getUserPhotos()[0].url;
bigPictureLikes.textContent = String(getUserPhotos()[0].likes);
bigPictureComments.textContent = String(getUserPhotos()[0].comments.length);

/* Показ-скрытие обработчика фото + редактирование размера изображения + управление регулятором эффектов + валидация поля хэштегов*/

var userPhotoInput = photoList.querySelector('#upload-file');
var userPhotoFilter = photoList.querySelector('.img-upload__overlay');
var editorCloseButton = photoList.querySelector('.img-upload__cancel');
var userImagePreview = photoList.querySelector('.img-upload__preview');
var imagePreviewMinus = photoList.querySelector('.scale__control--smaller');
var imagePreviewPlus = photoList.querySelector('.scale__control--bigger');
var imageSizeWindow = photoList.querySelector('.scale__control--value');
var iSize = 100;
var effectLevelBar = photoList.querySelector('.img-upload__effect-level');
var hashtagExample = /^#[A-Za-zА-Яа-я0-9_]{1,19}$/;
var hashtagInput = photoList.querySelector('.text__hashtags');
var commentOnPhotoEditor = photoList.querySelector('.text__description');
var onEscEditorClose = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    userPhotoFilter.classList.add('hidden');
  }
};
var growImagePreview = function () {
  if (iSize > 25) {
    iSize -= 25;
    userImagePreview.setAttribute('style', 'transform: scale(' + iSize / 100 + ')');
    imageSizeWindow.setAttribute('value', String(iSize) + '%');
  }
};
var shrinkImagePreview = function () {
  if (iSize < 100) {
    iSize += 25;
    userImagePreview.setAttribute('style', 'transform: scale(' + iSize / 100 + ')');
    imageSizeWindow.setAttribute('value', String(iSize) + '%');
  }
};
var hidingEffectBar = function (evt) {
  if (evt.target.value !== 'none' && evt.target.matches('input.effects__radio')) {
    effectLevelBar.classList.remove('hidden');
  } else {
    effectLevelBar.classList.add('hidden');
  }
};
var checkHashtagInpit = function () {
  var userHashtags = hashtagInput.value.split(' ', 5);
  for (var i = 0; i < userHashtags.length; i++) {
    if (!hashtagExample.test(userHashtags[i]) && userHashtags[i] !== '' && userHashtags[i] !== '#') {
      hashtagInput.setAttribute('style', 'background-color: pink');
      hashtagInput.setCustomValidity('Неверный формат хэштега');
    } else {
      hashtagInput.setAttribute('style', 'none');
      hashtagInput.setCustomValidity('');
    }
    for (var j = 0; j < i; j++) {
      if (userHashtags[j] === userHashtags[i]) {
        hashtagInput.setAttribute('style', 'background-color: pink');
        hashtagInput.setCustomValidity('Повторение хэштега');
      } else {
        hashtagInput.setAttribute('style', 'none');
        hashtagInput.setCustomValidity('');
      }
    }
  }
};
var onInputEscCancel = function () {
  userPhotoFilter.removeEventListener('keydown', onEscEditorClose);
};
var outInputEscOn = function () {
  userPhotoFilter.addEventListener('keydown', onEscEditorClose);
};
var showUserPhotoEditor = function () {
  indexBody.classList.add('modal-open');
  userPhotoFilter.classList.remove('hidden');
  userPhotoFilter.addEventListener('keydown', onEscEditorClose);
  imagePreviewMinus.addEventListener('click', growImagePreview);
  imagePreviewPlus.addEventListener('click', shrinkImagePreview);
  userPhotoFilter.addEventListener('focusin', hidingEffectBar);
  hashtagInput.addEventListener('input', checkHashtagInpit);
  hashtagInput.addEventListener('focus', onInputEscCancel);
  hashtagInput.addEventListener('blur', outInputEscOn);
  commentOnPhotoEditor.addEventListener('focus', onInputEscCancel);
  commentOnPhotoEditor.addEventListener('blur', outInputEscOn);
};
var hideUserPhotoEditor = function () {
  indexBody.classList.remove('modal-open');
  userPhotoFilter.classList.add('hidden');
  userPhotoFilter.removeEventListener('keydown', onEscEditorClose);
  imagePreviewMinus.removeEventListener('click', growImagePreview);
  imagePreviewPlus.removeEventListener('click', shrinkImagePreview);
  userPhotoFilter.removeEventListener('focusin', hidingEffectBar);
  effectLevelBar.classList.add('hidden');
  hashtagInput.removeEventListener('input', checkHashtagInpit);
  hashtagInput.removeEventListener('focus', onInputEscCancel);
  hashtagInput.removeEventListener('blur', outInputEscOn);
  commentOnPhotoEditor.addEventListener('focus', onInputEscCancel);
  commentOnPhotoEditor.addEventListener('blur', outInputEscOn);
};
userPhotoInput.addEventListener('change', function () {
  showUserPhotoEditor();
  userPhotoInput.value = '';
});
editorCloseButton.addEventListener('click', function () {
  hideUserPhotoEditor();
});
editorCloseButton.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    hideUserPhotoEditor();
  }
});
