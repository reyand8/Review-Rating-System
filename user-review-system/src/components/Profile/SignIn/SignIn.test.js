import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import SignIn from './SignIn';

const mockStore = configureStore([]);

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('../../../features/userSlice/userSlice', () => ({
    setAuth: jest.fn(),
}));

describe('SignIn', () => {
    let formState;
    let setFormState;
    let handlerChange;
    let store;
    let setLogin;

    beforeEach(() => {
        formState = { email: '', password: '' };
        setFormState = jest.fn();
        handlerChange = jest.fn();
        store = mockStore({});
        setLogin = jest.fn();
    });

    test('SignIn', () => {
        render(
            <Provider store={store}>
                <SignIn
                    formState={formState}
                    setFormState={setFormState}
                    handlerChange={handlerChange}
                    setLogin={setLogin}
                />
            </Provider>
        );

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    });

    test('show errors when the form has invalid data', () => {
        render(
            <Provider store={store}>
                <SignIn
                    formState={formState}
                    setFormState={setFormState}
                    handlerChange={handlerChange}
                    setLogin={setLogin}
                />
            </Provider>
        );

        fireEvent.click(screen.getByText(/Sign in/i));

        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });

    test('valid email and password', () => {
        formState = { email: 'email@email.com', password: 'emailemail' };
        render(
            <Provider store={store}>
                <SignIn
                    formState={formState}
                    setFormState={setFormState}
                    handlerChange={handlerChange}
                    setLogin={setLogin}
                />
            </Provider>
        );

        fireEvent.click(screen.getByText(/Sign in/i));

        expect(screen.queryByText('Invalid email format')).not.toBeInTheDocument();
        expect(screen.queryByText('Password must be at least 6 characters')).not.toBeInTheDocument();
    });

});