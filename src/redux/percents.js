import Immutabe from 'seamless-immutable';

export const setItemsCount = (count) => ({
    type: 'SET_ITEMS_COUNT',
    payload: { count }
});

export const receiveItems = (items) => ({ type: 'RECEIVE_ITEMS', payload: { items } });

export const updateValue = (name, value) => ({ type: 'UPDATE_VALUE', payload: { name, value } });

export const initialState = Immutabe({
    items: {},
    visible: 1
});

const MAX_VALUE = 100;
const MIN_VALUE = 0;

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'RECEIVE_ITEMS':
            // reduce array to key-value map for easier access
            let items = payload.items.reduce((acc, next) => {
                acc[next.name] = next;
                return acc;
            }, {});
            let itemsArr = Object.values(items);
            let valuesSum = itemsArr.map(item => item.percent).reduce((sum, val) => sum + val);
            state = state.set('items', items);
            if (valuesSum < MAX_VALUE) {
                state = state.setIn(['items', itemsArr[0].name, 'percent'], MAX_VALUE);
            }
            return state;

        case 'SET_ITEMS_COUNT':
            return state.set('visible', payload.count);
        case 'UPDATE_VALUE':
            const updateValues = (name, value) => {
                const path = (name) => ['items', name, 'percent'];
                let prevValue = state.getIn(path(name));
                if (value < 0) {
                    value = MIN_VALUE;
                }
                if (value > MAX_VALUE) {
                    value = MAX_VALUE
                }
                state = state.setIn(path(name), value);
                let itemsArr = Object.values(state.items.asMutable());
                let valuesSum = itemsArr.map(item => item.percent).reduce((sum, val) => sum + val);
                if (valuesSum === MAX_VALUE) {
                    return state;
                }
                const findMax = (arr) => arr.reduce((a, b) => a.percent > b.percent ? a : b);
                const findMin = (arr) => arr.reduce((a, b) => a.percent < b.percent ? a : b);
                const findNext = value > prevValue ? findMax : findMin;
                itemsArr = itemsArr
                    .filter(item => item.name !== name)
                    .sort((a, b) => a.percent - b.percent)
                    .reverse();
                let nextItem = findNext(itemsArr);
                if (!nextItem) {
                    return state;
                }
                let rest = MAX_VALUE - valuesSum;
                let nextItemNextValue = nextItem.percent + rest;
                return updateValues(nextItem.name, nextItemNextValue);
            };
            return updateValues(payload.name, payload.value);
        default:
            return state;
    }
};
