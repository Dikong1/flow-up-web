import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { MainLogo } from '@/shared/ui/MainLogo';

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="pt-10">
            <div className="container grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Link to={'/'}>
                        <MainLogo />
                    </Link>
                    <p className="text-muted-foreground mt-2 text-sm">
                        {t('common.slogan')}
                    </p>
                </div>
                <div>
                    <h4 className="mb-3 font-medium">{t('footer.product')}</h4>
                    <ul className="text-muted-foreground space-y-2 text-sm">
                        <li className="hover:text-foreground w-fit cursor-pointer underline-offset-4 transition-colors hover:underline">
                            {t('footer.menu.features')}
                        </li>
                        <li className="hover:text-foreground w-fit cursor-pointer underline-offset-4 transition-colors hover:underline">
                            {t('footer.menu.why')}
                        </li>
                        <li className="hover:text-foreground w-fit cursor-pointer underline-offset-4 transition-colors hover:underline">
                            {t('footer.menu.feedback')}
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-3 font-medium">
                        {t('footer.resources')}
                    </h4>
                    <ul className="text-muted-foreground space-y-2 text-sm">
                        <li className="hover:text-foreground w-fit cursor-pointer underline-offset-4 transition-colors hover:underline">
                            {t('footer.menu.github')}
                        </li>
                        <li className="hover:text-foreground w-fit cursor-pointer underline-offset-4 transition-colors hover:underline">
                            {t('footer.menu.api')}
                        </li>
                        <li className="hover:text-foreground w-fit cursor-pointer underline-offset-4 transition-colors hover:underline">
                            {t('footer.menu.docs')}
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-3 font-medium">{t('footer.contact')}</h4>
                    <ul className="text-muted-foreground space-y-2 text-sm">
                        <li className="hover:text-foreground w-fit cursor-pointer underline-offset-4 transition-colors hover:underline">
                            {t('footer.menu.email')}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-border text-muted-foreground mt-10 border-t py-5 text-center text-sm">
                <div className="container flex flex-col items-center justify-between gap-2 sm:flex-row">
                    <div>{t('footer.legal.copyright')}</div>
                    <div className="flex gap-4">
                        <span className="hover:text-foreground w-fit cursor-pointer underline underline-offset-4 transition-colors">
                            {t('footer.legal.privacy')}
                        </span>
                        <span className="hover:text-foreground w-fit cursor-pointer underline underline-offset-4 transition-colors">
                            {t('footer.legal.terms')}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
