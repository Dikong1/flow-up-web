import { useTranslation } from 'react-i18next';
import { FeedbackForm } from '../ui/FeedbackForm';

export const Feedback = () => {
    const { t } = useTranslation();

    return (
        <section id="feedback" className="section">
            <div className="container">
                <div className="mb-10 text-center max-md:mb-8 max-sm:mb-6">
                    <h1 className="section-title mb-9 max-sm:mb-7">
                        {t('feedback.title')}
                    </h1>
                    <h2 className="section-subtitle">
                        {t('feedback.subtitle')}
                    </h2>
                </div>
                <div className="flex justify-center">
                    <FeedbackForm />
                </div>
            </div>
        </section>
    );
};
