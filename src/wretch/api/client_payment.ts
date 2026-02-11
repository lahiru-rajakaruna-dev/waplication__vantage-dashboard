import { TClientPaymentData, TClientPaymentUpdate } from '../../schemas';
import { wretchInstance }                           from '../index';





export const ClientPaymentApi = {
    create: (clientId: string, data: TClientPaymentData) =>
        wretchInstance
            .url(`/client-payments/${ clientId }`)
            .post(data)
            .json(),
    
    update: (paymentId: string, updates: TClientPaymentUpdate) =>
        wretchInstance
            .url(`/client-payments/${ paymentId }`)
            .patch(updates)
            .json(),
    
    getProfile: (paymentId: string) =>
        wretchInstance
            .url(`/client-payments/${ paymentId }`)
            .get()
            .json(),
    
    getByClient: (clientId: string) =>
        wretchInstance
            .url(`/client-payments/client/${ clientId }`)
            .get()
            .json(),
};
