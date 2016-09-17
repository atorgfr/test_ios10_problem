import React, { PropTypes, Component } from "react"

export default class App extends Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
        location: PropTypes.object,
        params: PropTypes.object,
        saveInitUrl: PropTypes.func,
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
    }

    render() {

        const {
            children,


        } = this.props



        return <div>
                  <div id="content">
                  {children}
                  </div>
              </div>

    }
}
