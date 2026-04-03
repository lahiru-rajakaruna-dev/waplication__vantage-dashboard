import { wretchInstance } from '../index';





export const AuthorizationApi = {
    isRegistered   : async () => {
        return await wretchInstance
            .get(
                '/auth/is_registered'
            )
            .json<{ isRegistered: boolean }>()
    },
    authenticateApi: async () => {
        return await wretchInstance
            .get('/auth/authenticate').json<boolean>()
    },
    // refreshAccessToken: async () => {
    //     return await wretchInstance.get('/auth/refresh_access_token').json<{access_token:}>()
    // }
}