import React from 'react'
import QueueAnim from 'rc-queue-anim'
import * as ACTIONS from '../actions'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editedTodo: null,
      editInputValue: '',
    }
    this.cancelEdit = this.cancelEdit.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.editedTodo) {
      let currItem = this[this.state.editedTodo.id]
      // 聚焦
      currItem.focus()
    }
  }
  handleDbClick(todo) {
    this.setState({
      editedTodo: todo,
      editInputValue: todo.title,
    })
    // cache
    this.cacheEdit = todo.title
  }

  cancelEdit() {
    this.setState({
      editedTodo: null,
    })
  }

  handleKeyUp(todo) {
    const e = arguments[arguments.length - 1]
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

  handleEditChange(e) {
    let { value } = e.target
    this.setState({
      editInputValue: value,
    })
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
              key={todo.id}>
              <div className="view">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="toggle"
                  onChange={toggleTodo.bind(null, todo.id)}
                />
                <label onDoubleClick={this.handleDbClick.bind(this, todo)}>
                  {todo.title}
                </label>
                <button
                  className="destroy"
                  onClick={delTodo.bind(null, todo.id)}
                />
              </div>
              <input
                type="text"
                ref={node => (this[todo.id] = node)}
                value={this.state.editInputValue}
                onChange={this.handleEditChange}
                onKeyUp={this.handleKeyUp.bind(this, todo)}
                onBlur={this.cancelEdit}
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
          leaveReverse>
          {todoItem}
        </QueueAnim>
      </section>
    )
  }
}
