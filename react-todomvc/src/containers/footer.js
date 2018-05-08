import { connect } from 'react-redux'
import Footer from '../components/footer'
import * as ACTIONS from '../actions'

const mapState2Props = ({ todos, visibilityFilter }) => ({
  todos,
  nowIndex: visibilityFilter.nowIndex,
  activeTodo: todos.filter(todo => !todo.completed),
  completedTodos: todos.filter(todo => todo.completed),
})
const mapDispatch2Props = dispatch => ({
  // 点击时将状态呈现在url上
  handleFilterClick(index, type) {
    const hash = `#/${type[0].concat(type.toLowerCase().slice(1))}`
    const action = ACTIONS.toggleFilter({ index, filter: type })
    dispatch(action)
    window.history.pushState({ hash, action }, null, hash)
  },
  clearCompleted() {
    dispatch({
      type: ACTIONS.CLEAR_COMPLETED,
    })
  },
})
export default connect(mapState2Props, mapDispatch2Props)(Footer)
