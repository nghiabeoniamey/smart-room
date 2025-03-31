import {useSelector} from 'react-redux';
import type {RootState} from '@/infrastructure/stores/store';

export const useAppSelector = useSelector.withTypes<RootState>();
