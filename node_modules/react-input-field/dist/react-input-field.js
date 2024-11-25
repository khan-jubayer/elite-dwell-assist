(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactInputField"] = factory(require("React"));
	else
		root["ReactInputField"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(7);
	var normalize = __webpack_require__(3);
	var assign = __webpack_require__(2);

	function emptyFn() {}

	var TOOL_STYLES = {
	    'true': { display: 'inline-block' },
	    'false': { cursor: 'text', color: 'transparent' }
	};

	var DISPLAY_NAME = 'ReactInputField';

	var PT = React.PropTypes;

	function _ref2(cls) {
	    return !!cls;
	}

	var DESCRIPTOR = {

	    displayName: DISPLAY_NAME,

	    propTypes: {
	        validate: PT.oneOfType([PT.func, PT.bool]),
	        isEmpty: PT.func,
	        clearTool: PT.node,
	        value: PT.string
	    },

	    getInitialState: function getInitialState() {
	        return {
	            defaultValue: this.props.defaultValue
	        };
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {

	            //STYLE props
	            defaultClearToolStyle: {
	                fontSize: 20,
	                paddingRight: 5,
	                paddingLeft: 5,

	                alignSelf: 'center',
	                cursor: 'pointer',
	                userSelect: 'none',
	                boxSizing: 'border-box'
	            },

	            clearToolColor: '#a8a8a8',
	            clearToolOverColor: '#7F7C7C',

	            defaultStyle: {
	                border: '1px solid #a8a8a8',
	                overflow: 'hidden',
	                boxSizing: 'border-box'
	            },

	            defaultFocusedStyle: {
	                boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.45)'
	            },

	            defaultInnerStyle: {
	                userSelect: 'none',
	                width: '100%',
	                display: 'inline-flex',
	                flexFlow: 'row',
	                alignItems: 'stretch'
	            },

	            defaultInvalidStyle: {
	                border: '1px solid rgb(248, 144, 144)'
	            },

	            defaultInputStyle: {
	                flex: 1,
	                border: 0,
	                height: '100%',
	                padding: '6px 2px',
	                outline: 'none',
	                boxSizing: 'border-box'
	            },

	            defaultInputInvalidStyle: {},

	            //CLASS NAME
	            defaultClassName: 'z-field',
	            emptyClassName: 'z-empty-value',
	            invalidClassName: 'z-invalid',

	            inputClassName: '',

	            //NON-STYLE props
	            focusOnClick: true,
	            stopChangePropagation: true,
	            stopSelectPropagation: true,

	            defaultValue: '',
	            emptyValue: '',
	            inputProps: null,

	            clearTool: true,

	            toolsPosition: 'right'
	        };
	    },

	    render: function render() {

	        if (this.valid === undefined) {
	            this.valid = true;
	        }

	        var props = this.p = this.prepareProps(this.props, this.state);

	        function _ref() {
	            return props.onValidityChange(props.valid, props.value, props);
	        }

	        if (this.valid !== props.valid && typeof props.onValidityChange === 'function') {
	            setTimeout(_ref, 0);
	        }

	        this.valid = props.valid;

	        var children = this.renderChildren(props, this.state);

	        var divProps = assign({}, props);
	        delete divProps.value;
	        delete divProps.placeholder;

	        return React.createElement(
	            'div',
	            _extends({}, divProps, { 'data-display-name': DISPLAY_NAME }),
	            React.createElement(
	                'div',
	                { style: props.innerStyle },
	                children
	            )
	        );
	    },

	    renderChildren: function renderChildren(props, state) {
	        var field = this.renderField(props, state);
	        var tools = this.renderTools(props, state);

	        var children = [field, props.children];

	        if (props.toolsPosition == 'after' || props.toolsPosition == 'right') {
	            children.push.apply(children, tools);
	        } else {
	            children = (tools || []).concat(field);
	        }

	        if (typeof props.renderChildren == 'function') {
	            children = props.renderChildren(children);
	        }

	        return children;
	    },

	    renderField: function renderField(props) {
	        var inputProps = this.prepareInputProps(props);

	        inputProps.ref = 'input';

	        if (props.inputFactory) {
	            return props.inputFactory(inputProps, props);
	        }

	        return React.createElement('input', inputProps);
	    },

	    renderTools: function renderTools(props, state) {

	        var clearTool = this.renderClearTool(props, state);
	        var result = [clearTool];

	        if (typeof props.tools === 'function') {
	            result = props.tools(props, clearTool);
	        }

	        return result;
	    },

	    renderClearTool: function renderClearTool(props, state) {

	        var visible;

	        if (props.forceClearTool && !props.clearTool) {
	            return;
	        }

	        if (!props.forceClearTool) {
	            if (!props.clearTool || props.readOnly || props.disabled) {
	                return;
	            }
	        }

	        visible = props.forceClearTool ? true : !props.empty;

	        var visibilityStyle = TOOL_STYLES[visible];
	        var style = assign({}, visibilityStyle, this.prepareClearToolStyle(props, state));

	        if (!visible) {
	            assign(style, visibilityStyle);
	        }

	        var tool = props.clearTool === true ? '✖' : props.clearTool;

	        return React.createElement(
	            'div',
	            {
	                key: 'clearTool',
	                className: 'z-clear-tool',
	                onClick: this.handleClearToolClick,
	                onMouseDown: this.handleClearToolMouseDown,
	                onMouseOver: this.handleClearToolOver,
	                onMouseOut: this.handleClearToolOut,
	                style: style
	            },
	            tool
	        );
	    },

	    handleClearToolMouseDown: function handleClearToolMouseDown(event) {
	        event.preventDefault();
	    },

	    handleClearToolOver: function handleClearToolOver() {
	        this.setState({
	            clearToolOver: true
	        });
	    },

	    handleClearToolOut: function handleClearToolOut() {
	        this.setState({
	            clearToolOver: false
	        });
	    },

	    isEmpty: function isEmpty(props) {
	        var emptyValue = this.getEmptyValue(props);

	        if (typeof props.isEmpty === 'function') {
	            return props.isEmpty(props, emptyValue);
	        }

	        var value = props.value;

	        if (value == null) {
	            value = '';
	        }

	        return value === emptyValue;
	    },

	    getEmptyValue: function getEmptyValue(props) {
	        var value = props.emptyValue;

	        if (typeof value === 'function') {
	            value = value(props);
	        }

	        return value;
	    },

	    isValid: function isValid(props) {
	        var value = props.value;
	        var result = true;

	        if (typeof props.validate === 'function') {
	            result = props.validate(value, props, this) !== false;
	        }

	        return result;
	    },

	    getInput: function getInput() {
	        return this.refs.input.getDOMNode();
	    },

	    focus: function focus() {
	        var input = this.getInput();

	        if (input && typeof input.focus === 'function') {
	            input.focus();
	        }
	    },

	    handleClick: function handleClick(event) {
	        if (this.props.focusOnClick && !this.isFocused()) {
	            this.focus();
	        }

	        ;(this.props.onClick || emptyFn)(event);
	    },

	    handleMouseDown: function handleMouseDown(event) {
	        ;(this.props.onMouseDown || emptyFn)(event);
	    },

	    handleClearToolClick: function handleClearToolClick(event) {
	        var emptyValue = this.getEmptyValue(this.props);

	        this.notify(emptyValue, event);(this.props.onClearToolClick || emptyFn)(emptyValue, event);
	    },

	    handleChange: function handleChange(event) {
	        this.props.stopChangePropagation && event.stopPropagation();
	        this.notify(event.target.value, event);
	    },

	    handleSelect: function handleSelect(event) {
	        this.props.stopSelectPropagation && event.stopPropagation();(this.props.onSelect || emptyFn)(event);
	    },

	    notify: function notify(value, event) {
	        if (this.props.value === undefined) {
	            this.setState({
	                defaultValue: value
	            });
	        }
	        ;(this.props.onChange || emptyFn)(value, this.props, event);
	    },

	    //*****************//
	    // PREPARE METHODS //
	    //*****************//
	    prepareProps: function prepareProps(thisProps, state) {

	        var props = {};

	        assign(props, thisProps);

	        props.value = this.prepareValue(props, state);

	        props.focused = this.isFocused();
	        props.valid = this.isValid(props);
	        props.empty = this.isEmpty(props);

	        props.onClick = this.handleClick;
	        props.onMouseDown = this.handleMouseDown;

	        props.className = this.prepareClassName(props);
	        props.style = this.prepareStyle(props);
	        props.innerStyle = this.prepareInnerStyle(props);

	        return props;
	    },

	    getValue: function getValue() {
	        var value = this.props.value === undefined ? this.state.defaultValue : this.props.value;

	        return value;
	    },

	    prepareValue: function prepareValue(props, state) {
	        return this.getValue();
	    },

	    prepareClassName: function prepareClassName(props) {
	        var result = [props.className, props.defaultClassName];

	        if (props.empty) {
	            result.push(props.emptyClassName);
	        }

	        if (!props.valid) {
	            result.push(props.invalidClassName);
	        }

	        return result.filter(_ref2).join(' ');
	    },

	    prepareStyle: function prepareStyle(props) {
	        var style = assign({}, props.defaultStyle, props.style);

	        if (props.focused) {
	            assign(style, props.defaultFocusedStyle, props.focusedStyle);
	        }

	        if (props.empty) {
	            assign(style, props.emptyStyle);
	        }

	        if (!props.valid) {
	            assign(style, props.defaultInvalidStyle, props.invalidStyle);
	        }

	        return style;
	    },

	    prepareInnerStyle: function prepareInnerStyle(props) {
	        var style = assign({}, props.defaultInnerStyle, props.innerStyle);

	        return normalize(style);
	    },

	    prepareInputProps: function prepareInputProps(props) {

	        var inputProps = {
	            className: props.inputClassName
	        };

	        assign(inputProps, props.defaultInputProps, props.inputProps);

	        inputProps.key = 'field';
	        inputProps.value = props.value;
	        inputProps.placeholder = props.placeholder;
	        inputProps.onChange = this.handleChange;
	        inputProps.onSelect = this.handleSelect;
	        inputProps.style = this.prepareInputStyle(props);
	        inputProps.onFocus = this.handleFocus;
	        inputProps.onBlur = this.handleBlur;
	        inputProps.name = props.name;
	        inputProps.disabled = props.disabled;
	        inputProps.readOnly = props.readOnly;
	        inputProps.autoFocus = props.autoFocus;

	        return inputProps;
	    },

	    handleFocus: function handleFocus(event) {
	        this._focused = true;

	        //so as to apply focus style
	        this.setState({});
	    },

	    handleBlur: function handleBlur() {
	        this._focused = false;

	        //so as to unapply focus style
	        this.setState({});
	    },

	    isFocused: function isFocused() {
	        return !!this._focused;
	    },

	    prepareInputStyle: function prepareInputStyle(props) {
	        var inputStyle = props.inputProps ? props.inputProps.style : null;

	        var style = assign({}, props.defaultInputStyle, props.inputStyle, inputStyle);

	        if (props.empty) {
	            assign(style, props.inputEmptyStyle);
	        }

	        if (!props.valid) {
	            assign(style, props.defaultInputInvalidStyle, props.inputInvalidStyle);
	        }

	        return normalize(style);
	    },

	    prepareClearToolStyle: function prepareClearToolStyle(props, state) {
	        var defaultClearToolOverStyle;
	        var clearToolOverStyle;
	        var clearToolColor;

	        if (state && state.clearToolOver) {
	            defaultClearToolOverStyle = props.defaultClearToolOverStyle;
	            clearToolOverStyle = props.clearToolOverStyle;
	        }

	        if (props.clearToolColor) {
	            clearToolColor = {
	                color: props.clearToolColor
	            };
	            if (state && state.clearToolOver && props.clearToolOverColor) {
	                clearToolColor = {
	                    color: props.clearToolOverColor
	                };
	            }
	        }

	        var style = assign({}, props.defaultClearToolStyle, defaultClearToolOverStyle, clearToolColor, props.clearToolStyle, clearToolOverStyle);

	        return style;
	    }
	};

	var ReactClass = React.createClass(DESCRIPTOR);

	ReactClass.descriptor = DESCRIPTOR;

	exports['default'] = ReactClass;
	module.exports = exports['default'];
	//this.props.onFocus is called due to event propagation
	//this.props.onBlur is called due to event propagation

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getCssPrefixedValue = __webpack_require__(10)

	module.exports = function(target){
		target.plugins = target.plugins || [
			(function(){
				var values = {
					'flex':1,
					'inline-flex':1
				}

				return function(key, value){
					if (key === 'display' && value in values){
						return {
							key  : key,
							value: getCssPrefixedValue(key, value, true)
						}
					}
				}
			})()
		]

		target.plugin = function(fn){
			target.plugins = target.plugins || []

			target.plugins.push(fn)
		}

		return target
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn      = __webpack_require__(4)
	var getPrefixed = __webpack_require__(5)

	var map      = __webpack_require__(6)
	var plugable = __webpack_require__(1)

	function plugins(key, value){

		var result = {
			key  : key,
			value: value
		}

		;(RESULT.plugins || []).forEach(function(fn){

			var tmp = map(function(res){
				return fn(key, value, res)
			}, result)

			if (tmp){
				result = tmp
			}
		})

		return result
	}

	function normalize(key, value){

		var result = plugins(key, value)

		return map(function(result){
			return {
				key  : getPrefixed(result.key, result.value),
				value: result.value
			}
		}, result)

		return result
	}

	var RESULT = function(style){

		var k
		var item
		var result = {}

		for (k in style) if (hasOwn(style, k)){
			item = normalize(k, style[k])

			if (!item){
				continue
			}

			map(function(item){
				result[item.key] = item.value
			}, item)
		}

		return result
	}

	module.exports = plugable(RESULT)

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(obj, prop){
		return Object.prototype.hasOwnProperty.call(obj, prop)
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getStylePrefixed = __webpack_require__(8)
	var properties       = __webpack_require__(9)

	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		return getStylePrefixed(key, value)
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(fn, item){

		if (!item){
			return
		}

		if (Array.isArray(item)){
			return item.map(fn).filter(function(x){
				return !!x
			})
		} else {
			return fn(item)
		}
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(11)
	var getPrefix    = __webpack_require__(12)
	var el           = __webpack_require__(13)

	var MEMORY = {}
	var STYLE
	var ELEMENT

	var PREFIX

	module.exports = function(key, value){

	    ELEMENT = ELEMENT || el()
	    STYLE   = STYLE   || ELEMENT.style

	    var k = key// + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed

	    if (!(key in STYLE)){//we have to prefix

	        // if (PREFIX){
	        //     prefix = PREFIX
	        // } else {
	            prefix = getPrefix('appearance')

	        //     if (prefix){
	        //         prefix = PREFIX = prefix.toLowerCase()
	        //     }
	        // }

	        if (prefix){
	            prefixed = prefix + toUpperFirst(key)

	            if (prefixed in STYLE){
	                key = prefixed
	            }
	        }
	    }

	    MEMORY[k] = key

	    return key
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  'alignItems': 1,
	  'justifyContent': 1,
	  'flex': 1,
	  'flexFlow': 1,
	  'flexGrow': 1,
	  'flexShrink': 1,
	  'flexBasis': 1,
	  'flexDirection': 1,
	  'flexWrap': 1,
	  'alignContent': 1,
	  'alignSelf': 1,

	  'userSelect': 1,
	  'transform': 1,
	  'transition': 1,
	  'transformOrigin': 1,
	  'transformStyle': 1,
	  'transitionProperty': 1,
	  'transitionDuration': 1,
	  'transitionTimingFunction': 1,
	  'transitionDelay': 1,
	  'borderImage': 1,
	  'borderImageSlice': 1,
	  'boxShadow': 1,
	  'backgroundClip': 1,
	  'backfaceVisibility': 1,
	  'perspective': 1,
	  'perspectiveOrigin': 1,
	  'animation': 1,
	  'animationDuration': 1,
	  'animationName': 1,
	  'animationDelay': 1,
	  'animationDirection': 1,
	  'animationIterationCount': 1,
	  'animationTimingFunction': 1,
	  'animationPlayState': 1,
	  'animationFillMode': 1,
	  'appearance': 1
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getPrefix     = __webpack_require__(12)
	var forcePrefixed = __webpack_require__(14)
	var el            = __webpack_require__(13)

	var MEMORY = {}
	var STYLE
	var ELEMENT

	module.exports = function(key, value, force){

	    ELEMENT = ELEMENT || el()
	    STYLE   = STYLE   ||  ELEMENT.style

	    var k = key + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed
	    var prefixedValue

	    if (force || !(key in STYLE)){

	        prefix = getPrefix('appearance')

	        if (prefix){
	            prefixed = forcePrefixed(key, value)

	            prefixedValue = '-' + prefix.toLowerCase() + '-' + value

	            if (prefixed in STYLE){
	                ELEMENT.style[prefixed] = ''
	                ELEMENT.style[prefixed] = prefixedValue

	                if (ELEMENT.style[prefixed] !== ''){
	                    value = prefixedValue
	                }
	            }
	        }
	    }

	    MEMORY[k] = value

	    return value
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(str){
		return str?
				str.charAt(0).toUpperCase() + str.slice(1):
				''
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(11)
	var prefixes     = ["ms", "Moz", "Webkit", "O"]

	var el = __webpack_require__(13)

	var ELEMENT
	var PREFIX

	module.exports = function(key){

		if (PREFIX !== undefined){
			return PREFIX
		}

		ELEMENT = ELEMENT || el()

		var i = 0
		var len = prefixes.length
		var tmp
		var prefix

		for (; i < len; i++){
			prefix = prefixes[i]
			tmp = prefix + toUpperFirst(key)

			if (typeof ELEMENT.style[tmp] != 'undefined'){
				return PREFIX = prefix
			}
		}

		return PREFIX
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var el

	module.exports = function(){

		if(!el && !!global.document){
		  	el = global.document.createElement('div')
		}

		if (!el){
			el = {style: {}}
		}

		return el
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(11)
	var getPrefix    = __webpack_require__(12)
	var properties   = __webpack_require__(9)

	/**
	 * Returns the given key prefixed, if the property is found in the prefixProps map.
	 *
	 * Does not test if the property supports the given value unprefixed.
	 * If you need this, use './getPrefixed' instead
	 */
	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		var prefix = getPrefix(key)

		return prefix?
					prefix + toUpperFirst(key):
					key
	}

/***/ }
/******/ ])
});
;