import {Show,}                  from 'solid-js';
import {Toaster}                from 'solid-toast';
import {useCNTXAuth}            from './contexts/cntx_auth';
import OrganizationRegistration from './registration';
import Views                    from './views';



export default function App() {
    const {
              isAuthenticated,
              isRegistered
          } = useCNTXAuth()

    return (<div class={'w-full h-screen min-h-screen mx-auto bg-gradient-to-b from-v-bg to-v-accent'}>
        <Toaster/>
        <Show
                when={isRegistered()}
                // when={ true } // FOR DEVELOPMENT
                fallback={<OrganizationRegistration/>}
        >
            <Views/>
        </Show>
    </div>)
}