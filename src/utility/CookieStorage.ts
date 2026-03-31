export async function setUserCookie(userId: string) {
    await window.cookieStore.set(
        'user_id',
        userId
    )
}

