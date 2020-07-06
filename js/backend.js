'use strict';

window.backend = (function () {

  var StatusCode = {
    OK: 200
  };
  var sortBlock = document.querySelector('.img-filters');
  var loadedData = [];

  // создание запроса, загрузка информации с сервера

  var load = function (onLoad, onError) {
    var TIMEOUT_IN_MS = 10000;
    var URL = 'https://javascript.pages.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
        window.backend.loadedData = xhr.response;
        sortBlock.classList.remove('img-filters--inactive');
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send();
  };

  /* var save = function (data, onLoad, onError) {
    var TIMEOUT_IN_MS = 10000;
    var URL = 'https://javascript.pages.academy/code-and-magick';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('POST', URL);
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус отправки: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Загрузка не успела выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.send(data);
  }; */

  return {
    load: load,
    loadedData: loadedData,
  //  save: save,
  };
})();
