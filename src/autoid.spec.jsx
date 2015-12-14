import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import { AutoId, UseAutoId } from './index.jsx'

describe('UseAutoId ->', () => {
  it('makes auto incrementing ID available to sub components through context', () => {
    let latestId= 0
    class A extends React.Component {
      static contextTypes = {
        autoId: React.PropTypes.func,
      }

      render() {
        latestId= this.context.autoId()
        return null
      }
    }

    class B extends React.Component {
      render() {
        return (
          <div>
            <A/>
            <A/>
          </div>
        )
      }
    }

    let BUseAutoId= UseAutoId(B)

    expect(latestId).to.equal(0)
    TestUtils.renderIntoDocument(<BUseAutoId/>)
    expect(latestId).to.equal('2')
  })
})

describe('AutoId ->', () => {
  it('makes AutoId value available to component as a property', () => {
    let latestId= 0
    class A extends React.Component {
      render() {
        latestId= this.props.autoId
        return null
      }
    }

    let AAutoId= AutoId(A)

    class B extends React.Component {
      render() {
        return (
          <div>
            <AAutoId/>
          </div>
        )
      }
    }

    let BUseAutoId= UseAutoId(B)

    expect(latestId).to.equal(0)
    TestUtils.renderIntoDocument(<BUseAutoId/>)
    expect(latestId).to.equal('1')
  })
})
