import { wretchInstance } from '../index';





export const OrganizationPaymentApi = {
    // Add organization payment
    create: (amount: number) =>
        wretchInstance
            .url('/organization-payment')
            .post({ organization_payment_amount: amount })
            .json(),
    
    // Update payment amount
    updateAmount: (paymentId: string, amount: number) =>
        wretchInstance
            .url(`/organization-payment/amount/${ paymentId }`)
            .patch({ organization_payment_amount: amount })
            .json(),
    
    // Set payment status to pending
    setStatusPending: (paymentId: string) =>
        wretchInstance
            .url(`/organization-payment/status/pending/${ paymentId }`)
            .patch()
            .json(),
    
    // Set payment status to paid
    setStatusPaid: (paymentId: string) =>
        wretchInstance
            .url(`/organization-payment/status/paid/${ paymentId }`)
            .patch()
            .json(),
    
    // Set payment status to verified
    setStatusVerified: (paymentId: string) =>
        wretchInstance
            .url(`/organization-payment/status/verified/${ paymentId }`)
            .patch()
            .json(),
    
    // Set payment status to refunded
    setStatusRefunded: (paymentId: string) =>
        wretchInstance
            .url(`/organization-payment/status/refunded/${ paymentId }`)
            .patch()
            .json(),
    
    // Get payment profile
    getProfile: (paymentId: string) =>
        wretchInstance
            .url(`/organization-payment/profile/${ paymentId }`)
            .get()
            .json(),
    
    // Get all organization payments
    getAll: () =>
        wretchInstance
            .url('/organization-payment/view/organization')
            .get()
            .json(),
};
