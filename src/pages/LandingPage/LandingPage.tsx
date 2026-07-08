import { useTranslation } from 'react-i18next';
import { useTitle } from '@/shared/hooks/use-title';
import { PageControls } from '@/shared/ui/PageControls';
import { Footer } from '@/widgets/Footer/ui/Footer';
import { Header } from '@/widgets/Header/ui/Header';
import { Features } from './sections/Features';
import { Feedback } from './sections/Feedback';
import { Intro } from './sections/Intro';
import { WhyBlock } from './sections/WhyBlock';

const LandingPage = () => {
    const { t } = useTranslation();
    useTitle(t('common.slogan') ?? '');

    return (
        <div className="wrapper">
            <Header />
            <Intro />
            <WhyBlock />
            <Features />
            <Feedback />
            <Footer />
            <PageControls />
        </div>
    );
};

export default LandingPage;
