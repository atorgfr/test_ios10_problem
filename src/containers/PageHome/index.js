import React, { Component, PropTypes } from "react"

import styles from "./index.css"

export default class PageHome extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired,
    }

    goHome = () => {
        this.context.router.push({
            pathname: "/",
        });
    }

    goSelect = () => {
        this.context.router.push({
            pathname: "/select",
        });
    }


    render() {
        return (
            <div className={styles.root}>
                <div>
                    <div>
                        <a onClick={this.goHome}>Home</a> <a onClick={this.goSelect}>Select</a>
                    </div>
                </div>
            </div>
        )
    }
}
