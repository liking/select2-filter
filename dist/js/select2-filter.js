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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(7);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_select__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_select__);


Nova.booting(function (Vue, router, store) {
    Vue.component('select2-filter', __webpack_require__(3));
    Vue.component('v-select', __WEBPACK_IMPORTED_MODULE_0_vue_select__["default"]);
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'D:\\www\\larademo\\packages\\liking\\select2-filter\\node_modules\\vue-select\\dist\\vue-select.js'");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(12)
}
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(5)
/* template */
var __vue_template__ = __webpack_require__(6)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Select2Filter.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-18ac4673", Component.options)
  } else {
    hotAPI.reload("data-v-18ac4673", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'D:\\www\\larademo\\packages\\liking\\select2-filter\\node_modules\\vue-loader\\lib\\component-normalizer.js'");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        resourceName: {
            type: String,
            required: true
        },
        filterKey: {
            type: String,
            required: true
        }
    },
    data: function data() {
        return {
            loading: false,
            options: []
        };
    },
    methods: {
        handleChange: function handleChange(selected) {
            this.$emit('change', selected == null ? '' : selected);
        },
        onSearch: function onSearch(search, loading) {
            this.loading = true;
            this.search(loading, search, this);
        },

        search: _.debounce(function (loading, search, vm) {
            var options = [];

            Nova.request().get('/nova-api/' + vm.resourceName, {
                params: { search: search }
            }).then(function (_ref) {
                var data = _ref.data;

                var resources = data.resources;
                if (resources.length > 0) {
                    resources.forEach(function (item) {
                        var option = vm.prepareResourceOption(item, vm.title, vm.id);
                        if (option) {
                            options.push(option);
                        }
                    });
                }
                vm.options = options;
                vm.loading = false;
            });
        }, 350),
        prepareResourceOption: function prepareResourceOption(resource, labelField, valueField) {
            var fields = resource.fields;
            var option = {};
            if (fields.length > 0) {
                fields.forEach(function (item) {
                    if (item.attribute == labelField) {
                        option['label'] = item.value;
                    } else if (item.attribute == valueField) {
                        option['value'] = item.value;
                    }
                });
            }
            return option;
        }
    },

    computed: {
        filter: function filter() {
            return this.$store.getters[this.resourceName + '/getFilter'](this.filterKey);
        },
        value: function value() {
            if (this.filter.currentValue == '') {
                return null;
            }
            return this.filter.currentValue;
        },
        title: function title() {
            return this.filter.filterTitle;
        },
        id: function id() {
            return this.filter.filterId;
        }
    }
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-select",
        {
          attrs: {
            filterable: false,
            options: _vm.options,
            loading: _vm.loading,
            value: _vm.value,
            placeholder: "Search"
          },
          on: { search: _vm.onSearch, input: _vm.handleChange }
        },
        [
          _c("template", { slot: "no-options" }, [
            _vm._v(
              "\n            " +
                _vm._s(_vm.__("No result found")) +
                "\n        "
            )
          ])
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-18ac4673", module.exports)
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(14)("d5608f84", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-18ac4673\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Select2Filter.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-18ac4673\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Select2Filter.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

throw new Error("Module build failed: \r\nundefined\r\n^\r\n      File to import not found or unreadable: D:\\www\\larademo\\packages\\liking\\select2-filter\\node_modules\\vue-select\\src\\scss\\vue-select.scss.\r\n      in D:\\www\\larademo\\packages\\liking\\select2-filter\\resources\\js\\components\\Select2Filter.vue (line 18, column 1)");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'D:\\www\\larademo\\packages\\liking\\select2-filter\\node_modules\\vue-style-loader\\lib\\addStylesClient.js'");

/***/ })
/******/ ]);