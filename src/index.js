import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

const { Component } = React;
const { render } = ReactDOM;
// state data for 3 counters
const data = [{ id: 1, value: 0 }, { id: 2, value: 0 }, { id: 3, value: 0 }];
class Counter extends Component {
    render() {
        const { value } = this.props;
        return (
            <div className="counter">
                <b>{value}</b>
                <div className="counter-controls">
                    <button className="button is-danger is-small">-</button>
                    <button className="button is-success is-small">+</button>
                </div>
            </div>
        );
    }
}
class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                {data.map(counter => (
                    <Counter key={counter.id} value={counter.value} />
                ))}
            </div>
        );
    }
}
render(<App />, document.querySelector("#root"));
