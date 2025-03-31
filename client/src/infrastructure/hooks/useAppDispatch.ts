import {useDispatch} from 'react-redux';
import type {AppDispatch} from '@/infrastructure/stores/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();