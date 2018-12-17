import React, { Component } from 'react'
import CalendarIndex from 'Calendar/CalendarIndex'
import CalendarIndex2 from 'Calendar/CalendarIndex2'
import DateRange from 'DateRange/DateRange'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialized: false,
            dateRange: new DateRange(
                new Date('2018-12-01'),
                new Date('2018-12-31')
            ),
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ initialized: true })
        }, 3000)
    }

    renderInitializedView() {
        return (
            <div>
                Home page
                <CalendarIndex />
                <CalendarIndex2 />
                {this.state.dateRange.toString()}
            </div>
        )
    }

    static renderPlaceholder() {
        return <div>loading...</div>
    }

    render() {
        return this.state.initialized
            ? this.renderInitializedView()
            : this.constructor.renderPlaceholder()
    }
}

export default App
