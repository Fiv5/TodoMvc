import React from 'react'
import { connect } from 'react-redux'
import * as ACTIONS from '../actions'

const Header = ({ handleEnterUp }) => {
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

export default Header