import { createRoot } from 'react-dom/client';

import './styles/index.css';

import { Provider } from 'react-redux';
import App from './app/App.tsx';
import { store } from './store';

import './config/i18n/i18n.ts';

import { applyInitialTheme } from '@/shared/lib/theme';

applyInitialTheme();

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
