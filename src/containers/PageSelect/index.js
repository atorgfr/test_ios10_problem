import React, { Component, PropTypes } from "react"

import styles from "./index.css"

export default class PageSelect extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired,
    }

    state = {
        element: [1,2,3,4,5,6],
        currentvalue:3
    }

    handleChange = () => {
        this.setState({element:[4,5,6,7,8,9], currentvalue:5});
    }

    goHome = () => {
        this.context.router.push({
            pathname: "/",
        });
    }

    render() {

        return (
            <div className={styles.root}>
                <div onClick={this.goHome}>Home</div>
                <br/><br/>
                <select onChange={this.handleChange} value={this.state.currentvalue} key={this.state.currentvalue}>
                    {
                            this.state.element.map(function(item, index){
                                return <option key={index} value={item}>{item}</option>
                            })
                    }
                </select>
            </div>
        )
    }
}
