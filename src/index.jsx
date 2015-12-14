import React from 'react'
import { Pop } from 'react-pushpop'

export function AutoId(Component) {
  return Pop('autoId', React.PropTypes.func, true)(Component)
}

export function UseAutoId(Component) {
  let autoIdValue= 0
  function genAutoId() {
    autoIdValue++
    return `${autoIdValue}`
  }

  return class extends React.Component {
    render() {
      return <Component {...this.props}/>
    }

    static childContextTypes = {
      autoId: React.PropTypes.func,
    }

    getChildContext() {
      return {
        autoId: genAutoId
      }
    }
  }
}
