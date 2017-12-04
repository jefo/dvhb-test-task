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

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'RECEIVE_ITEMS':
            // reduce array to key-value map for easier access
            let items = payload.items.reduce((acc, next) => {
                acc[next.name] = next;
                return acc;
            }, {});
            return state.set('items', items);
        case 'SET_ITEMS_COUNT':
            return state.set('visible', payload.count);
        case 'UPDATE_VALUE':
            let prevValue = state.getIn(['items', payload.name, 'percent']);
            let minVal = Number.POSITIVE_INFINITY;
            let maxVal = Number.NEGATIVE_INFINITY;
            var tmp = 0;
            let maxItemName;
            let minItemName;
            Object.keys(state.items).forEach(key => {
                tmp = state.getIn(['items', key, 'percent']);
                if (tmp < minVal) {
                    minVal = tmp;
                    minItemName = key;
                }
                if (tmp > maxVal) {
                    maxVal = tmp;
                    maxItemName = key;
                }
            });
            state = state.updateIn(['items', payload.name], item => {
                item = item.set('percent',  payload.value);                
                return item;
            });
            if (prevValue < payload.value) {
                return state.updateIn(['items', maxItemName], item => {
                    item = item.set('percent',  item.percent - payload.value);
                    return item;
                });
            } else {
                return state.updateIn(['items', minItemName], item => {
                    item = item.set('percent',  prevValue - payload.value);
                    return item;
                });
            }
        default:
            return state;
    }
};
