import { User }                                        from '@supabase/supabase-js';
import { Accessor, createContext, Setter, useContext } from 'solid-js';





export const CNTXAuth = createContext<{
    isUserAuthenticated: Accessor<boolean>,
    setIsUserAuthenticated: Setter<boolean>,
    isAuthenticatedWithApi: () => boolean,
    setIsAuthenticatedWithApi: (value: boolean) => void,
    isRegistered: () => boolean,
    setIsRegistered: (value: boolean) => void,
    userProfile: () => User | undefined
    setUserProfile: (user: User) => void
}>({
       isUserAuthenticated      : () => false,
       isRegistered             : () => false,
       userProfile              : () => undefined,
       isAuthenticatedWithApi   : () => false,
       setIsUserAuthenticated   : () => {
       },
       setIsRegistered          : () => {
       },
       setUserProfile           : () => {
       },
       setIsAuthenticatedWithApi: () => {
       }
   })


export function useCNTXAuth() {
    const cntx = useContext(CNTXAuth)
    
    if (!cntx) {
        throw new Error('[useCNTXAuth] [-] Auth context provider not found')
    }
    
    return cntx
}
