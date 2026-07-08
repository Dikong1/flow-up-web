import { useEffect } from 'react';
import { useGetMeQuery } from '@/services/user/api/hooks/';
import { useAppDispatch } from '@/shared/hooks/redux';
import { setUser } from '@/store/slices/user-slice';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading, isError, isSuccess } = useGetMeQuery();

    useEffect(() => {
        if (data && !isError) {
            dispatch(setUser(data));
        }
    }, [data, isError, dispatch]);

    return { isAuthenticated: isSuccess, isLoading };
};
