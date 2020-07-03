import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AuthUser } from './authActions';
import { authTypes } from './types';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const mockAuth = {
    email: 'foo@foo.baz',
    password: 'examplePASS'
}
const mockAuthResponse = {
    status : 200,
    error : {
        type : 'NA',
        message : 'Request successful'
    },
    data : {
        uuid : 1234,
        email : 'foo@bar.baz',
        username : 'grault',
        discriminator : 5678,
        dob : 2147483647,
        status : 'profile status'
    }
};
const errorActions = [{
    type: authTypes.AUTH_AUTHENTICATING,
    payload: true
},{
    type: authTypes.AUTH_ERROR,
    payload: "Invalid email or password."
}];
let store;

describe('Register actions tests', () => {
    beforeEach(() => {
        fetch.resetMocks();
        store = mockStore({
            error: "", 
            user: {}, 
            loggedIn: false
        });
    });

    it('Creates AUTH_SUCCESS action when no error', () => {
        fetch.once(JSON.stringify(mockAuthResponse));
        
        const expectedActions = [{
            type: authTypes.AUTH_AUTHENTICATING,
            payload: true
        },{
            type: authTypes.AUTH_SUCCESS,
            payload: true,
            user : {
                uuid : 1234,
                email : 'foo@bar.baz',
                username : 'grault',
                discriminator : 5678,
                dob : 2147483647,
                status : 'profile status'
            }
        }];

        return store.dispatch(AuthUser(mockAuth)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('Creates AUTH_ERROR action when error = true', () => {
        fetch.once(JSON.stringify({...mockAuthResponse, status: 400}));

        return store.dispatch(AuthUser(mockAuth)).then(() => {
            expect(store.getActions()).toEqual(errorActions);
        });
    });

    it('Creates AUTH_ERROR action when rejected', () => {
        fetch.mockRejectOnce(JSON.stringify({mockAuthResponse}));

        return store.dispatch(AuthUser(mockAuth)).then(() => {
            expect(store.getActions()).toEqual(errorActions);
        });
    });

    it('Creates AUTH_ERROR action when aborted', () => {
        fetch.mockAbortOnce();

        return store.dispatch(AuthUser(mockAuth)).then(() => {
            expect(store.getActions()).toEqual(errorActions);
        });
    });
});