import { TOrganizationData, TOrganizationUpdate } from '../../schemas';
import { wretchInstance }                         from '../index';





export const OrganizationApi = {
    // Check if user has registered organization
    isRegistered: () =>
        wretchInstance
            .url('/organization/is_registered')
            .get()
            .json<{ isRegistered: boolean }>(),
    
    // Get current organization
    getOrganization: () =>
        wretchInstance
            .url('/organization/view')
            .get()
            .json(),
    
    // Register new organization
    register: (data: TOrganizationData) =>
        wretchInstance
            .url('/organization/add')
            .post(data)
            .json(),
    
    // Update organization name
    updateName: (data: TOrganizationUpdate) =>
        wretchInstance
            .url('/organization/name')
            .patch(data)
            .json(),
    
    // Update subscription status to expired
    setSubscriptionExpired: () =>
        wretchInstance
            .url('/organization/subscription/expired')
            .patch()
            .json(),
    
    // Update subscription status to valid
    setSubscriptionValid: () =>
        wretchInstance
            .url('/organization/subscription/valid')
            .patch()
            .json(),
    
    // Extend subscription by 30 days
    extendSubscription: () =>
        wretchInstance
            .url('/organization/subscription/date')
            .patch()
            .json(),
    
    // Deactivate organization
    deactivate: () =>
        wretchInstance
            .url('/organization/deactivate')
            .delete()
            .json(),
    
    // Activate organization (admin only)
    activate: (organizationId: string) =>
        wretchInstance
            .url(`/organization/activate/${ organizationId }`)
            .patch()
            .json(),
};
