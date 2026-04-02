import { User }                                        from '@supabase/supabase-js';
import { Accessor, createContext, Setter, useContext } from 'solid-js';





export const CNTXAuth = createContext<{
    isAuthenticated: Accessor<boolean>,
    setIsAuthenticated: Setter<boolean>,
    isRegistered: Accessor<boolean>,
    setIsRegistered: Setter<boolean>,
    userProfile: () => User | undefined
    setUserProfile: (user: User) => void
}>({
       isAuthenticated   : () => false,
       isRegistered      : () => false,
       userProfile       : () => undefined,
       setIsAuthenticated: () => {
       },
       setIsRegistered   : () => {
       },
       setUserProfile    : () => {
       },
   })


export function useCNTXAuth() {
    const cntx = useContext(CNTXAuth)
    
    if (!cntx) {
        throw new Error('[useCNTXAuth] [-] Auth context provider not found')
    }
    
    return cntx
}
