import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "path";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['logo.svg', "logo192.png"],
            manifest: {
                name: "View cert",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "./logo192.png",
                        sizes: "192x192",
                        type: "image/png",
                    }
                ]
            }
        }),],
    resolve: {
        alias: {
            '@/': path.resolve(__dirname, './src')
        }
    },
    base: "",
    build: {
        outDir: "build",
    },
})