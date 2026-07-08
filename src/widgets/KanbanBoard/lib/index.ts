export const sortByOrder = <T extends { order: number }>(arr: T[]): T[] => {
    return [...arr].sort((a, b) => a.order - b.order);
};

export const normalizeOrders = <T extends { order: number }>(arr: T[]): T[] => {
    return arr.map((x, i) => ({
        ...x,
        order: i + 1,
    }));
};

export const arrayMove = <T>(arr: T[], from: number, to: number): T[] => {
    const copy = arr.slice();
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
};
