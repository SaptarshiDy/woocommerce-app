import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Customer from '../../services/customer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginRequest = createAsyncThunk('user/login', async ({ email, password }: any) => {
    const reposne = await Customer.login(email, password);
    return reposne;
});

export const retriveSession = createAsyncThunk('user/session/retrive', async () => {
    const reponse = await Customer.session();
    return reponse; 
});

export const logoutRequest = createAsyncThunk('user/logout', async () => {
    const reponse = await Customer.logout();
    return reponse; 
});

// Define a type for the slice state
interface AuthState {
    token: String | null,
    user: UserState | null,
    loading: Boolean,
    error: Object | null,
}

interface UserState {
    id: Number,
    name: String,
    nickname: String,
    email: String,
    profileImage: String,
}

// Define the initial state using that type
const initialState: AuthState = {
    token: null,
    user: null,
    loading: false,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
        //Login
        builder.addCase(loginRequest.pending, (state: any, action: any) => {
            state.loading = true;
        })
        builder.addCase(loginRequest.fulfilled, (state: any, action: any) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.loading = false;
        })
        builder.addCase(loginRequest.rejected, (state: any, action: any) => {
            // console.log(action.payload);
            state.loading = false;
        })

        //Retirve Session
        builder.addCase(retriveSession.pending, (state: any, action: any) => {
            state.loading = true;
        })
        builder.addCase(retriveSession.fulfilled, (state: any, action: any) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.loading = false;
        })
        builder.addCase(retriveSession.rejected, (state: any, action: any) => {
            state.loading = false;
        })

        //Logout
        builder.addCase(logoutRequest.pending, (state: any, action: any) => {
            state.loading = true;
        })
        builder.addCase(logoutRequest.fulfilled, (state: any, action: any) => {
            state.token = null;
            state.user = null;
            state.loading = false;
        })
        builder.addCase(logoutRequest.rejected, (state: any, action: any) => {
            state.loading = false;
        })

    },
})

export const {  } = authSlice.actions
export default authSlice.reducer