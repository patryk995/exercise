import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

const { Component, PureComponent } = React;
const { render } = ReactDOM;
// state data for 3 counters
const data = [
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 }
];

class Total extends PureComponent {
    render() {
        const { value } = this.props;
        return <div>Total: {value}</div>;
    }
}

class AltCounter extends PureComponent {
    onIncrementClick = () => this.props.onChange(this.props.value + 1);
    onDecrementClick = () => this.props.onChange(this.props.value - 1);

    render() {
        const { value } = this.props;

        return (
            <div className="counter alternative">
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

class Counter extends PureComponent {
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
            data: [...data],
            total: data.reduce(
                (accumulator, counter) => (accumulator += counter.value),
                0
            )
        };
    }

    onIncrement = (id, valToAdd) => {
        const counterIndex = this.state.data.findIndex(
            counter => counter.id === id
        );
        const clonedData = [...this.state.data];
        clonedData[counterIndex].value += valToAdd;
        this.setState(prevState => ({
            data: clonedData,
            total: prevState.total + valToAdd
        }));
    };

    onDecrement = (id, valToSub) => {
        const counterIndex = this.state.data.findIndex(
            counter => counter.id === id
        );
        const clonedData = [...this.state.data];
        clonedData[counterIndex].value -= valToSub;
        this.setState(prevState => ({
            data: clonedData,
            total: prevState.total - valToSub
        }));
    };

    onChange = (id, updatedVal) => {
        const counterIndex = this.state.data.findIndex(
            counter => counter.id === id
        );
        const clonedData = [...this.state.data];
        const diff = updatedVal - clonedData[counterIndex].value;
        clonedData[counterIndex].value = updatedVal;
        this.setState(prevState => ({
            data: clonedData,
            total: prevState.total + diff
        }));
    };

    render() {
        const { total } = this.state;
        return (
            <div>
                {data.map((counter, index) =>
                    index !== data.length - 1 ? (
                        <Counter
                            key={counter.id}
                            value={counter.value}
                            onIncrement={val =>
                                this.onIncrement(counter.id, val)
                            }
                            onDecrement={val =>
                                this.onDecrement(counter.id, val)
                            }
                        />
                    ) : (
                        <AltCounter
                            key={counter.id}
                            value={counter.value}
                            onChange={val => this.onChange(counter.id, val)}
                        />
                    )
                )}

                <Total value={total} />
            </div>
        );
    }
}
render(<App />, document.querySelector("#root"));
