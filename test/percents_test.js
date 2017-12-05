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
                'item 1': { name: 'item 1', percent: 100 },
                'item 2': { name: 'item 2', percent: 0 },
                'item 3': { name: 'item 3', percent: 0 },
                'item 4': { name: 'item 4', percent: 0 },
                'item 5': { name: 'item 5', percent: 0 }
            }
        }));
    });
    // it('should ')
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
        let update = updateValue('item 5', 91);
        state = percents(state, update);
        expect(state).toEqual(state.merge({
            items: {
                'item 3': { name: 'item 3', percent: 9 },
                'item 5': { name: 'item 5', percent: 91 }
            }
        }, { deep: true }));
        update = updateValue('item 3', 8);
        state = percents(state, update);
        expect(state).toEqual(state.merge({
            items: {
                'item 1': { name: 'item 1', percent: 1 },
                'item 2': { name: 'item 2', percent: 0 },
                'item 3': { name: 'item 3', percent: 8 },
                'item 5': { name: 'item 5', percent: 91 }
            }
        }, { deep: true }));
        update = updateValue('item 5', 99);
        state = percents(state, update);
        expect(state).toEqual(state.merge({
            items: {
                'item 1': { name: 'item 1', percent: 1 },
                'item 2': { name: 'item 2', percent: 0 },
                'item 3': { name: 'item 3', percent: 0 },
                'item 5': { name: 'item 5', percent: 99 }
            }
        }, { deep: true }));
        update = updateValue('item 1', 0);
        state = percents(state, update);
        expect(state).toEqual(state.merge({
            items: {
                'item 1': { name: 'item 1', percent: 0 },
                'item 2': { name: 'item 2', percent: 1 },
                'item 3': { name: 'item 3', percent: 0 },
                'item 5': { name: 'item 5', percent: 99 }
            }
        }, { deep: true }));
    });
});