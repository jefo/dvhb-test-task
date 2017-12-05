import React from 'react';

// const PercentInput = ({ item, updateValue }) => (
//     <div>
//         <input type='range' value={item.percent} onChange={updateValue} />
//         <input type='number' value={item.percent} />
//     </div>
// );

class PercentInput extends React.Component {

    constructor(...args) {
        super(...args);
        this.onValueChange = this.onValueChange.bind(this);
    }

    render() {
        let { item, updateValue } = this.props;
        return  (
            <div key={item.name}>
                <input name={item.name} type='range' value={item.percent} onChange={this.onValueChange} />
                <input name={item.name} step='0.01' type='number' value={item.percent} onChange={this.onValueChange} />
            </div>
        )
    }

    onValueChange(e) {
        this.props.updateValue(e.target.name, parseFloat(e.target.value));
    }
}

export default PercentInput;
