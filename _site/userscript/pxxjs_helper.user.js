// ==UserScript==
// @name         pxxjs helper
// @namespace    https://github.com/pxx917144686
// @description  测试一下效果～
// @version      0.0.2
// @icon         https://i.imgur.com/CJ5MfxV.png
// @author       pxx917144686
// @license      MIT
// @match        http://localhost:4000/pxxjs/
// @include      http://127.0.0.1:4000/pxxjs/
// @include      http://localhost:4000/pxxjs/
// @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js?v=a834d46
// @noframes
// @connect      jsnice.org
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// ==/UserScript==

'use strict';

const nicify = document.getElementById('nicify'),
  label = nicify.nextSibling.nextSibling.textContent,
  none = document.getElementById('none'),
  input = document.getElementById('input'),
  output = document.getElementById('readable'),
  view = document.getElementById('view');

function jsnice() {
  if (!isOnine()) return;
  const txt = view.textContent.trim() || input.value.trim();
  if (!txt) return;

  view.classList.add('waiting');
  GM.xmlHttpRequest({
    method: 'POST',
    url: 'http://jsnice.org/beautify?pretty=0&rename=1&types=0&packers=0&transpile=0&suggest=0',
    responseType: 'json',
    data: txt,
    onload: (response) => {
      let source;

      if (response.response && response.response.js) {
        source = response.response.js;
      }

      nicify.checked = false;
      none.checked = true;

      if (!source) {
        view.textContent = 'Unknown error';
      } else {
        output.value = source;
        output.onchange();
      }
    },
    onerror: (err) => {
      console.error(err); // eslint-disable-line no-console
    },
  });
}

function isOnine() {
  nicify.disabled = !navigator.onLine;
  return navigator.onLine;
}

nicify.disabled = false;
nicify.nextSibling.nextSibling.textContent = label;

input.addEventListener('input', () => {
  if (nicify.checked) jsnice();
});

nicify.addEventListener('click', () => {
  if (nicify.checked) jsnice();
});

nicify.addEventListener('onchange', () => {
  if (nicify.checked) jsnice();
});

window.addEventListener('online', isOnine);
window.addEventListener('offline', isOnine);
isOnine();
