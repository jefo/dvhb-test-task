import React from 'react';
import PercentInput from './PercentInput';

const PercentInputList = ({ items }) => items.map(item => <PercentPicker item={item} />);

export default PercentInputList;
