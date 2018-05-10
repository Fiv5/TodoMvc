import { connect } from 'react-redux'
import Section from '../components/Section'
import * as ACTIONS from '../actions'

const initialState = {
  visibilityFilter: { filter: ACTIONS.SHOW_ALL, nowIndex: 0 },
  todos: [],
}
const mapState2Props = ({ todos, visibilityFilter: { filter } }) => {
  switch (filter) {
    case ACTIONS.SHOW_ALL:
      return { todos }
    case ACTIONS.SHOW_ACTIVE:
      return { todos: todos.filter(todo => !todo.completed) }
    case ACTIONS.SHOW_COMPLETED:
      return { todos: todos.filter(todo => todo.completed) }
  }
}
const mapDispatch2Props = dispatch => ({
  toggleAll(e) {
    const value = e.target.checked
    dispatch({
      type: ACTIONS.TOGGLE_ALL,
      payload: { value },
    })
  },
  toggleTodo(id) {
    // 'e' 在传参最后
    const value = arguments[arguments.length - 1].target.checked
    dispatch({
      type: ACTIONS.TOGGLE_TODO,
      payload: {
        id,
        value,
      },
    })
  },
  editTodo({ id, title }) {
    title.trim()
      ? dispatch({
          type: ACTIONS.EDIT_TODO,
          payload: {
            id,
            title,
          },
        })
      : dispatch(
          ACTIONS.delTodo({
            id,
          })
        )
  },
  delTodo(id) {
    dispatch(
      ACTIONS.delTodo({
        id,
      })
    )
  },
})
export default connect(mapState2Props, mapDispatch2Props)(Section)
