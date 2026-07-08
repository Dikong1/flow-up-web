import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import introImage from '@/assets/images/intro-screen.png';
import { routes } from '@/shared/routes';
import { Button } from '@/shared/ui/shadcn/button';

import type { Variants } from 'framer-motion';

export const Intro = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 14 },
        show: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.55,
                ease: 'easeOut',
                delay: 0.08 * (custom ?? 0),
            },
        }),
    };

    return (
        <div className="border-b pt-[130px] pb-20 max-md:pt-[150px] max-md:pb-[150px] max-sm:pt-[130px] max-sm:pb-10">
            <div className="container">
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <motion.h1
                        variants={fadeUp}
                        initial={reduce ? 'show' : 'hidden'}
                        animate="show"
                        custom={0}
                        className="mb-1 text-4xl leading-normal font-bold tracking-wide max-md:text-3xl max-sm:mb-2"
                    >
                        {t('intro.title')}
                    </motion.h1>

                    <motion.h2
                        variants={fadeUp}
                        initial={reduce ? 'show' : 'hidden'}
                        animate="show"
                        custom={1}
                        className="text-muted-foreground mb-7 text-xl font-medium max-md:text-lg"
                    >
                        {t('intro.text')}
                    </motion.h2>

                    <motion.div
                        initial={
                            reduce
                                ? { opacity: 1, y: 0, scale: 1 }
                                : { opacity: 0, y: 18, scale: 0.985 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={
                            reduce
                                ? { duration: 0 }
                                : {
                                      duration: 0.55,
                                      ease: 'easeOut',
                                      delay: 0.16,
                                  }
                        }
                    >
                        <Link to={routes.home()}>
                            <Button className="w-52 py-7 text-lg shadow-lg">
                                {t('common.getStarted')}
                            </Button>
                        </Link>
                    </motion.div>
                </div>
                <motion.div
                    initial={
                        reduce
                            ? {
                                  opacity: 1,
                                  y: 0,
                                  scale: 1,
                                  filter: 'blur(0px)',
                              }
                            : {
                                  opacity: 0,
                                  y: 18,
                                  scale: 0.985,
                                  filter: 'blur(8px)',
                              }
                    }
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                    }}
                    transition={
                        reduce
                            ? { duration: 0 }
                            : { duration: 0.7, ease: 'easeOut', delay: 0.12 }
                    }
                    className="mx-auto w-full max-w-[1000px] overflow-hidden rounded-2xl border shadow-2xl max-md:hidden"
                >
                    <div className="relative aspect-1000/542 w-full">
                        <motion.img
                            src={introImage}
                            alt="intro image"
                            className="absolute inset-0 h-full w-full object-cover"
                            whileHover={reduce ? undefined : { scale: 1.01 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
