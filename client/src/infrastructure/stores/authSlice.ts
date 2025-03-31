import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    ACCESS_TOKEN_STORAGE_KEY,
    REFRESH_TOKEN_STORAGE_KEY,
    USER_INFO_STORAGE_KEY,
} from "@/infrastructure/constants/storageKey";
import {UserInformation} from "@/infrastructure/types/auth.type";
import {localStorageAction} from "@/infrastructure/util/storage";

type AuthenticationData = {
    user: UserInformation;
    accessToken: string;
    refreshToken: string;
};

interface AuthState {
    user: UserInformation | null;
    accessToken: string | null;
    refreshToken: string | null;
}

const getInitialState = (): AuthState => {
    if (typeof window !== 'undefined') {
        return {
            user: localStorageAction.get(USER_INFO_STORAGE_KEY) || null,
            accessToken: localStorageAction.get(ACCESS_TOKEN_STORAGE_KEY) || null,
            refreshToken: localStorageAction.get(REFRESH_TOKEN_STORAGE_KEY) || null,
        };
    }
    return {
        user: null,
        accessToken: null,
        refreshToken: null,
    };
};

const initialState: AuthState = getInitialState();

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthenticationData>) => {
            const {user, accessToken, refreshToken} = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;

            if (typeof window !== 'undefined') {
                localStorageAction.set(USER_INFO_STORAGE_KEY, user);
                localStorageAction.set(ACCESS_TOKEN_STORAGE_KEY, accessToken);
                localStorageAction.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
            }

            console.log("🤡 Current User Info:", user);
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;

            if (typeof window !== 'undefined') {
                localStorageAction.remove(USER_INFO_STORAGE_KEY);
                localStorageAction.remove(ACCESS_TOKEN_STORAGE_KEY);
                localStorageAction.remove(REFRESH_TOKEN_STORAGE_KEY);
            }
        },
    },
});

export const {login, logout} = authSlice.actions;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
export const selectRefreshToken = (state: { auth: AuthState }) => state.auth.refreshToken;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.accessToken !== null;

export default authSlice.reducer;