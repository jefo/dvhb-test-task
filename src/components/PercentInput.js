import React from 'react';

class PercentInput extends React.Component {

    constructor(...args) {
        super(...args);
        this.onValueChange = this.onValueChange.bind(this);
    }

    render() {
        let { item, updateValue } = this.props;
        return  (
            <div key={item.name}>
                <input className='percent-input' name={item.name} step='1' type='range' value={item.percent} onChange={this.onValueChange} />
                <input className='percent-input-number' name={item.name} step='1' type='number' value={item.percent} onChange={this.onValueChange} />
            </div>
        )
    }

    onValueChange(e) {
        this.props.updateValue(e.target.name, parseInt(e.target.value, 10));
    }
}

export default PercentInput;
