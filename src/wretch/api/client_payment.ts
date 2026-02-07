import { TClientPaymentData } from '../../schemas';
import { wretchInstance }     from '../index';





export const ClientPaymentApi = {
    // Add payment for client
    create: (clientId: string, data: TClientPaymentData) =>
        wretchInstance
            .url(`/client-payment/add/${ clientId }`)
            .post(data)
            .json(),
    
    // Update payment amount
    updateAmount: (paymentId: string, amount: number) =>
        wretchInstance
            .url(`/client-payment/amount/${ paymentId }`)
            .patch({ client_payment_amount: amount })
            .json(),
    
    // Set payment status to pending
    setStatusPending: (paymentId: string) =>
        wretchInstance
            .url(`/client-payment/status/pending/${ paymentId }`)
            .patch()
            .json(),
    
    // Set payment status to paid
    setStatusPaid: (paymentId: string) =>
        wretchInstance
            .url(`/client-payment/status/paid/${ paymentId }`)
            .patch()
            .json(),
    
    // Set payment status to verified
    setStatusVerified: (paymentId: string) =>
        wretchInstance
            .url(`/client-payment/status/verified/${ paymentId }`)
            .patch()
            .json(),
    
    // Set payment status to refunded
    setStatusRefunded: (paymentId: string) =>
        wretchInstance
            .url(`/client-payment/status/refunded/${ paymentId }`)
            .patch()
            .json(),
    
    // Get payment profile
    getProfile: (paymentId: string) =>
        wretchInstance
            .url(`/client-payment/profile/${ paymentId }`)
            .get()
            .json(),
    
    // Get all payments for client
    getByClient: (clientId: string) =>
        wretchInstance
            .url(`/client-payment/view/client/${ clientId }`)
            .get()
            .json(),
};
