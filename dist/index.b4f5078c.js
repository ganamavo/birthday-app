// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"63iPG":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "d231a23f43d60e28ed500b93b4f5078c";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"4ThtM":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "persons", function () {
  return persons;
});
_parcelHelpers.export(exports, "array", function () {
  return array;
});
var _scriptsElementsJs = require("./scripts/elements.js");
var _scriptsDisplayPeopleJs = require("./scripts/displayPeople.js");
var _scriptsUtilsJs = require("./scripts/utils.js");
var _scriptsAddPersonJs = require("./scripts/addPerson.js");
var _scriptsEditPersonJs = require("./scripts/editPerson.js");
let persons = [];
let array;
// Fetch the data
async function fetchPersons() {
  const respose = await fetch("https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json");
  let data = await respose.json();
  persons = data;
  // Save in the local storage
  const mirrorToLocalStorage = () => {
    localStorage.setItem('persons', JSON.stringify(persons));
  };
  // restor from local storage
  const initLocalStorage = () => {
    const personListString = localStorage.getItem('persons');
    const personsList = JSON.parse(personListString);
    if (personsList) {
      persons = personsList;
      _scriptsDisplayPeopleJs.displayPersonsList();
      _scriptsElementsJs.table.dispatchEvent(new CustomEvent('updateList'));
    } else {
      persons = person;
    }
  };
  // get the array from the list
  _scriptsDisplayPeopleJs.displayPersonsList();
  // *********DELETE THE PERSON******************
  // Delete list from the local storage
  const deletePerson = e => {
    const deleteButton = e.target.closest(".delete_btn");
    if (deleteButton) {
      const buttonContainer = e.target.closest('div.delete');
      const idToDelete = buttonContainer.dataset.id;
      deleteList(idToDelete);
    }
  };
  // A function that deletes the list
  const deleteList = idToDelete => {
    // (If I use double equals, it doesn't filter)
    const personsToKeep = persons.filter(person => person.id != idToDelete);
    // Show a warning before the user decides
    let deleteContainerPopup = document.createElement('div');
    deleteContainerPopup.classList.add('popup');
    deleteContainerPopup.insertAdjacentHTML('afterbegin', `
        <div class="delete_container">
            <button class="cancel exit" name="cancel" >
                <svg fill="none" stroke="#094067" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 class="warning_text">
                Are you sure you want to delete?
            </h3>
            <button type="button" name="confirm" class="confirm_delete confirm_btn"> Confirm delete</button>
            <button type="button" name="cancel" class="cancel cancel_delete cancel_btn"> Cancel</button>
        </div>`);
    document.body.appendChild(deleteContainerPopup);
    deleteContainerPopup.classList.add("open");
    _scriptsElementsJs.body.classList.add("overflow_hidden");
    // Look for the confirm delete button and delete it
    deleteContainerPopup.addEventListener("click", e => {
      e.preventDefault();
      const confirmDeleteButton = e.target.closest("button.confirm_delete");
      if (confirmDeleteButton) {
        persons = personsToKeep;
        _scriptsDisplayPeopleJs.displayPersonsList(persons);
        _scriptsUtilsJs.destroyPopup(deleteContainerPopup);
        _scriptsElementsJs.table.dispatchEvent(new CustomEvent('updateList'));
      }
    });
    // Cancel if the user doesn't wanna delete yet
    deleteContainerPopup.addEventListener("click", e => {
      e.preventDefault();
      const cancelDeleteButton = e.target.closest("button.cancel");
      if (cancelDeleteButton) {
        _scriptsUtilsJs.destroyPopup(deleteContainerPopup);
      }
    });
    _scriptsElementsJs.table.dispatchEvent(new CustomEvent('updateList'));
  };
  // if(form.classList.contains("open")) {
  // main.classList.add("overflow_hidden");
  // }
  // ************ ALL EVENT LISTNERS **************
  // Add the list
  _scriptsElementsJs.addList.addEventListener("click", _scriptsAddPersonJs.addNewPerson);
  // Delete a person
  window.addEventListener("click", deletePerson);
  // Edit a person
  window.addEventListener("click", _scriptsEditPersonJs.editPerson);
  // Local storage
  _scriptsElementsJs.table.addEventListener("updateList", mirrorToLocalStorage);
  initLocalStorage();
}
fetchPersons();

},{"./scripts/elements.js":"65UV0","./scripts/displayPeople.js":"1qTkq","./scripts/utils.js":"3CDYK","./scripts/addPerson.js":"4WZW1","./scripts/editPerson.js":"21eyq","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"65UV0":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "table", function () {
  return table;
});
_parcelHelpers.export(exports, "listContainer", function () {
  return listContainer;
});
_parcelHelpers.export(exports, "addList", function () {
  return addList;
});
_parcelHelpers.export(exports, "filterForm", function () {
  return filterForm;
});
_parcelHelpers.export(exports, "filterByNameInput", function () {
  return filterByNameInput;
});
_parcelHelpers.export(exports, "selectByMonth", function () {
  return selectByMonth;
});
_parcelHelpers.export(exports, "body", function () {
  return body;
});
_parcelHelpers.export(exports, "endpoint", function () {
  return endpoint;
});
const table = document.querySelector('.peopleList_container');
const listContainer = document.querySelector('.contents_container');
const addList = document.querySelector('.add_list');
const filterForm = document.querySelector('.filter_list_container');
const filterByNameInput = document.querySelector('#filterByName');
const selectByMonth = document.querySelector('#select_month');
const body = document.querySelector('body');
const endpoint = './people.json';

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"1qTkq":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "newPeopleArray", function () {
  return newPeopleArray;
});
_parcelHelpers.export(exports, "displayPersonsList", function () {
  return displayPersonsList;
});
var _scriptJs = require('../script.js');
var _elementsJs = require('./elements.js');
var _utilsJs = require('./utils.js');
let newPeopleArray;
const displayPersonsList = () => {
  newPeopleArray = _scriptJs.persons.map(data => {
    // Store all the months in a variable
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Get the day and month
    let date = new Date(data.birthday), day = date.getDate(), month = date.getMonth();
    // Adding "st", "nd", "rd" depending on the number
    if (day == 1 || day == 21 || day == 31) {
      day = day + 'st';
    } else if (day == 2 || day == 22) {
      day = day + 'nd';
    } else if (day == 3 || day == 23) {
      day = day + 'rd';
    } else {
      day = day + 'th';
    }
    // Get the full converted date
    const dateString = monthName[month] + ' ' + day;
    // To get the number of the days
    const oneDay = 1000 * 60 * 60 * 24;
    // get current year
    const today = new Date();
    let birthDayYear;
    // A function that calculates the age each person
    function calculateAge(dob) {
      let diffMs = Date.now() - dob.getTime();
      let ageDt = new Date(diffMs);
      return Math.abs(ageDt.getUTCFullYear() - 1970);
    }
    // Assign the age in a variable so that we can use it with the object
    let age = calculateAge(new Date(data.birthday));
    // Set a condition for the number of days untill the birthday comes
    if (date.getMonth() < today.getMonth()) {
      birthDayYear = today.getFullYear() + 1;
      age++;
    } else if (date.getMonth() == today.getMonth() && date.getDate() > today.getDate()) {
      birthDayYear = today.getFullYear();
      age = age;
    } else if (date.getMonth() == today.getMonth() && date.getDate() < today.getDate()) {
      birthDayYear = today.getFullYear() + 1;
      age++;
    } else {
      birthDayYear = today.getFullYear();
    }
    let birthdayDate = new Date(birthDayYear, date.getMonth(), date.getDate());
    let diffDays = Math.ceil((birthdayDate.getTime() - today.getTime()) / oneDay);
    // This is an object that is used to store the person with the days and date
    const newPerson = {
      firstName: data.firstName,
      lastName: data.lastName,
      id: data.id,
      birthday: data.birthday,
      picture: data.picture,
      ages: age,
      date: dateString,
      days: diffDays
    };
    return newPerson;
  });
  // Sorting people
  const sortedPersons = newPeopleArray.sort(function (a, b) {
    return a.days - b.days;
  });
  function filterByName(peopleToFilter) {
    const searchInputValue = _elementsJs.filterByNameInput.value.trim();
    // Filter the people that includes what the user types in the search input
    return peopleToFilter.filter(person => person.firstName.toLowerCase().includes(searchInputValue.toLowerCase()) || person.lastName.toLowerCase().includes(searchInputValue.toLowerCase()));
  }
  function filterByMonth(peopleToFilter) {
    let selectedMonth = _elementsJs.selectByMonth.value;
    if (selectedMonth === 'empty') {
      return peopleToFilter;
    }
    return peopleToFilter.filter(person => person.date.toLowerCase().includes(selectedMonth.toLowerCase()));
  }
  // Filter the people
  function filterByNameAndMonth(peopleToFilter) {
    const filteredByName = filterByName(peopleToFilter);
    const filteredByNameAndMonth = filterByMonth(filteredByName);
    _utilsJs.displayList(filteredByNameAndMonth);
  }
  const fiterListsFunction = () => {
    // Filter the list by firstName and lastName
    _elementsJs.filterByNameInput.addEventListener('keyup', () => {
      filterByNameAndMonth(sortedPersons);
    });
    // Filter by month
    _elementsJs.selectByMonth.addEventListener('change', () => {
      filterByNameAndMonth(sortedPersons);
    });
  };
  fiterListsFunction();
  // Display the sorted list in the document
  _utilsJs.displayList(sortedPersons);
};

},{"../script.js":"4ThtM","./elements.js":"65UV0","./utils.js":"3CDYK","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"3CDYK":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "wait", function () {
  return wait;
});
_parcelHelpers.export(exports, "displayList", function () {
  return displayList;
});
_parcelHelpers.export(exports, "destroyPopup", function () {
  return destroyPopup;
});
var _html_generatorJs = require("./html_generator.js");
var _elementsJs = require("./elements.js");
function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const displayList = object => {
  const listHtml = _html_generatorJs.htmlGenerator(object);
  _elementsJs.listContainer.innerHTML = listHtml;
  _elementsJs.table.dispatchEvent(new CustomEvent('updateList'));
};
async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(500);
  // remove the popup from the DOM
  popup.remove();
  _elementsJs.body.classList.remove("overflow_hidden");
  // remove it from the js memory
  popup = null;
}

},{"./html_generator.js":"5pH1m","./elements.js":"65UV0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5pH1m":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "htmlGenerator", function () {
  return htmlGenerator;
});
const htmlGenerator = list => {
  return list.map(person => {
    return `
        <div data-id="${person.id}" class="list_container">
        <img class="peopleList_image" src="${person.picture}" alt="${person.firstName}'s picture">
	     <div class="peopleList_info">
		<p class="peopleList_name">
            ${person.firstName} ${person.lastName} 
		</p>
        <span class="peopleList_birthday date">
        Turns <strong>${person.ages}</strong> on ${person.date}
        </span>
	 </div>
	 <div class="peopleList_access">
         <p class="peopleList_numberOfDays days">
            ${person.days > 1 ? `In ${person.days}` + ' days' : person.days == 0 ? `<span class="today"> Today!</span>` : person.days == 1 ? 'Tomorrow' : 'Invalid'}
         </p>
         <div class="peopleList_edit">
            <div class="edit">
                <svg class="w-6 h-6 edit" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </div>
            <div data-id="${person.id}" class="delete"> 
                <svg class="w-6 h-6 delete_btn"  fill="none" stroke="#EF4565" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg>
            </div>
		 </div>
	 </div>
     </div>`;
  }).join('');
};

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"4WZW1":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "addNewPerson", function () {
  return addNewPerson;
});
var _scriptJs = require("../script.js");
var _elementsJs = require("./elements.js");
var _html_generatorJs = require("./html_generator.js");
var _displayPeopleJs = require("./displayPeople.js");
var _utilsJs = require("./utils.js");
const addNewPerson = e => {
  const maxDate = new Date().toISOString().slice(0, 10);
  let addListForm = document.createElement('form');
  addListForm.classList.add('popup', 'add_form');
  addListForm.insertAdjacentHTML('afterbegin', ` 
    <div class="container form_container">
        <h3> Add the list</h3>
        <button type="button" class="cancel exit" name="exit" >
            <svg fill="none" stroke="#094067" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <label class="d-block" for="firstname">First Name:</label>
        <input type="text" name="firstname" placeholder="first name" id="firstname" required>
        <label class="d-block" for="lastname">Last Name:</label>
        <input type="text" name="lastname" placeholder="last name" id="lastname" required>
        <label class="d-block" for="birthday"> Birthday:</label>
        <input type="date" name="birthday" max="${maxDate}" id="birthday">
        <label class="d-block" for="picture"> Image url:</label>
        <input type="text" name="picture" value="https://picsum.photos/100" placeholder="url for the profile picture" id="picture" required>
        <div class="button_container">
            <button class="submit save_btn confirm_btn" type="submit"> Save changes</button> 
            <button class="cancel cancel_btn" name="cancel" type="button"> Cancel</button>
        </div>
    </div>`);
  document.body.appendChild(addListForm);
  addListForm.classList.add("open");
  _elementsJs.body.classList.add("overflow_hidden");
  // Add the list of the people
  const addPeopleList = e => {
    addListForm.addEventListener("submit", e => {
      e.preventDefault();
      const addForm = e.target.closest(".popup");
      const AddFirstNameInput = addForm.querySelector("#firstname").value;
      const AddLastNameInput = addForm.querySelector("#lastname").value;
      const AddPictureInput = addForm.querySelector("#picture").value;
      const addBirthdayInput = addForm.querySelector("#birthday").value;
      const newPerson = {
        "id": Date.now(),
        "lastName": AddLastNameInput,
        "firstName": AddFirstNameInput,
        "picture": AddPictureInput,
        "birthday": addBirthdayInput
      };
      _scriptJs.persons.push(newPerson);
      // Create the html
      const addPersonHtml = _html_generatorJs.htmlGenerator(_scriptJs.persons);
      // Append the html to the list container
      _elementsJs.listContainer.innerHTML = addPersonHtml;
      _displayPeopleJs.displayPersonsList();
      // Reset the form after submitting
      addForm.reset();
      // Destroy it after submitting
      _utilsJs.destroyPopup(addForm);
      _elementsJs.table.dispatchEvent(new CustomEvent('updateList'));
    });
  };
  addPeopleList();
  // Remove the form by clicking the cancel button
  if (addListForm.cancel) {
    const cancelAddButton = addListForm.cancel;
    cancelAddButton.addEventListener('click', () => {
      _utilsJs.destroyPopup(addListForm);
    });
  }
  if (addListForm.exit) {
    const cancelAddButton = addListForm.exit;
    cancelAddButton.addEventListener('click', () => {
      _utilsJs.destroyPopup(addListForm);
    });
  }
};

},{"../script.js":"4ThtM","./elements.js":"65UV0","./html_generator.js":"5pH1m","./displayPeople.js":"1qTkq","./utils.js":"3CDYK","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"21eyq":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "editPerson", function () {
  return editPerson;
});
var _scriptJs = require("../script.js");
var _elementsJs = require("./elements.js");
var _utilsJs = require("./utils.js");
var _displayPeopleJs = require("./displayPeople.js");
const editPerson = e => {
  // Open the modal
  return new Promise(function (resolve) {
    const editIcon = e.target.closest(".edit");
    // If the target is the edit icon, add the className to open the popup
    if (editIcon) {
      const id = e.target.closest(".list_container").dataset.id;
      editPersonPopup(id);
    }
  });
};
// Edit the form
function editPersonPopup(id) {
  const personToEdit = _scriptJs.persons.find(person => person.id == id);
  // Create the form element
  const birthdayDate = new Date(personToEdit.birthday).toISOString().slice(0, 10);
  const maxDate = new Date().toISOString().slice(0, 10);
  let formPopup = document.createElement('form');
  formPopup.classList.add('popup');
  formPopup.insertAdjacentHTML('afterbegin', `
    <div class="container form_container">
        <h3> Edit ${personToEdit.firstName} ${personToEdit.lastName}</h3>
        <button class="cancel exit" name="exit" >
            <svg fill="none" stroke="#094067" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <label class="d-block" for="firstname">First Name:</label>
        <input type="text" name="firstname" id="firstname" value="${personToEdit.firstName}" required>
        <label class="d-block" for="lastname">Last Name:</label>
        <input type="text" name="lastname" id="lastname" value="${personToEdit.lastName}" required>
        <label class="d-block" for="birthday"> Birthday:</label>
        <input type="date" name="birthday" id="birthday" max="${maxDate}" value="${birthdayDate}">
        <div class="button_container">
            <button class="submit_button confirm_btn" type="submit" data-id="${id}"> Save changes</button>
            <button class="cancel cancel_btn" name="cancel" type="button" data-id="${id}"> Cancel</button>
        </div>
    </div>`);
  document.body.appendChild(formPopup);
  formPopup.classList.add("open");
  _elementsJs.body.classList.add("overflow_hidden");
  // Save the changes
  formPopup.addEventListener("submit", e => {
    e.preventDefault();
    personToEdit.lastName = formPopup.lastname.value;
    personToEdit.firstName = formPopup.firstname.value;
    personToEdit.birthday = formPopup.birthday.value;
    // Display in the list
    _displayPeopleJs.displayPersonsList();
    _utilsJs.destroyPopup(formPopup);
    _elementsJs.table.dispatchEvent(new CustomEvent('updateList'));
  });
  // Remove form by clicking the cancel button
  if (formPopup.cancel) {
    const cancelButton = formPopup.cancel;
    cancelButton.addEventListener('click', () => {
      _utilsJs.destroyPopup(formPopup);
    });
  }
}

},{"../script.js":"4ThtM","./elements.js":"65UV0","./utils.js":"3CDYK","./displayPeople.js":"1qTkq","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["63iPG","4ThtM"], "4ThtM", "parcelRequire5a4c")

//# sourceMappingURL=index.b4f5078c.js.map
