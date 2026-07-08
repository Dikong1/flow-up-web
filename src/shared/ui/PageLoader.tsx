import { Spinner } from './shadcn/spinner';

export const PageLoader = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <Spinner className="size-12" />
        </div>
    );
};
