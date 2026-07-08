import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface IState {
    token: string | null;
    isEmailVerified: boolean;
}

const initialState: IState = {
    token: null,
    isEmailVerified: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('accessToken', action.payload);
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('accessToken');
        },
        setEmailVerified: (state, action: PayloadAction<boolean>) => {
            state.isEmailVerified = action.payload;
        },
    },
});

export const { setToken, logout, setEmailVerified } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
