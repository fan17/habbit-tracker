import React, { Component } from 'react'
import CalendarIndex from 'Calendar/CalendarIndex'
import CalendarIndex2 from 'Calendar/CalendarIndex2'

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
        return (
            <div>
                Home page
                <CalendarIndex />
                <CalendarIndex2 />
            </div>
        )
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
