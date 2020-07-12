import reducer from './registerReducer';
import { registerTypes } from '../actions/types';
const registerSuccess = {
    type: registerTypes.REGISTER_SUCCESS,
    payload: true
}
const registering = {
    type: registerTypes.REGISTER_REGISTERING,
    payload: true
}
const registerError = {
    type: registerTypes.REGISTER_ERROR,
    payload: true
}
const initialState = { 
    registered: false,
    registering: false, 
    registerError: false
};

describe('Register reducer tests', () => {
    it('Should handle success', () => {
        expect(reducer(initialState, registerSuccess)).toEqual({
            ...initialState,
            registered: true
        });
    });
    it('Should handle success from registering', () => {
        expect(reducer({...initialState, registering: true}, registerSuccess)).toEqual({
            ...initialState,
            registered: true
        });
    });
    it('Should handle error', () => {
        expect(reducer(initialState, registerError)).toEqual({
            ...initialState, 
            registerError: true
        });
    });
    it('Should handle error from registering', () => {
        expect(reducer({...initialState, registering: true}, registerError)).toEqual({
            ...initialState,
            registerError: true
        });
    });
    it('should handle registering', () => {
        expect(reducer(initialState, registering)).toEqual({
            ...initialState, 
            registering: true
        });
    });
    it('should handle registering with previous error', () => {
        expect(reducer({...initialState, registerError: true}, registering)).toEqual({
            ...initialState, 
            registering: true
        });
    });
});