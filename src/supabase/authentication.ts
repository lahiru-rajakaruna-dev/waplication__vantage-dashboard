import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabase }                 from './index';





export async function signupWithGoogle() {
    try {
        const response = await supabase.auth
                                       .signInWithOAuth({
                                                            provider: 'google',
                                                            options : {
                                                                redirectTo: import.meta.env.DEV ? import.meta.env.VITE_APPLICATION_DEV_AUTH_URL : import.meta.env.VITE_APPLICATION_PRODUCTION_AUTH_URL
                                                            }
                                                        })
        
        if (import.meta.env.DEV) {
            console.debug('Supabase > Authentication: ', response)
        }
        
        return response.data.url
    } catch (e) {
        throw new Error('[-] Could not sign in with google...')
    }
}


// export async function signupWithCredentials(email: string, password: string) {
//     try {
//         const response = await supabase.auth.signUp({
//             email   : email,
//             password: password,
//         })
//
//         if (import.meta.env.DEV) {
//             console.debug(response)
//         }
//
//         if (!response.data.session) {
//             throw new Error('[-] Session not found')
//         }
//
//         const sessionSetResponse = await supabase.auth.setSession(response.data.session)
//
//         if (import.meta.env.DEV) {
//             console.debug(sessionSetResponse)
//         }
//
//         return response.data.user
//     } catch (e) {
//         console.warn(e)
//         throw new Error('[-] Could not sign up...')
//     }
// }

export async function checkUserSession() {
    const {
              data,
              error
          } = await supabase.auth.getSession()
    
    return data.session
}


export async function fetchSupabaseUserProfile() {
    const supabaseUserResponse = await supabase.auth.getUser()
    
    if (!supabaseUserResponse.data || !supabaseUserResponse.data.user) {
        throw new Error('[-] Could not fetch user profile...')
    }
    
    return supabaseUserResponse.data.user
}


export function attachCallbackToAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
}


export async function signOut() {
    return await supabase.auth.signOut({ scope: 'global' })
}