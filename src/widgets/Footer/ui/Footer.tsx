import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { MainLogo } from "@/shared/ui/MainLogo";

export const Footer = () => {
   const { t } = useTranslation();

   return (
      <footer className="pt-10">
         <div className="container grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
               <Link to={'/'}>
                  <MainLogo />
               </Link>
               <p className="text-sm text-muted-foreground mt-2">
                  {t('common.slogan')}
               </p>
            </div>
            <div>
               <h4 className="font-medium mb-3">{t('footer.product')}</h4>
               <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="w-fit hover:text-foreground transition-colors cursor-pointer underline-offset-4 hover:underline">
                     {t('footer.menu.features')}
                  </li>
                  <li className="w-fit hover:text-foreground transition-colors cursor-pointer underline-offset-4 hover:underline">
                     {t('footer.menu.why')}
                  </li>
                  <li className="w-fit hover:text-foreground transition-colors cursor-pointer underline-offset-4 hover:underline">
                     {t('footer.menu.feedback')}
                  </li>
               </ul>
            </div>
            <div>
               <h4 className="font-medium mb-3">{t('footer.resources')}</h4>
               <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="w-fit hover:text-foreground transition-colors cursor-pointer underline-offset-4 hover:underline">{t('footer.menu.github')}</li>
                  <li className="w-fit hover:text-foreground transition-colors cursor-pointer underline-offset-4 hover:underline">{t('footer.menu.api')}</li>
                  <li className="w-fit hover:text-foreground transition-colors cursor-pointer underline-offset-4 hover:underline">{t('footer.menu.docs')}</li>
               </ul>
            </div>
            <div>
               <h4 className="font-medium mb-3">{t('footer.contact')}</h4>
               <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="w-fit hover:text-foreground transition-colors cursor-pointer underline-offset-4 hover:underline">{t('footer.menu.email')}</li>
               </ul>
            </div>
         </div>
         <div className="mt-10 py-5 border-t border-border text-sm text-muted-foreground text-center">
            <div className="container flex flex-col sm:flex-row items-center justify-between gap-2">
               <div>{t('footer.legal.copyright')}</div>
               <div className="flex gap-4">
                  <span className="w-fit hover:text-foreground underline transition-colors cursor-pointer underline-offset-4">
                     {t('footer.legal.privacy')}
                  </span>
                  <span className="w-fit hover:text-foreground underline transition-colors cursor-pointer underline-offset-4">
                     {t('footer.legal.terms')}
                  </span>
               </div>
            </div>
         </div>
      </footer>
   );
};