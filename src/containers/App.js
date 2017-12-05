import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'seamless-immutable';

import { receiveItems, updateValue } from '../redux/percents';
import PercentInput from '../components/PercentInput';


class App extends React.Component {

    constructor(...args) {
        super(...args);
        this.setItemCount = this.setItemCount.bind(this);
    }

    componentWillMount() {
        this.props.receiveItems();
    }

    render() {
        const { item, updateValue } = this.props;
        return (
            <div>
                <div className='controls'>
                    <button onClick={() => this.setItemCount(1)}>Один элемент</button>
                    <button onClick={() => this.setItemCount(2)}>Два элемента</button>
                    <button onClick={() => this.setItemCount(3)}>Три элемента</button>
                    <button onClick={() => this.setItemCount(4)}>Четыре элемента</button>
                    <button onClick={() => this.setItemCount(5)}>Пять элементов</button>
                </div>
                <div id="slidersList">
                    {this.props.items.map(item => (<PercentInput item={item} updateValue={updateValue} />))}
                </div>
            </div>
        )
    }

    setItemCount(count) {
        this.props.receiveItemsNumber(count);
    }
}

const mapStateToProps = state => {
    return {
        items: Object.values(state.items)
    }
};

const serverData = [
    { name: 'item 1', percent: 0 },
    { name: 'item 2', percent: 0 },
    { name: 'item 3', percent: 0 },
    { name: 'item 4', percent: 0 },
    { name: 'item 5', percent: 0 },
];

const mapDispatchToProps = dispatch => ({
    receiveItems() {
        dispatch(receiveItems([serverData[0]]));
    },
    receiveItemsNumber(count) {
        dispatch(receiveItems(serverData.filter((item, index) => index < count)));
    },
    updateValue(name, value) {
        dispatch(updateValue(name, value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
