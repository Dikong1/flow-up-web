import { useEffect } from 'react';

export const useTitle = (title: string) => {
    useEffect(() => {
        document.title = `Flow Up | ${title}`;
    }, [title]);
};
