import { motion, useReducedMotion } from 'framer-motion';

interface IProps {
    children: React.ReactNode;
}

export const AnimatedTitle = ({ children }: IProps) => {
    const reduce = useReducedMotion();

    return (
        <motion.h1
            initial={
                reduce ? false : { opacity: 0, y: 10, filter: 'blur(6px)' }
            }
            animate={
                reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }
            }
            transition={reduce ? undefined : { duration: 0.5, ease: 'easeOut' }}
            className="pt-48 text-center text-4xl font-medium"
        >
            {children}
        </motion.h1>
    );
};
