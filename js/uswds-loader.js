var loadJS = require("./vendor/loadjs.js");

// EDITABLE: path to USWDS js
var enhancedScriptPath = "../../assets/js/vendor/uswds.min.js";

// Don't edit below this line ----------------------------------------------
// Based on https://www.filamentgroup.com/lab/enhancing-optimistically.html
var docElem = window.document.documentElement;
var loadingClass = "usa-js-loading";
var loadedClass = "usa-js-present";
var defaultClass = "no-js";

function addLoadingClass() {
  docElem.className = docElem.className.replace(defaultClass, loadingClass);
}

function removeDefaultClass() {
  docElem.className = docElem.className.replace(defaultClass, "");
}

function revertClass() {
  docElem.className = docElem.className.replace(loadingClass, defaultClass);
}

function switchToLoadedClass() {
  docElem.className = docElem.className.replace(loadingClass, loadedClass);
}

if ("querySelector" in window.document && "addEventListener" in window) {
  addLoadingClass();

  var fallback = setTimeout(revertClass, 8000);
  var timeout = 100;

  var poll = function () {
    setTimeout(function () {
      timeout--;
      if (typeof USWDSLibrary !== 'undefined') {
        // External file loaded
        clearTimeout(fallback);
        removeDefaultClass();
        setTimeout(switchToLoadedClass, 100);
      }
      else if (timeout > 0) {
        poll();
      }
      else {
        // External library failed to load
      }
    }, 100);
  };
  
  poll();
}
