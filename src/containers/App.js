import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'seamless-immutable';

import { receiveItems, updateValue } from '../redux/percents';
import PercentInput from '../components/PercentInput';

import './App.css';

class App extends React.Component {

    constructor(...args) {
        super(...args);
        this.setItemCount = this.setItemCount.bind(this);
    }

    componentWillMount() {
        this.props.receiveItems();
    }

    render() {
        const { items, updateValue, totalSum } = this.props;
        return (
            <div>
                <div className='controls'>
                    <button onClick={() => this.setItemCount(1)}>Один элемент</button>
                    <button onClick={() => this.setItemCount(2)}>Два элемента</button>
                    <button onClick={() => this.setItemCount(3)}>Три элемента</button>
                </div>
                <div id="slidersList">
                    {items.map(item => (<PercentInput key={item.name} item={item} updateValue={updateValue} />))}
                </div>
                <div className='summary'>
                    <div><strong>Результат:</strong></div>
                    {items.map(item => (<div className='summary__item'>{item.name}: {item.percent}</div>))}
                </div>
            </div>
        )
    }

    setItemCount(count) {
        this.props.receiveItemsNumber(count);
    }
}

const mapStateToProps = state => ({
    items: Object.values(state.items),
})

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
