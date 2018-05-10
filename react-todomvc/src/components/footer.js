import React from 'react'
import QueueAnim from 'rc-queue-anim'
import * as ACTIONS from '../actions'

const Footer = ({
  handleFilterClick,
  nowIndex,
  todos,
  activeTodo,
  completedTodos,
  clearCompleted,
}) => {
  const filters = [
    { type: ACTIONS.SHOW_ALL, title: 'All' },
    { type: ACTIONS.SHOW_ACTIVE, title: 'Active' },
    { type: ACTIONS.SHOW_COMPLETED, title: 'Completed' },
  ]
  const filterItem = filters
    ? filters.map((filter, index) => {
        return (
          <li
            key={filter.type}
            onClick={handleFilterClick.bind(null, index, filter.type)}
          >
            <a className={index === nowIndex ? 'selected' : ''}>
              {filter.title}
            </a>
          </li>
        )
      })
    : null
  return (
    <QueueAnim
      component="footer"
      animConfig={[
        { opacity: [1, 0], translateY: [0, 50] },
        { opacity: [1, 0], translateY: [0, -50] },
      ]}
    >
      {todos.length ? (
        <footer className="footer" key="footer">
          <span className="todo-count">
            <strong>{activeTodo.length} </strong>{' '}
            {activeTodo.length === 1 ? 'item' : 'items'} left
          </span>
          <ul className="filters">{filterItem}</ul>
          <button
            className="clear-completed"
            style={{ display: completedTodos.length ? 'block' : 'none' }}
            onClick={clearCompleted}
          >
            Clear Completed
          </button>
        </footer>
      ) : null}
    </QueueAnim>
  )
}

export default Footer
