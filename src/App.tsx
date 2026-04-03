import {Toaster} from 'solid-toast';
import Views     from './views';



export default function App() {

    return (<div class={'w-full h-screen min-h-screen mx-auto bg-gradient-to-b from-v-bg to-v-accent'}>
        <Toaster/>
        <Views/>
    </div>)
}