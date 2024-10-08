const { createSlice } = require('@reduxjs/toolkit');
const { get } = require('firebase/database');
const { onAuthStateChanged } = require('firebase/auth');


jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    ref: jest.fn(),
    get: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn(),
}));


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        users: [],
        isAuthenticated: false,
        userId: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.userId = action.payload.userId;
        },
    },
});

const { setUserData, setUsers, setAuth } = userSlice.actions;


const userReducer = userSlice.reducer;


const { fetchUserData, fetchAllUsers, authListener } = require('./userSlice'); // Убедитесь, что путь правильный

describe('userSlice', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            userData: null,
            users: [],
            isAuthenticated: false,
            userId: null,
        };
    });

    it('should set user data', () => {
        const userData = { name: 'Anna Anna', age: 30, 'isAuthenticated': true, 'userId': "123", };
        const action = setUserData(userData);
        const state = userReducer(initialState, action);
        expect(state.userData).toEqual(userData);
    });

    it('should set all users', () => {
        const users = [{ uid: '1', name: 'Anna' }, { uid: '2', name: 'Maria' }];
        const action = setUsers(users);
        const state = userReducer(initialState, action);
        expect(state.users).toEqual(users);
    });


    it('should handle unauthenticated user', async () => {
        onAuthStateChanged.mockImplementation((auth, callback) => callback(null));

        const dispatch = jest.fn();
        await authListener()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setAuth({ isAuthenticated: false, userId: null }));
        expect(dispatch).toHaveBeenCalledWith(setUserData(null));
    });

    it('should fetch all users', async () => {
        const usersData = {
            user1: { userInfo: { name: 'Anna' }},
            user2: { userInfo: { name: 'Maria' }},
        };

        get.mockResolvedValueOnce({
            exists: jest.fn().mockReturnValue(true),
            val: jest.fn().mockReturnValue(usersData),
        });

        const dispatch = jest.fn();
        await fetchAllUsers()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setUsers([
            { uid: 'user1', name: 'Anna' },
            { uid: 'user2', name: 'Maria' },
        ]));
    });
});
