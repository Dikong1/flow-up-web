import { useEffect } from 'react';
import { useWs } from '@/app/providers/WsProvider';
import { useWsBoardEvents } from '@/shared/lib/use-ws-board-events';

export const useWsBoard = (
    userId: string | undefined,
    boardId: string | undefined,
) => {
    const { socket, joinBoard, leaveBoard, status } = useWs();
    const {
        onTaskCreated,
        onTaskDeleted,
        onTaskUpdated,
        onTaskCommented,
        onTaskMoved,
    } = useWsBoardEvents(userId);

    useEffect(() => {
        if (status !== 'connected' || !boardId) return;

        joinBoard(boardId);

        return () => leaveBoard(boardId);
    }, [status, boardId, joinBoard, leaveBoard]);

    useEffect(() => {
        if (!socket || !userId) return;

        socket.on('TASK_CREATED', onTaskCreated);
        socket.on('TASK_UPDATED', onTaskUpdated);
        socket.on('TASK_DELETED', onTaskDeleted);
        socket.on('TASK_COMMENTED', onTaskCommented);
        socket.on('TASK_MOVED', onTaskMoved);

        return () => {
            socket.off('TASK_CREATED', onTaskCreated);
            socket.off('TASK_UPDATED', onTaskUpdated);
            socket.off('TASK_DELETED', onTaskDeleted);
            socket.off('TASK_COMMENTED', onTaskCommented);
            socket.off('TASK_MOVED', onTaskMoved);
        };
    }, [
        socket,
        userId,
        onTaskCommented,
        onTaskCreated,
        onTaskDeleted,
        onTaskMoved,
        onTaskUpdated,
    ]);
};
