import { connect } from 'react-redux'
import Header from '../components/Header'
import * as ACTIONS from '../actions'

const mapDispatch2Props = dispatch => ({
  handleEnterUp(e) {
    // when 'enter' do it
    if (e.keyCode === 13) {
      const title = e.target.value.trim()
      title
        ? dispatch(
            ACTIONS.addTodo({
              id: Date.now(),
              title,
              completed: false,
            })
          )
        : null
      e.target.value = ''
    }
  },
})

export default connect(null, mapDispatch2Props)(Header)
