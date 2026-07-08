import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
    useSendCodeMutation,
    useVerifyCodeMutation,
} from '@/services/auth/api/hooks';
import { AuthInputOtp } from '@/services/auth/components/AuthInputOtp';
import { ResendBtn } from '@/services/auth/components/ResendBtn';
import { PageControls } from '@/shared/ui/PageControls';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/ui/shadcn/card';

const AuthConfirmPage = () => {
    const { t } = useTranslation();

    const [sendCode] = useSendCodeMutation();
    const [verifyCode] = useVerifyCodeMutation();

    const [otpCode, setOtpCode] = useState('');

    const handleSendCode = async () => {
        try {
            await sendCode().unwrap();
        } catch (error) {
            toast.error('Error send code');
        }
    };

    const handleVerifyCode = async (otpCode: string) => {
        try {
            await verifyCode({ body: { code: otpCode } }).unwrap();
        } catch (error) {
            toast.error('Error verify code');
        }
    };

    useEffect(() => {
        if (otpCode) {
            handleVerifyCode(otpCode);
        }
    }, [otpCode]);

    useEffect(() => {
        handleSendCode();
    }, []);

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Card className="w-full max-w-sm gap-2 shadow-xl md:max-w-3xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-center text-2xl">
                        {t('verifyPage.title')}
                    </CardTitle>
                    <CardDescription>
                        <p>{t('verifyPage.description')}</p>
                        <p>{t('verifyPage.enter')}:</p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthInputOtp setValue={setOtpCode} />
                    <div className="text-muted-foreground pt-1 text-center text-sm">
                        <p>{t('verifyPage.keepOpen')}</p>
                        <p>{t('verifyPage.empty')}</p>
                        <ResendBtn resetReq={() => console.log('reset')} />
                    </div>
                </CardContent>
            </Card>
            <PageControls />
        </div>
    );
};

export default AuthConfirmPage;
