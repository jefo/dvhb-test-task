import percents, { initialState, updateValue, receiveItems, setItemsCount } from '../src/redux/percents';

describe('percents', () => {
    it('should add received items', () => {
        const action = receiveItems([
            { name: 'item 1', percent: 0 },
            { name: 'item 2', percent: 0 },
            { name: 'item 3', percent: 0 },
            { name: 'item 4', percent: 0 },
            { name: 'item 5', percent: 0 }
        ]);
        const state = percents(initialState, action);
        expect(state).toEqual(initialState.merge({
            items: {
                'item 1': { name: 'item 1', percent: 0 },
                'item 2': { name: 'item 2', percent: 0 },
                'item 3': { name: 'item 3', percent: 0 },
                'item 4': { name: 'item 4', percent: 0 },
                'item 5': { name: 'item 5', percent: 0 }
            }
        }));
    });
    it('should set items count', () => {
        const action = setItemsCount(3);
        const state = percents(initialState, action);
        expect(state).toEqual(initialState.merge({
            visible: 3
        }));
    });
    it('should create updateValue action', () => {
        const action = updateValue('item 1', 10);
        expect(action).toEqual({ type: 'UPDATE_VALUE', payload: { name: 'item 1', value: 10 } })
    });
    it('should update values on each input', () => {
        const receive = receiveItems([
            { name: 'item 1', percent: 0 },
            { name: 'item 2', percent: 0 },
            { name: 'item 3', percent: 10 },
            { name: 'item 4', percent: 0 },
            { name: 'item 5', percent: 90 }
        ]);
        let state = percents(initialState, receive);
        let update = updateValue('item 2', 1);
        state = percents(state, update);
        expect(state).toEqual(state.merge({
            items: {
                'item 2': { name: 'item 2', percent: 1 },
                'item 5': { name: 'item 5', percent: 89 }
            }
        }, { deep: true }));
        update = updateValue('item 3', 8);
        state = percents(state, update);
        expect(state).toEqual(state.merge({
            items: {
                'item 1': { name: 'item 1', percent: 2 },
                'item 2': { name: 'item 2', percent: 1 },
                'item 3': { name: 'item 3', percent: 8 },
                'item 5': { name: 'item 5', percent: 89 }
            }
        }, { deep: true }));
    });
    it('should fix percent values', () => {
        // Если у нескольких элементов одинаковое число процентов, проценты вычитаются у первого по порядку.
    });
});