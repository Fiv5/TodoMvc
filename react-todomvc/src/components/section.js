import React from 'react'
import QueueAnim from 'rc-queue-anim'
import * as ACTIONS from '../actions'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editedTodo: null,
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.editedTodo) {
      // 聚焦
      this.editInput.focus()
    }
  }
  handleDbClick(todo) {
    this.setState({
      editedTodo: todo,
    })
    // console.log(this.editInput)
    this.editInput.value = todo.title
    this.cacheEdit = todo.title
  }

  cancelEdit() {
    this.setState({
      editedTodo: null,
    })
  }

  handleKeyUp(e, todo) {
    // 'esc' => 27 , 'enter' => 13
    const { keyCode } = e
    if (keyCode === 13) {
      // handle enter
      const title = e.target.value
      this.setState({
        editedTodo: null,
      })
      this.props.editTodo({ id: todo.id, title })
    } else if (keyCode === 27) {
      // handle esc
      this.cancelEdit()
    }
    return
  }
  render() {
    const { todos, toggleAll, toggleTodo, delTodo } = this.props
    const todoItem = todos
      ? todos.map(todo => {
          return (
            <li
              className={`todo ${todo.completed ? 'completed' : ''} ${
                this.state.editedTodo === todo ? 'editing' : ''
              }`}
              key={todo.id}
            >
              <div className="view">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="toggle"
                  onChange={e => {
                    toggleTodo(e, todo.id)
                  }}
                />
                <label
                  onDoubleClick={e => {
                    this.handleDbClick(todo)
                  }}
                >
                  {todo.title}
                </label>
                <button
                  className="destroy"
                  onClick={() => {
                    delTodo(todo.id)
                  }}
                />
              </div>
              <input
                type="text"
                ref={node => (this.editInput = node)}
                onKeyUp={e => {
                  this.handleKeyUp(e, todo)
                }}
                onBlur={() => {
                  this.cancelEdit(todo)
                }}
                className="edit"
              />
            </li>
          )
        })
      : null
    return (
      <section
        key="section"
        className="main"
        v-if="todos.length"
        // style={{ display: todos.length ? 'block' : 'none' }}
      >
        <input
          type="checkbox"
          className="toggle-all"
          id="toggle-all"
          onChange={toggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <QueueAnim
          className="todo-list"
          component="ul"
          type={['right', 'left']}
          leaveReverse
        >
          {todoItem}
        </QueueAnim>
      </section>
    )
  }
}
