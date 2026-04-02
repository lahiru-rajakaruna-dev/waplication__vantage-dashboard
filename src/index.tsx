/* @refresh reload */
import './index.css';
import {QueryClientProvider}    from '@tanstack/solid-query';
import {render}                 from 'solid-js/web';
import 'solid-devtools';
import ApplicationRouter        from "./router";
import {getQueryClientInstance} from './tanstack_query';



const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
            'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',);
}

render(() =>
               <QueryClientProvider client={getQueryClientInstance()}>
                   <ApplicationRouter/>
               </QueryClientProvider>
        ,
       root!
);
