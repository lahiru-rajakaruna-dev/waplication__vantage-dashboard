import { wretchInstance } from '../index';





export const AuthorizationApi = {
    isRegistered: async () => {
        return await wretchInstance.get('/auth/is_registered').json<{ isRegistered: boolean }>()
    }
}