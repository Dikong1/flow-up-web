import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { routes } from '@/shared/routes';
import { MainLogo } from '@/shared/ui/MainLogo';
import { Button } from '@/shared/ui/shadcn/button';
import { cn } from '@/shared/utils/cn';
import { Burger } from './Burger';

const menu = [
    { key: 'why', href: '#why' },
    { key: 'features', href: '#features' },
    { key: 'feedback', href: '#feedback' },
];

export const Header = () => {
    const { t } = useTranslation();
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return (
        <header className="bg-background/80 fixed top-0 left-0 z-100 w-full border-b py-4 backdrop-blur-md">
            <div className="container mx-auto flex items-center justify-between">
                <Link to={'/'}>
                    <MainLogo />
                </Link>
                <div
                    className={cn(
                        'flex items-center gap-10',
                        'max-sm:bg-background max-sm:fixed',
                        'max-sm:h-full max-sm:w-full max-sm:flex-col',
                        'transition-transform max-sm:top-[75px] max-sm:left-0 max-sm:-translate-x-full max-sm:gap-7',
                        openMenu && 'max-sm:translate-x-0',
                    )}
                >
                    <nav className="relative">
                        <ul className="flex gap-10 text-base font-medium max-sm:flex-col max-sm:gap-7 max-sm:pt-10 max-sm:text-center max-sm:text-xl max-sm:font-semibold">
                            {menu.map((item) => (
                                <li key={item.key}>
                                    <a
                                        href={item.href}
                                        onClick={() => setOpenMenu(false)}
                                        className="after:bg-primary hover:text-primary relative transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                                    >
                                        {t(`headerMenu.${item.key}`)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <Link to={routes.home()}>
                        <Button className="max-sm:w-3xs max-sm:py-5 max-sm:text-base">
                            {t('common.getStarted')}
                        </Button>
                    </Link>
                </div>
                <div className="sm:hidden">
                    <Burger open={openMenu} setOpen={setOpenMenu} />
                </div>
            </div>
        </header>
    );
};
