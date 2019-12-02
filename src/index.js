import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

const { Component } = React;
const { render } = ReactDOM;
// state data for 3 counters
const data = [{ id: 1, value: 0 }, { id: 2, value: 0 }, { id: 3, value: 0 }];

class Counter extends Component {
    onIncrementClick = () => this.props.onIncrement(1);
    onDecrementClick = () => this.props.onDecrement(1);

    render() {
        const { value } = this.props;

        return (
            <div className="counter">
                <b>{value}</b>
                <div className="counter-controls">
                    <button
                        onClick={this.onDecrementClick}
                        className="button is-danger is-small"
                    >
                        -
                    </button>
                    <button
                        onClick={this.onIncrementClick}
                        className="button is-success is-small"
                    >
                        +
                    </button>
                </div>
            </div>
        );
    }
}
class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [...data]
        };
    }

    onIncrement(id, valueToAdd) {
        const counterIndex = this.state.data.findIndex(
            counter => counter.id === id
        );
        const clonedData = [...this.state.data];
        clonedData[counterIndex].value += valueToAdd;
        this.setState({ data: clonedData });
    }
    onDecrement(id, valueToSub) {
        const counterIndex = this.state.data.findIndex(
            counter => counter.id === id
        );
        const clonedData = [...this.state.data];
        clonedData[counterIndex].value -= valueToSub;
        this.setState({ data: clonedData });
    }

    render() {
        return (
            <div>
                {data.map(counter => (
                    <Counter
                        key={counter.id}
                        value={counter.value}
                        onIncrement={this.onIncrement.bind(this, counter.id)}
                        onDecrement={this.onDecrement.bind(this, counter.id)}
                    />
                ))}
            </div>
        );
    }
}
render(<App />, document.querySelector("#root"));
