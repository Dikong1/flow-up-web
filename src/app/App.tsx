import { Toaster } from 'sonner';
import { ModalProvider } from './providers/ModalProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { WsProvider } from './providers/WsProvider';
import { AppRouter } from './routes';

function App() {
    return (
        <>
            <WsProvider>
                <ThemeProvider>
                    <ModalProvider>
                        <AppRouter />
                        <Toaster
                            theme="system"
                            position="bottom-right"
                            richColors={false}
                            toastOptions={{
                                className: 'app-toast',
                                descriptionClassName: 'app-toast__desc',
                            }}
                        />
                    </ModalProvider>
                </ThemeProvider>
            </WsProvider>
        </>
    );
}

export default App;
