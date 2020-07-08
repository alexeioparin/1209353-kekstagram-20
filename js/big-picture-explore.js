'use strict';

window.bigPictureExplore = (function () {
  var MAX_COMMENTS = 5;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureFoto = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureComments = bigPicture.querySelector('.comments-count');
  var bigPictureSocialComments = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var commentList = bigPicture.querySelector('.social__comments');
  var bigPictureCloseButton = document.querySelector('#picture-cancel');
  var templateForComment = document.querySelector('#picture-big').content.querySelector('li');

  var getRandomUserComment = function (commentMass) {
    var userElement = templateForComment.cloneNode(true);
    userElement.querySelector('.social__text').textContent = commentMass.message;
    userElement.querySelector('.social__picture').setAttribute('src', commentMass.avatar);
    userElement.querySelector('.social__picture').setAttribute('alt', commentMass.name);
    return userElement;
  };

  // Увеличение фото других пользователей

  var hidingBigPicture = function () {
    bigPicture.classList.add('hidden');
    window.main.indexBody.classList.remove('modal-open');
    bigPictureCommentsLoader.classList.remove('hidden');
    bigPictureSocialComments.classList.remove('hidden');
    bigPictureCloseButton.removeEventListener('click', hidingBigPicture);
    document.removeEventListener('keydown', onEscBigPhotoClose);
    bigPictureCloseButton.removeEventListener('keydown', onEnterBigPhotoOpen);
  };

  var onEscBigPhotoClose = function (evt) {
    if (evt.key === window.main.ESC_BUTTON) {
      evt.preventDefault();
      hidingBigPicture();
    }
  };

  var onEnterBigPhotoOpen = function (evt) {
    if (evt.key === window.main.ENTER_BUTTON) {
      hidingBigPicture();
    }
  };

  var showUserBigPhoto = function (evt) {
    if (evt.target.classList.contains('picture__img') || evt.target.classList.contains('picture')) {
      var photoSource = evt.target.src;
      if (evt.target.classList.contains('picture')) {
        photoSource = evt.target.childNodes[1].src;
      }
      bigPicture.classList.remove('hidden');
      window.main.indexBody.classList.add('modal-open');
      bigPictureFoto.src = photoSource;
      bigPictureSocialComments.classList.add('hidden');
      bigPictureCommentsLoader.classList.add('hidden');
      bigPictureCloseButton.addEventListener('click', hidingBigPicture);
      document.addEventListener('keydown', onEscBigPhotoClose);
      bigPictureCloseButton.addEventListener('keydown', onEnterBigPhotoOpen);
      // Определение номера фото по адресу
      var newArrFromUrl = photoSource.split('/');
      var photoName = newArrFromUrl[(newArrFromUrl.length - 1)];
      var photoNumber = photoName.split('.')[0] - 1;
      // Присвоение аттрибутов фото
      bigPictureLikes.textContent = window.main.loadedData[photoNumber].likes;
      bigPictureComments.textContent = window.main.loadedData[photoNumber].comments.length;
      bigPictureDescription.textContent = window.main.loadedData[photoNumber].description;

      // Очистка списка комментариев
      var comListLength = commentList.childNodes.length;
      for (var i = 0; i < comListLength; i++) {
        commentList.lastChild.remove();
      }
      window.main.setUserElement(window.main.loadedData[photoNumber].comments, getRandomUserComment, commentList, MAX_COMMENTS);
    }
  };

  window.main.photoList.addEventListener('click', showUserBigPhoto);
  window.main.photoList.addEventListener('keydown', function (evt) {
    if (evt.key === window.main.ENTER_BUTTON) {
      showUserBigPhoto(evt);
    }
  });

})();
