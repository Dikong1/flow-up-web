import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        visualizer({
            filename: 'dist/stats.html',
            open: true, // откроет браузер сам
            gzipSize: true, // покажет gzip
            brotliSize: true,
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    router: ['react-router'],
                    redux: ['@reduxjs/toolkit', 'react-redux'],
                    query: [
                        '@reduxjs/toolkit/query',
                        '@reduxjs/toolkit/query/react',
                    ],
                    motion: ['framer-motion'],
                    radix: [
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-tooltip',
                        '@radix-ui/react-avatar',
                        '@radix-ui/react-dropdown-menu',
                    ],
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
