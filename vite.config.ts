import tailwindcss      from '@tailwindcss/vite';
import devtools         from 'solid-devtools/vite';
import { defineConfig } from 'vite';
import solidPlugin      from 'vite-plugin-solid';





export default defineConfig(({ mode }) => {
    if (mode == 'development') {
        console.log(process.env);
    }
    
    return {
        plugins: [
            devtools(),
            solidPlugin(),
            tailwindcss()
        ],
        server : {
            port: 3500,
        },
        build  : {
            target: 'esnext',
        },
    }
});
