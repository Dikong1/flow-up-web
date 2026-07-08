import { useTranslation } from 'react-i18next';
import { BoardCard } from './BoardCard';

import type { IBoard } from '../types/board';

interface IProps {
    boards: IBoard[];
}

export const BoardList = ({ boards }: IProps) => {
    const { t } = useTranslation();

    const content = (() => {
        if (boards.length === 0) {
            return (
                <div className="text-muted-foreground w-full py-10 text-center text-base italic">
                    {t('board.boardEmpty')}
                </div>
            );
        }

        return (
            <ul className="flex flex-wrap gap-5">
                {boards.map((board) => (
                    <li key={board.id}>
                        <BoardCard
                            id={board.id}
                            title={board.name}
                            updatedAt={board.updatedAt}
                            workspaceId={board.workspaceId}
                            image={board.imageUrl}
                        />
                    </li>
                ))}
            </ul>
        );
    })();

    return content;
};
