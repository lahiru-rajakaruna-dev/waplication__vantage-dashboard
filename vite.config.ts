import tailwindcss      from '@tailwindcss/vite';
import devtools         from 'solid-devtools/vite';
import { defineConfig } from 'vite';
import solidPlugin      from 'vite-plugin-solid';





export default defineConfig(({ mode, }) => {
    console.log(mode);
    console.log(process.env);
    return {
        plugins: [
            devtools(),
            solidPlugin(),
            tailwindcss()
        ],
        server : {
            port: parseInt(process.env.PORT!) || 3500,
        },
        build  : {
            target: 'esnext',
        },
    }
});
