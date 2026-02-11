import { TClientData, TClientUpdate } from '../../schemas';
import { wretchInstance }             from '../index';





export const ClientApi = {
    create: (data: TClientData) =>
        wretchInstance
            .url('/clients')
            .post(data)
            .json(),
    
    update: (clientId: string, updates: TClientUpdate) =>
        wretchInstance
            .url(`/clients/${ clientId }`)
            .patch(updates)
            .json(),
    
    getProfile: (clientId: string) =>
        wretchInstance
            .url(`/clients/${ clientId }`)
            .get()
            .json(),
    
    getAll: () =>
        wretchInstance
            .url('/clients/organization')
            .get()
            .json(),
};