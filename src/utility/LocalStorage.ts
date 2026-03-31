export function setUserIdOnLocalStorage(value: string) {
    window.localStorage.setItem('user_id', value)
}


export function getUserIdFromLocalStorage() {
    return window.localStorage.getItem('user_id');
}