import tailwindcss               from '@tailwindcss/vite';
import devtools                  from 'solid-devtools/vite';
import { defineConfig, loadEnv } from 'vite';
import solidPlugin               from 'vite-plugin-solid';





export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    
    if (mode == 'development') {
        console.log(env);
    }
    
    const PORT = env.PORT;
    
    return {
        plugins: [
            devtools(),
            solidPlugin(),
            tailwindcss()
        ],
        server : {
            port: PORT !== undefined ? parseInt(PORT) : 8080,
        },
        build  : {
            target: 'esnext',
        },
    }
});
