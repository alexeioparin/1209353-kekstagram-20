'use strict';

window.dataUpload = (function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var photoUploadForm = window.main.photoList.querySelector('.img-upload__form');

  // Создание окна сообщения успешной загрузки

  var createSuccessMessage = function () {
    return successTemplate.cloneNode(true);
  };

  // Создание окна ошибки загрузки

  var createErrorMessage = function () {
    return errorTemplate.cloneNode(true);
  };

  // Отправка данных формы на сервер

  photoUploadForm.addEventListener('submit', function (evt) {
    // Закрытие по клику на кнопку

    var onClickClosePopupWindow = function (evnt, closedElement) {
      closedElement.remove();
      if (closedElement.classList.contains('success')) {
        document.removeEventListener('keydown', onEscCloseSuccessPopup);
        document.removeEventListener('click', closeSuccessPopup);
      } else if (closedElement.classList.contains('error')) {
        document.removeEventListener('keydown', onEscCloseErrorPopup);
        document.removeEventListener('click', closeErrorPopup);
      }
    };

    // Закрытие по esc
    var onEscClosePopupWindow = function (evnt, closedElement) {
      if (evnt.key === window.main.ESC_BUTTON) {
        evnt.preventDefault();
        closedElement.remove();
      }
      if (closedElement.classList.contains('success')) {
        document.removeEventListener('keydown', onEscCloseSuccessPopup);
        document.removeEventListener('click', closeSuccessPopup);
      } else if (closedElement.classList.contains('error')) {
        document.removeEventListener('keydown', onEscCloseErrorPopup);
        document.removeEventListener('click', closeErrorPopup);
      }
    };

    // Закрытие по клику вне попапа
    var onOutWindowClickClose = function (evnt, closedElement, popupElement) {
      evnt.preventDefault();
      if (evnt.target !== popupElement) {
        closedElement.remove();
      }
      if (evnt.target !== window.main.indexMain.querySelector('.success__inner')) {
        document.removeEventListener('keydown', onEscCloseSuccessPopup);
        document.removeEventListener('click', closeSuccessPopup);
      } else if (evnt.target !== window.main.indexMain.querySelector('.error__inner')) {
        document.removeEventListener('keydown', onEscCloseErrorPopup);
        document.removeEventListener('click', closeErrorPopup);
      }
    };


    var onClickCloseSuccessPopup = function (evnt) {
      onClickClosePopupWindow(evnt, window.main.indexMain.querySelector('.success'));
    };
    var onClickCloseErrorPopup = function (evnt) {
      onClickClosePopupWindow(evnt, window.main.indexMain.querySelector('.error'));
    };
    var onEscCloseSuccessPopup = function (evnt) {
      onEscClosePopupWindow(evnt, window.main.indexMain.querySelector('.success'));
    };
    var onEscCloseErrorPopup = function (evnt) {
      onEscClosePopupWindow(evnt, window.main.indexMain.querySelector('.error'));
    };
    var closeSuccessPopup = function (evnt) {
      onOutWindowClickClose(evnt, window.main.indexMain.querySelector('.success'), window.main.indexMain.querySelector('.success__inner'));
    };
    var closeErrorPopup = function (evnt) {
      onOutWindowClickClose(evnt, window.main.indexMain.querySelector('.error'), window.main.indexMain.querySelector('.error__inner'));
    };

    // Функция обработки успешной загрузки

    var onSuccessPopupOpen = function () {
      window.photoRedactor.hideUserPhotoEditor();
      window.main.indexMain.appendChild(createSuccessMessage());
      var closeButton = window.main.indexMain.querySelector('.success__button');
      closeButton.addEventListener('click', onClickCloseSuccessPopup);
      document.addEventListener('keydown', onEscCloseSuccessPopup);
      document.addEventListener('click', closeSuccessPopup);
    };

    // Функция обработки ошибки

    var onErrorPopupOpen = function () {
      window.photoRedactor.hideUserPhotoEditor();
      window.main.indexMain.appendChild(createErrorMessage());
      var closeButton = window.main.indexMain.querySelector('.error__button');
      closeButton.addEventListener('click', onClickCloseErrorPopup);
      document.addEventListener('keydown', onEscCloseErrorPopup);
      document.addEventListener('click', closeErrorPopup);
    };

    window.backend.save(new FormData(photoUploadForm), onSuccessPopupOpen, onErrorPopupOpen);
    evt.preventDefault();
  });
})();
