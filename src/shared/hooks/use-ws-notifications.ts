import { useEffect } from 'react';
import { useWs } from '@/app/providers/WsProvider';
import { notificationApi } from '@/services/notifications/api/notification-api';
import { useAppDispatch } from './redux';

export const useWsNotifications = () => {
    const { socket } = useWs();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!socket) return;

        socket.on('NOTIFICATION_NEW', () => {
            dispatch(
                notificationApi.util.invalidateTags([
                    { type: 'Notifications' },
                ]),
            );
        });

        return () => {
            socket.off('NOTIFICATION_NEW');
        };
    }, [socket]);
};
