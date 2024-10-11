import { createSlice } from '@reduxjs/toolkit';
import {getDatabase, ref, get, set} from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

/**
 * Saves user info to the Firebase.
 *
 * @param {string} uid - User ID from Firebase.
 * @param {string} username - The user's username.
 * @param {string} email - The user's email.
 * @param {string} role - The user's role (e.g., admin, user).
 */

export const saveUserInfo = (uid, username, email, role) => async (dispatch) => {
    const db = getDatabase();
    const userRef = ref(db, `user/${uid}/userInfo`);
    try {
        await set(userRef, {
            username,
            email,
            role,
            reviews: {},
            rating: [],
        });
        dispatch(updateUserData({ username, email, role }));
    } catch (error) {
        console.error('Error adding user info to the database:', error);
    }
};

/**
 * Asynchronous action to fetch user data.
 *
 * @async
 * @function
 * @param {string} uid - The ID of the user.
 * @returns {Promise<void>}
 */
export const fetchUserData = (uid) => async (dispatch) => {
    const db = getDatabase();
    const userRef = ref(db, `user/${uid}/userInfo`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        dispatch(setUserData(snapshot.val()));
    }
};

/**
 * Asynchronous action to fetch all users.
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */
export const fetchAllUsers = () => async (dispatch) => {
    const db = getDatabase();
    const usersRef = ref(db, 'user/');
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
        const usersObject = snapshot.val();
        const usersData = Object.entries(usersObject).map(([uid, user]) => ({
            uid,
            ...user.userInfo,
        }));
        dispatch(setUsers(usersData));
    }
};

/**
 * Sets up an authentication listener that dispatches actions based on the user's authentication state.
 *
 * @function
 * @returns {Function}
 */
export const authListener = () => (dispatch) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(setAuth({ isAuthenticated: true, userId: user.uid }));
            dispatch(fetchUserData(user.uid));
        } else {
            dispatch(setAuth({ isAuthenticated: false, userId: null }));
            dispatch(setUserData(null));
        }
    });
};

export const selectUsers = (state) => state.user.users;

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
        updateUserData: (state, action) => {
            state.userData = {
                ...state.userData,
                ...action.payload,
            };
        },
    },
});

export const { setUserData, setUsers,
    setAuth, updateUserData } = userSlice.actions;

export default userSlice.reducer;