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


export function isApiAuthenticated() {
    return window.localStorage.getItem('is_api_authenticated') === 'true'
}


export function setIsApiAuthenticated(value: boolean) {
    return window.localStorage.setItem('is_api_authenticated', value.toString())
}


export function setIsRegistered(value: boolean) {
    return window.localStorage.setItem('is_registered', value.toString())
}


export function isRegistered() {
    return window.localStorage.getItem('is_registered') === 'true'
}