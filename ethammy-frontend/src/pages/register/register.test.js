import RegisterForm from './register';
import  App  from '../../App';
import React from 'react';
import * as constant from '../../constants/register';
import { render, fireEvent, screen } from '../../test-utils';
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();
let defaultComp = <Router history={history}>
    <RegisterForm />
</Router>
let defaultState = {
    initialState: {
        register: {
            registered: false,
            registering: false, 
            registerError: false,
        }
    }
}

describe('RegisterForm component testing', () => {
    it('Triggers register error message', () => {
        render(defaultComp, { initialState: {
            register: {
                registered: false,
                registering: false, 
                registerError: true,
            }
        } });

        expect(screen.getByText(RegExp(constant.registerErrorMsg, 'i'))).toBeInTheDocument();
    });

    it('Triggers name error' , () => {
        render(defaultComp, defaultState);
        fireEvent.change(screen.getByLabelText(/First Name:/i), {
            target: {value: '2'}
        });
        expect(screen.getByText(RegExp(constant.nameErrorMsg, 'i'))).toBeInTheDocument();
    });

    it('Will call the register function', () => {
        const mockRegister = jest.fn();
        let mockFuncComp = <Router history={history}>
            <RegisterForm RegisterUser={mockRegister} />
        </Router>
        render(mockFuncComp, defaultState);

        //fill in form
        fireEvent.change(screen.getByLabelText(/First Name:/i), {
            target: {value: 'Ethan'}
        });
        fireEvent.change(screen.getByLabelText(/Email:/i), {
            target: {value: 'ethan4@gmail.com'}
        });
        fireEvent.change(screen.getByLabelText(/Create Username:/i), {
            target: {value: 'ethan44'}
        });
        fireEvent.change(screen.getByLabelText(/Create Password:/i), {
            target: {value: '#bl@ckLivesM@TTER!'}
        });
        fireEvent.change(screen.getByLabelText(/Confrim Password:/i), {
            target: {value: '#bl@ckLivesM@TTER!'}
        });
        
        const createButton = screen.getByText(/Create Account/i);
        expect(createButton.disabled).toBeFalsy();
        fireEvent.click(screen.getByText(/Create Account/i), () => {
            expect(mockRegister).toHaveBeenCalledTimes(1);
        });
    });

    it('Will redirect to login because already registered', () => {
        history.push('/register');
        let registeredComp = <Router history={history}>
            <App />
        </Router>
        render(registeredComp, { initialState: {
            register: {
                registered: true,
                registering: false, 
                registerError: false
            },
            auth: {
                error: "", 
                user: {}, 
                loggedIn: false,
                authenticating: false
            }
        } });

        expect(screen.getByText(/Login to your account./i)).toBeInTheDocument();
    });
});