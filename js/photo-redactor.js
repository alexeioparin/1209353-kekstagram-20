'use strict';

window.photoRedactor = (function () {

  // Показ-скрытие обработчика фото + редактирование размера изображения + управление регулятором эффектов + валидация поля хэштегов

  var userPhotoInput = window.main.photoList.querySelector('#upload-file');
  var userPhotoFilter = window.main.photoList.querySelector('.img-upload__overlay');
  var editorCloseButton = window.main.photoList.querySelector('.img-upload__cancel');
  var userImagePreview = window.main.photoList.querySelector('.img-upload__preview');
  var imagePreviewMinus = window.main.photoList.querySelector('.scale__control--smaller');
  var imagePreviewPlus = window.main.photoList.querySelector('.scale__control--bigger');
  var imageSizeWindow = window.main.photoList.querySelector('.scale__control--value');
  var effectLevelBar = window.main.photoList.querySelector('.img-upload__effect-level');
  var hashtagExample = /^#[A-Za-zА-Яа-я0-9_]{1,19}$/;
  var hashtagInput = window.main.photoList.querySelector('.text__hashtags');
  var commentOnPhotoEditor = window.main.photoList.querySelector('.text__description');
  var userPhoto = window.main.photoList.querySelector('.img-upload__preview img');

  // Закрытие превью по ESC

  var onEscEditorClose = function (evt) {
    if (evt.key === window.main.ESC_BUTTON) {
      evt.preventDefault();
      userPhotoFilter.classList.add('hidden');
      userPhotoInput.value = '';
      hashtagInput.value = '';
      hashtagInput.setAttribute('style', 'none');
      commentOnPhotoEditor.value = '';
    }
  };

  // Загрузка фото

  userPhotoInput.addEventListener('change', function () {
    var photoIndex = userPhotoInput.value.split('\\').slice(-1);
    userPhoto.src = 'C:/1209353-kekstagram-20/photos/' + photoIndex;
  });

  // Вкл/откл закрытия превью по ESC

  var onInputEscCancel = function () {
    document.removeEventListener('keydown', onEscEditorClose);
  };
  var outInputEscOn = function () {
    document.addEventListener('keydown', onEscEditorClose);
  };

  // Показ - скрытие окна превью

  var showUserPhotoEditor = function () {
    window.main.indexBody.classList.add('modal-open');
    userPhotoFilter.classList.remove('hidden');
    document.addEventListener('keydown', onEscEditorClose);
    imagePreviewMinus.addEventListener('click', window.photoRedactorEffect.growImagePreview);
    imagePreviewPlus.addEventListener('click', window.photoRedactorEffect.shrinkImagePreview);
    userPhotoFilter.addEventListener('focusin', window.photoRedactorEffect.hidingEffectBar);
    hashtagInput.addEventListener('input', window.validator.checkHashtagInpit);
    hashtagInput.addEventListener('focus', onInputEscCancel);
    hashtagInput.addEventListener('blur', outInputEscOn);
    commentOnPhotoEditor.addEventListener('focus', onInputEscCancel);
    commentOnPhotoEditor.addEventListener('blur', outInputEscOn);
  };

  var hideUserPhotoEditor = function () {
    window.main.indexBody.classList.remove('modal-open');
    userPhotoFilter.classList.add('hidden');
    document.removeEventListener('keydown', onEscEditorClose);
    imagePreviewMinus.removeEventListener('click', window.photoRedactorEffect.growImagePreview);
    imagePreviewPlus.removeEventListener('click', window.photoRedactorEffect.shrinkImagePreview);
    userPhotoFilter.removeEventListener('focusin', window.photoRedactorEffect.hidingEffectBar);
    effectLevelBar.classList.add('hidden');
    hashtagInput.removeEventListener('input', window.validator.checkHashtagInpit);
    hashtagInput.removeEventListener('focus', onInputEscCancel);
    hashtagInput.removeEventListener('blur', outInputEscOn);
    commentOnPhotoEditor.addEventListener('focus', onInputEscCancel);
    commentOnPhotoEditor.addEventListener('blur', outInputEscOn);
  };

  userPhotoInput.addEventListener('change', function () {
    showUserPhotoEditor();
  });
  editorCloseButton.addEventListener('click', function () {
    hideUserPhotoEditor();
  });
  editorCloseButton.addEventListener('keydown', function (evt) {
    if (evt.key === window.main.ENTER_BUTTON) {
      hideUserPhotoEditor();
    }
  });

  return {
    hashtagInput: hashtagInput,
    hashtagExample: hashtagExample,
    userImagePreview: userImagePreview,
    imageSizeWindow: imageSizeWindow,
    effectLevelBar: effectLevelBar,
  };
})();
