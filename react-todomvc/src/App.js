import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as ACTIONS from './actions'
import Header from './containers/Header'
import Section from './containers/Section'
import Footer from './containers/Footer'

class App extends Component {
  componentDidMount() {
    window.addEventListener('popstate', this.props.onPopState)
    window.history.replaceState(null, null, '#/All')
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.props.onPopState)
  }
  render() {
    return (
      <div>
        <section className="todoapp">
          <Header />
          <Section />
          <Footer />
        </section>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>Written by <a href="#">吴哲卿</a></p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      </div>
    )
  }
}

const mapDispatch2Props = (dispatch, ownProps) => ({
  onPopState(e) {
    const { hash, action } = e.state
    if (hash) {
      const filter = hash.slice(hash.indexOf('/') + 1).toUpperCase()
      dispatch(action)
    }
  },
})

export default connect(null, mapDispatch2Props)(App)
