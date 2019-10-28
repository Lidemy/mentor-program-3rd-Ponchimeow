/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar todos = [];\nvar id = 1;\n\nfunction render(todoList) {\n  $('.list-group').empty();\n\n  for (var i = 0; i < todoList.length; i += 1) {\n    var check = todoList[i].status ? 'checked=\"true\"' : '';\n    $('.list-group').append(\"\\n        <li class=\\\"list-group-item\\\">\\n        <label>\\n        <span class=\\\"item-content\\\">\".concat(todoList[i].content, \"</span>\\n        <input class=\\\"checkbox\\\" type=\\\"checkbox\\\" \").concat(check, \" data-id=\\\"\").concat(todoList[i].id, \"\\\">\\n        <span class=\\\"checkmark\\\"></span>\\n        </label>\\n        <input type=\\\"text\\\" class=\\\"item-input\\\" value=\\\"\").concat(todoList[i].content, \"\\\">\\n        <span class=\\\"btn btn-edit\\\"></span>\\n        <span class=\\\"btn btn-save\\\" data-id=\\\"\").concat(todoList[i].id, \"\\\"></span>\\n        <span class=\\\"btn btn-delete\\\" data-id=\\\"\").concat(todoList[i].id, \"\\\"></span>\\n        <span class=\\\"btn btn-cancel\\\"></span>\\n        </li>\\n    \"));\n  }\n\n  if (todos.length >= 1) {\n    id = todos[todos.length - 1].id + 1;\n  }\n}\n\nfunction setData() {\n  window.localStorage.setItem('todoapp', JSON.stringify(todos));\n  render(todos);\n}\n\n$(document).ready(function () {\n  var todoData = window.localStorage.getItem('todoapp');\n\n  if (todoData) {\n    todos = JSON.parse(todoData);\n    render(todos);\n  }\n\n  $('.all').click(function () {\n    console.log(todos);\n  });\n  $('.btn-add').click(function () {\n    var content = $('#input-todo').val();\n\n    if (content !== '') {\n      todos.push({\n        id: id,\n        content: content,\n        status: false\n      });\n      setData();\n      $('#input-todo').val('');\n      id += 1;\n    } else {\n      alert('請填入事項');\n    }\n  });\n  $('.list-group').click(function (e) {\n    var dataId = Number($(e.target).attr('data-id')); // 事項狀態\n\n    if ($(e.target).hasClass('checkbox')) {\n      todos = todos.map(function (todo) {\n        if (todo.id !== dataId) {\n          return todo;\n        }\n\n        return _objectSpread({}, todo, {\n          status: !todo.status\n        });\n      });\n      setData();\n    } // 編輯\n\n\n    if ($(e.target).hasClass('btn-edit')) {\n      if ($(e.target).parent().find('.checkbox').prop('checked')) {\n        alert('已完成事項無法編輯');\n        return;\n      }\n\n      $(e.target).prev().prev().children().eq(0).hide(); // item-content,label value\n\n      $(e.target).prev().show(); // input\n\n      $(e.target).hide(); // edit\n\n      $(e.target).nextAll().eq(0).show(); // save\n\n      $(e.target).nextAll().eq(0).addClass('active');\n      $(e.target).nextAll().eq(1).hide(); // delete\n\n      $(e.target).nextAll().eq(2).show(); // cancel\n\n      $(e.target).nextAll().eq(2).addClass('active');\n    } // 刪除\n\n\n    if ($(e.target).hasClass('btn-delete')) {\n      // eslint-disable-next-line no-alert\n      // eslint-disable-next-line no-restricted-globals\n      if (confirm('確認要刪除?')) {\n        todos = todos.filter(function (todo) {\n          return todo.id !== dataId;\n        });\n        setData();\n      }\n    } // 編輯後儲存\n\n\n    if ($(e.target).hasClass('btn-save')) {\n      var content = $(e.target).parent().find('.item-input').val();\n\n      if (content !== '') {\n        todos = todos.map(function (todo) {\n          if (todo.id !== dataId) {\n            return todo;\n          }\n\n          return _objectSpread({}, todo, {\n            content: content\n          });\n        });\n        setData();\n      } else {\n        alert('內容不可為空');\n      }\n    } // 取消編輯\n\n\n    if ($(e.target).hasClass('btn-cancel')) {\n      setData();\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });