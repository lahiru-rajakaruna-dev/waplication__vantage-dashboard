import { User } from '@supabase/supabase-js';





export function setAuthUserProfile(user: User) {
    return window.localStorage.setItem('user', JSON.stringify(user))
}


export function getAuthUserProfile() {
    const user = window.localStorage.getItem('user')
    if (!user) {
        return undefined
    }
    return JSON.parse(user);
}