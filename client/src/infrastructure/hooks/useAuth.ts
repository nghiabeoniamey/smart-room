'use client'

import {useSelector} from 'react-redux';
import {selectIsAuthenticated, selectUser} from '@/infrastructure/stores/authSlice';

export function useAuth() {
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return {
        user,
        isAuthenticated
    };
}