import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RegisterUser } from './registerActions';
import { registerTypes } from './types';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const mockRegistration = {
    name: 'Bob',
    email: 'bob.smith@aol.com',
    username: 'bobSmith',
    password: 'testing123'
};
const errorActions = [{
    type: registerTypes.REGISTER_ERROR,
    payload: true
}];
let store = mockStore({
    registered: false, 
    registerError: false,
});


describe('Register actions tests', () => {
    afterEach(() => {
        fetch.resetMocks();
        store = mockStore({
            registered: false, 
            registerError: false,
        });
    });

    it('Creates REGISTER_SUCCESS action when no error', () => {
        fetch.once(JSON.stringify({status: 200}));

        const expectedActions = [{
            type: registerTypes.REGISTER_SUCCESS,
            payload: true
        }];

        return store.dispatch(RegisterUser(mockRegistration)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('Creates REGISTER_ERROR action when success = false', () => {
        fetch.once(JSON.stringify({status: 400}));

        return store.dispatch(RegisterUser(mockRegistration)).then(() => {
            expect(store.getActions()).toEqual(errorActions);
        });
    });

    it('Creates REGISTER_ERROR action when rejected', () => {
        fetch.mockRejectOnce(JSON.stringify({status: 200}));

        return store.dispatch(RegisterUser(mockRegistration)).then(() => {
            expect(store.getActions()).toEqual(errorActions);
        });
    });

    it('Creates REGISTER_ERROR action when aborted', () => {
        fetch.mockAbortOnce();

        return store.dispatch(RegisterUser(mockRegistration)).then(() => {
            expect(store.getActions()).toEqual(errorActions);
        });
    });
});