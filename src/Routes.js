import React, {Component } from "react"


import {Router, Route, IndexRoute, browserHistory} from "react-router"

// Containers
import App from "containers/App"
import PageHome from "containers/PageHome"
import PageSelect from "containers/PageSelect"

export default class routes extends Component {
    render() {
        return (
            <Router history={ browserHistory }>
                <Route path="/" component={ App }>
                    <IndexRoute component={PageHome}/>
                    <Route path="select" component={PageSelect}/>
                </Route>
            </Router>
    )
    }
}
