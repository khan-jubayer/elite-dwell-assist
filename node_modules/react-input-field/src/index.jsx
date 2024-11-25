'use strict';

const React     = require('react')
const normalize = require('react-style-normalizer')
const assign    = require('object-assign')

function emptyFn() {}

const TOOL_STYLES = {
    true : {display: 'inline-block'},
    false: {cursor: 'text', color: 'transparent'}
}

const DISPLAY_NAME = 'ReactInputField'

const PT = React.PropTypes

const DESCRIPTOR = {

    displayName: DISPLAY_NAME,

    propTypes: {
        validate : PT.oneOfType([
            PT.func,
            PT.bool
        ]),
        isEmpty  : PT.func,
        clearTool: PT.node,
        value    : PT.string
    },

    getInitialState: function(){
        return {
            defaultValue: this.props.defaultValue
        }
    },

    getDefaultProps: function () {
        return {

            //STYLE props
            defaultClearToolStyle: {
                fontSize   : 20,
                paddingRight: 5,
                paddingLeft : 5,

                alignSelf : 'center',
                cursor    : 'pointer',
                userSelect: 'none',
                boxSizing : 'border-box'
            },

            clearToolColor    : '#a8a8a8',
            clearToolOverColor: '#7F7C7C',

            defaultStyle: {
                border    : '1px solid #a8a8a8',
                overflow  : 'hidden',
                boxSizing : 'border-box'
            },

            defaultFocusedStyle: {
                boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.45)'
            },

            defaultInnerStyle: {
                userSelect: 'none',
                width     : '100%',
                display   : 'inline-flex',
                flexFlow  : 'row',
                alignItems: 'stretch'
            },

            defaultInvalidStyle: {
                border : '1px solid rgb(248, 144, 144)'
            },

            defaultInputStyle: {
                flex   : 1,
                border : 0,
                height : '100%',
                padding: '6px 2px',
                outline: 'none',
                boxSizing: 'border-box'
            },

            defaultInputInvalidStyle: {

            },

            //CLASS NAME
            defaultClassName: 'z-field',
            emptyClassName  : 'z-empty-value',
            invalidClassName: 'z-invalid',

            inputClassName: '',

            //NON-STYLE props
            focusOnClick: true,
            stopChangePropagation: true,
            stopSelectPropagation: true,

            defaultValue  : '',
            emptyValue    : '',
            inputProps    : null,

            clearTool: true,

            toolsPosition: 'right'
        }
    },

    render: function() {

        if (this.valid === undefined){
            this.valid = true
        }

        var props = this.p = this.prepareProps(this.props, this.state)

        if (this.valid !== props.valid && typeof props.onValidityChange === 'function'){
            setTimeout(() => props.onValidityChange(props.valid, props.value, props), 0)
        }

        this.valid = props.valid

        var children = this.renderChildren(props, this.state)

        var divProps = assign({}, props)
        delete divProps.value
        delete divProps.placeholder

        return <div {...divProps} data-display-name={DISPLAY_NAME}>
            <div style={props.innerStyle}>
                {children}
            </div>
        </div>
    },

    renderChildren: function(props, state){
        var field = this.renderField(props, state)
        var tools = this.renderTools(props, state)

        var children = [field, props.children]

        if (props.toolsPosition == 'after' || props.toolsPosition == 'right'){
            children.push.apply(children, tools)
        } else {
            children = (tools || []).concat(field)
        }

        if (typeof props.renderChildren == 'function'){
            children = props.renderChildren(children)
        }

        return children
    },

    renderField: function(props) {
        var inputProps = this.prepareInputProps(props)

        inputProps.ref = 'input'

        if (props.inputFactory){
            return props.inputFactory(inputProps, props)
        }

        return <input {...inputProps} />
    },

    renderTools: function(props, state) {

        var clearTool = this.renderClearTool(props, state)
        var result    = [clearTool]

        if (typeof props.tools === 'function'){
            result = props.tools(props, clearTool)
        }

        return result
    },

    renderClearTool: function(props, state) {

        var visible

        if (props.forceClearTool && !props.clearTool){
            return
        }

        if (!props.forceClearTool){
            if (!props.clearTool || props.readOnly || props.disabled){
                return
            }
        }

        visible = props.forceClearTool?
                    true:
                    !props.empty

        var visibilityStyle = TOOL_STYLES[visible]
        var style           = assign({}, visibilityStyle, this.prepareClearToolStyle(props, state))

        if (!visible){
            assign(style, visibilityStyle)
        }

        var tool = props.clearTool === true? '✖': props.clearTool

        return <div
            key='clearTool'
            className='z-clear-tool'
            onClick     ={this.handleClearToolClick}
            onMouseDown ={this.handleClearToolMouseDown}
            onMouseOver ={this.handleClearToolOver}
            onMouseOut  ={this.handleClearToolOut}
            style={style}
        >{tool}</div>
    },

    handleClearToolMouseDown: function(event) {
        event.preventDefault()
    },

    handleClearToolOver: function(){
        this.setState({
            clearToolOver: true
        })
    },

    handleClearToolOut: function(){
        this.setState({
            clearToolOver: false
        })
    },

    isEmpty: function(props) {
        var emptyValue = this.getEmptyValue(props)

        if (typeof props.isEmpty === 'function'){
            return props.isEmpty(props, emptyValue)
        }

        var value = props.value

        if (value == null){
            value = ''
        }

        return value === emptyValue
    },

    getEmptyValue: function(props){
        var value = props.emptyValue

        if (typeof value === 'function'){
            value = value(props)
        }

        return value
    },

    isValid: function(props) {
        var value = props.value
        var result = true

        if (typeof props.validate === 'function'){
            result = props.validate(value, props, this) !== false
        }

        return result
    },

    getInput: function() {
        return this.refs.input.getDOMNode()
    },

    focus: function(){
        var input = this.getInput()

        if (input && typeof input.focus === 'function'){
            input.focus()
        }
    },

    handleClick: function(event){
        if (this.props.focusOnClick && !this.isFocused()){
            this.focus()
        }

        ;(this.props.onClick || emptyFn)(event)
    },

    handleMouseDown: function(event) {
        ;(this.props.onMouseDown || emptyFn)(event)
    },

    handleClearToolClick: function(event) {
        var emptyValue = this.getEmptyValue(this.props)

        this.notify(emptyValue, event)

        ;(this.props.onClearToolClick || emptyFn)(emptyValue, event)
    },

    handleChange: function(event) {
        this.props.stopChangePropagation && event.stopPropagation()
        this.notify(event.target.value, event)
    },

    handleSelect: function(event) {
        this.props.stopSelectPropagation && event.stopPropagation()
        ;(this.props.onSelect || emptyFn)(event)
    },

    notify: function(value, event) {
        if (this.props.value === undefined){
            this.setState({
                defaultValue: value
            })
        }
        ;(this.props.onChange || emptyFn)(value, this.props, event)
    },

    //*****************//
    // PREPARE METHODS //
    //*****************//
    prepareProps: function(thisProps, state) {

        var props = {}

        assign(props, thisProps)

        props.value = this.prepareValue(props, state)

        props.focused = this.isFocused()
        props.valid   = this.isValid(props)
        props.empty   = this.isEmpty(props)

        props.onClick     = this.handleClick
        props.onMouseDown = this.handleMouseDown

        props.className  = this.prepareClassName(props)
        props.style      = this.prepareStyle(props)
        props.innerStyle = this.prepareInnerStyle(props)

        return props
    },

    getValue: function() {
        var value = this.props.value === undefined?
                        this.state.defaultValue:
                        this.props.value

        return value
    },

    prepareValue: function(props, state) {
        return this.getValue()
    },

    prepareClassName: function(props) {
        var result = [
            props.className,
            props.defaultClassName
        ]

        if (props.empty){
            result.push(props.emptyClassName)
        }

        if (!props.valid){
            result.push(props.invalidClassName)
        }

        return result.filter(cls => !!cls).join(' ')
    },

    prepareStyle: function(props) {
        var style = assign({}, props.defaultStyle, props.style)

        if (props.focused){
            assign(style, props.defaultFocusedStyle, props.focusedStyle)
        }

        if (props.empty){
            assign(style, props.emptyStyle)
        }

        if (!props.valid){
            assign(style, props.defaultInvalidStyle, props.invalidStyle)
        }

        return style
    },

    prepareInnerStyle: function(props) {
        var style = assign({}, props.defaultInnerStyle, props.innerStyle)

        return normalize(style)
    },

    prepareInputProps: function(props) {

        var inputProps = {
            className: props.inputClassName
        }

        assign(inputProps, props.defaultInputProps, props.inputProps)

        inputProps.key         = 'field'
        inputProps.value       = props.value
        inputProps.placeholder = props.placeholder
        inputProps.onChange    = this.handleChange
        inputProps.onSelect    = this.handleSelect
        inputProps.style       = this.prepareInputStyle(props)
        inputProps.onFocus     = this.handleFocus
        inputProps.onBlur      = this.handleBlur
        inputProps.name        = props.name
        inputProps.disabled    = props.disabled
        inputProps.readOnly    = props.readOnly
        inputProps.autoFocus   = props.autoFocus

        return inputProps
    },

    handleFocus: function(event){
        this._focused = true

        //so as to apply focus style
        this.setState({})
        //this.props.onFocus is called due to event propagation
    },

    handleBlur: function(){
        this._focused = false

        //so as to unapply focus style
        this.setState({})
        //this.props.onBlur is called due to event propagation
    },

    isFocused: function(){
        return !!this._focused
    },

    prepareInputStyle: function(props) {
        var inputStyle = props.inputProps?
                            props.inputProps.style:
                            null

        var style = assign({}, props.defaultInputStyle, props.inputStyle, inputStyle)

        if (props.empty){
            assign(style, props.inputEmptyStyle)
        }

        if (!props.valid){
            assign(style, props.defaultInputInvalidStyle, props.inputInvalidStyle)
        }

        return normalize(style)
    },

    prepareClearToolStyle: function(props, state) {
        var defaultClearToolOverStyle
        var clearToolOverStyle
        var clearToolColor

        if (state && state.clearToolOver){
            defaultClearToolOverStyle = props.defaultClearToolOverStyle
            clearToolOverStyle = props.clearToolOverStyle
        }

        if (props.clearToolColor){
            clearToolColor = {
                color: props.clearToolColor
            }
            if (state && state.clearToolOver && props.clearToolOverColor){
                clearToolColor = {
                    color: props.clearToolOverColor
                }
            }
        }

        var style = assign(
                        {},
                        props.defaultClearToolStyle,
                        defaultClearToolOverStyle,
                        clearToolColor,
                        props.clearToolStyle,
                        clearToolOverStyle
                    )

        return style
    }
}

const ReactClass = React.createClass(DESCRIPTOR)

ReactClass.descriptor = DESCRIPTOR

export default ReactClass