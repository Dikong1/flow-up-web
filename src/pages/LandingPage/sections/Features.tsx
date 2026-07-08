import {
    BarChart3,
    History,
    Layout,
    Move,
    ShieldCheck,
    Zap,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FeatureCard } from '../ui/FeautureCard';

export const Features = () => {
    const { t } = useTranslation();

    return (
        <section id="features" className="section">
            <div className="container">
                <div className="mb-12 text-center max-md:mb-8">
                    <h1 className="section-title mb-9 max-sm:mb-7">
                        {t('features.title')}
                    </h1>
                    <h2 className="section-subtitle">
                        {t('features.subtitle')}
                    </h2>
                </div>
                <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1 max-md:gap-8 max-sm:gap-4">
                    <FeatureCard
                        title={t('features.items.kanban.title')}
                        text={t('features.items.kanban.description')}
                        icon={Layout}
                    />

                    <FeatureCard
                        title={t('features.items.dragdrop.title')}
                        text={t('features.items.dragdrop.description')}
                        icon={Move}
                    />

                    <FeatureCard
                        title={t('features.items.realtime.title')}
                        text={t('features.items.realtime.description')}
                        icon={Zap}
                    />

                    <FeatureCard
                        title={t('features.items.roles.title')}
                        text={t('features.items.roles.description')}
                        icon={ShieldCheck}
                    />

                    <FeatureCard
                        title={t('features.items.activity.title')}
                        text={t('features.items.activity.description')}
                        icon={History}
                    />

                    <FeatureCard
                        title={t('features.items.analytics.title')}
                        text={t('features.items.analytics.description')}
                        icon={BarChart3}
                    />
                </div>
            </div>
        </section>
    );
};
