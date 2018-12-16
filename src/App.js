import React, { Component } from 'react'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialized: false,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ initialized: true })
        }, 3000)
    }

    static renderInitializedView() {
        return <div className="App">Home page</div>
    }

    static renderPlaceholder() {
        return <div>loading...</div>
    }

    render() {
        return this.state.initialized
            ? this.constructor.renderInitializedView()
            : this.constructor.renderPlaceholder()
    }
}

export default App
