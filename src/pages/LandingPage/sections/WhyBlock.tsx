import { Eye, LayoutGrid, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WhyCard } from '../ui/WhyCard';

export const WhyBlock = () => {
    const { t } = useTranslation();

    return (
        <section id="why" className="section">
            <div className="container">
                <div className="mb-12 text-center max-md:mb-8">
                    <h1 className="section-title mb-9 max-sm:mb-7">
                        {t('whyBlock.title')}
                    </h1>
                    <h2 className="section-subtitle">
                        {t('whyBlock.subtitle')}
                    </h2>
                </div>
                <div className="grid grid-cols-3 gap-12 max-md:grid-cols-1 max-md:gap-8 max-sm:gap-6">
                    <WhyCard icon={Eye} labelKey="whyBlock.items.clarity" />
                    <WhyCard
                        icon={LayoutGrid}
                        labelKey="whyBlock.items.structure"
                    />
                    <WhyCard
                        icon={TrendingUp}
                        labelKey="whyBlock.items.momentum"
                    />
                </div>
            </div>
        </section>
    );
};
