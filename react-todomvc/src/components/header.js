import React from 'react'
import { connect } from 'react-redux'
import * as ACTIONS from '../actions'

const header = ({ handleEnterUp }) => {
  let value, input
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        type="text"
        ref={node => {
          input = node
        }}
        onChange={() => {
          value = input.value
        }}
        onKeyUp={e => {
          handleEnterUp(e)
        }}
        placeholder="What needs to be done?"
        className="new-todo"
        autoFocus
      />
    </header>
  )
}

const mapDispatch2Props = (dispatch, ownProps) => ({
  handleEnterUp(e) {
    debugger
    // when 'enter' do it
    if (e.keyCode === 13 && e.target.value !== '') {
      const title = e.target.value.trim()
      dispatch(
        ACTIONS.addTodo({
          id: Date.now(),
          title,
          completed: false,
        })
      )
      e.target.value = ''
    }
  },
})

export default connect(null, mapDispatch2Props)(header)
