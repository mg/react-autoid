# react-autoid
[![Build Status](https://travis-ci.org/mg/react-autoid.svg)](https://travis-ci.org/mg/react-autoid)
[![npm version](https://badge.fury.io/js/react-autoid.svg)](https://badge.fury.io/js/react-autoid)

Decorator to auto-generate ID's for input elements and their associated labels.

### Step 1
Put a decorator on your root component (or some component high in your tree) to set up the auto generation of ID's.

````javascript
import React from 'react'
import { UseAutoId } from 'react-autoid'

@UseAutoId
export default class MyRoot extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}
````

### Step 2
Use the AutoId generator to make an unique ID available to a component to associate an &lt;input> element with an &lt;label> element.

````javascript
import React from 'react'
import { AutoId } from 'react-autoid'

@AutoId
export default class MyTextInput extends React.Component {
  render() {
    const { value, onChange, autoId, children }= this.props

    return (
      <div>
        <label
          htmlFor={autoId}>
          {children}
        </label>
        <input
          type='text'
          value={value}
          onChange={onChange}
          id={autoId}
          />
      </div>  
    )
  }
}
````

If all that you want is to have an unique identifier and you don't care what it's value is, use *react-autoid*.
