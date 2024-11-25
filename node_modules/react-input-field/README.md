react-input-field
=================

> A carefully crafted input field for React

See demo at [http://zippyui.com/react-input-field/](http://zippyui.com/react-input-field/)

## Features

 * support for clear tool
 * validation, emptyness & associated styles
 * custom styling & events

## Example

```jsx

var Field = require('react-input-field')

var VALUE = 'initial value'

var App = React.createClass({

    // ********
    // NOTE: the first argument is the new value, NOT the event
    // ********
    handleChange: function(value){
        VALUE = value
        this.setState({})
    },

    render: function(){

        function validate(value){
            return value !== ''
        }

        return <Field onChange={this.handleChange} validate={validate} />
    }
})

React.render(<App />, document.body)
```

## NOTE

Unlike normal `<input>` fields (React.DOM.input), `react-input-field` calls the `onChange` handler with the input value being the first arg!

```jsx
function onChange(value, fieldProps, event){
  console.log(value)
}

<Field onChange={onChange} />
```

## Properties

 * onChange(value: String, props: Object, event: Event) - a function to be called when the input value changes
 * placeholder: String - a placeholder for the input
 * readOnly: Boolean - the value for the readonly attribute for the input field
 * autoFocus: Boolean - the value of the autoFocus attribute for the input
 * clearTool: Boolean/String/ReactElement - defaults to true. Whether to show a clear tool or not when field value is not empty. If the boolean true, ✖ will be rendered as a clear tool, otherwise, the given value will be used.
 * validate: Function - if given, it will be called with the value of the field. If it returns false, the field will have a css class that marks it as invalid (defaults to props.invalidClassName='z-invalid')
  * clearToolStyle: Object - a style for the clear tool
  * clearToolColor: String - a color for the clear tool
  * clearToolOverColor: String - a color for the clear tool, when hovered
  * onClearToolClick: Function(value: String, props: Object, event: Event)
  * emptyValue: String/Function
  * isEmpty: Function
  * onValidityChange: Function(valid: boolean, value, props) - function called when the validity changes
  * toolsPosition: String - defaults to 'right'. Can also be 'left'
  * invalidStyle: Object  - style to be applied when the field is invalid
  * name: String - the value of the name attribute for the field
  * onFocus: Function(event)
  * onBlur: Function(event)
  * onKeyUp: Function(event) ... etc and all onKeyXXX events

## Look & feel

### Styling with className

 * className - a class name to be applied to the component
 * emptyClassName - a class name to be applied to the component, when the value is empty (as determined by `isEmpty` prop - default implementation is `value == null`)
 * invalidClassName - a class name to be applied to the component when it has an invalid value (as determined by the `validate` function prop)

### Styling with style object

* style - styles to be applied to the component
* emptyStyle - styles to be applied to the component when the value is empty
* invalidStyle - styles to be applied to the component when the value is invalid (as determined by the `validate` function prop)
* focusedStyle - styles to be applied to the component when it is focused

## Validation

In order to perform validation, simply provide a `validate` function.

Example:

```jsx

function validate(value, props){
  return value === ""
}

<Field validate={validate} defaultValue="test" />
```

When `validate` returns false, `invalidClassName` and `invalidStyle` are applied.

## Input props

Configuring the `<input />` directly can be done using the `inputProps` prop (because style, emptyStyle, emptyClassName, etc... are applied to the wrapping div, not the `input` itself)

 * inputProps

Example

```jsx
<Field inputProps={{type: 'tel'}} />
```

But most of the time you wont need to use `inputProps` directly.

Example - no need to specify the `onFocus` callback on `inputProps`, since it is called due to event delegation.

```jsx
function onFocus(event){
    //called on input focus
}

<Field onFocus={onFocus} />
```
 * inputStyle

 ```jsx
 <Field inputStyle={{color: 'blue'}} />
 ```

 * inputInvalidStyle
 * inputEmptyStyle

## Contributing

Use [Github issues](https://github.com/zippyui/react-input-field/issues) for feature requests and bug reports.

We actively welcome pull requests.

For setting up & starting the project locally, use:

```sh
$ git clone https://github.com/zippyui/react-input-field
$ cd react-input-field
$ npm install
$ npm run dev
```

Now navigate to [localhost:9090](http://localhost:9090/)

Before building a new version, make sure you run

```sh
$ npm run build
```
which compiles the `src` folder (which contains jsx files) into the `lib` folder (only valid EcmaScript 5 files).

## License

#### MIT
