import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AuthLogin } from '@/services/auth/components/AuthLogin';
import { AuthRegister } from '@/services/auth/components/AuthRegister';
import { PageControls } from '@/shared/ui/PageControls';

const AuthPage = () => {
    const [haveAccount, setHaveAccount] = useState<boolean>(true);

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex w-full max-w-sm justify-center md:max-w-4xl">
                <AnimatePresence mode="wait" initial={false}>
                    {haveAccount ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="w-full"
                        >
                            <AuthLogin
                                setHaveAccount={() => setHaveAccount(false)}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="register"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="w-full"
                        >
                            <AuthRegister
                                setHaveAccount={() => setHaveAccount(true)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <PageControls />
        </div>
    );
};

export default AuthPage;
