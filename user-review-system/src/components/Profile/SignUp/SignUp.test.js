import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import SignUp from './SignUp';

const mockStore = configureStore([]);

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('../../../features/userSlice/userSlice', () => ({
    saveUserInfo: jest.fn(),
}));

describe('SignUp', () => {
    let formState;
    let setFormState;
    let handlerChange;
    let store;
    let setLogin;

    beforeEach(() => {
        formState = { username: '', email: '', password: '', role: 'user' };
        setFormState = jest.fn();
        handlerChange = jest.fn();
        store = mockStore({});
        setLogin = jest.fn();
    });

    test('render the SignUp component', () => {
        render(
            <Provider store={store}>
                <SignUp
                    formState={formState}
                    setFormState={setFormState}
                    handlerChange={handlerChange}
                    setLogin={setLogin}
                />
            </Provider>
        );

        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
    });

    test('show errors when the form has invalid data', () => {
        render(
            <Provider store={store}>
                <SignUp
                    formState={formState}
                    setFormState={setFormState}
                    handlerChange={handlerChange}
                    setLogin={setLogin}
                />
            </Provider>
        );

        fireEvent.click(screen.getByText(/Sign up/i));

        expect(screen.getByText('Username must contain only letters')).toBeInTheDocument();
        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });

});