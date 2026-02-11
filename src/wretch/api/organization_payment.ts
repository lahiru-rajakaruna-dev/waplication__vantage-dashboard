import { TOrganizationPaymentUpdate } from '../../schemas';
import { wretchInstance }             from '../index';





export const OrganizationPaymentApi = {
    create: (amount: number) =>
        wretchInstance
            .url('/organization-payments')
            .post({ organization_payment_amount: amount })
            .json(),
    
    update: (paymentId: string, updates: TOrganizationPaymentUpdate) =>
        wretchInstance
            .url(`/organization-payments/${ paymentId }`)
            .patch(updates)
            .json(),
    
    getProfile: (paymentId: string) =>
        wretchInstance
            .url(`/organization-payments/${ paymentId }`)
            .get()
            .json(),
    
    getAll: () =>
        wretchInstance
            .url('/organization-payments/organization')
            .get()
            .json(),
};
