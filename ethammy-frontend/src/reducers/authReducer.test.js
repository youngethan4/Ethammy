import reducer from './authReducer';
import { authTypes } from '../actions/types';

const testUser = {
    id: 123242
}
const authSuccess = {
    type: authTypes.AUTH_SUCCESS,
    payload: true,
    user: testUser
}
const authenticating = {
    type: authTypes.AUTH_AUTHENTICATING,
    payload: true
}
const authError = {
    type: authTypes.AUTH_ERROR,
    payload: 'Invalid email or password.'
}
const initialState = { 
    user: {},
    authenticating: false, 
    error: '',
    loggedIn: false
};

describe('Auth reducer tests', () => {
    it('Should handle success', () => {
        expect(reducer(initialState, authSuccess)).toEqual({
            ...initialState,
            loggedIn: true,
            user: testUser
        });
    });
    it('Should handle success from authenticating', () => {
        expect(reducer({...initialState, authenticating: true}, authSuccess)).toEqual({
            ...initialState,
            loggedIn: true,
            user: testUser
        });
    });
    it('Should handle error', () => {
        expect(reducer(initialState, authError)).toEqual({
            ...initialState, 
            error: 'Invalid email or password.'
        });
    });
    it('Should handle error from authenticating', () => {
        expect(reducer({...initialState, authenticating: true}, authError)).toEqual({
            ...initialState,
            error: 'Invalid email or password.'
        });
    });
    it('should handle authenticating', () => {
        expect(reducer(initialState, authenticating)).toEqual({
            ...initialState, 
            authenticating: true
        });
    });
    it('should handle authenticating with previous error', () => {
        expect(reducer({...initialState, error: true}, authenticating)).toEqual({
            ...initialState, 
            authenticating: true
        });
    });
});