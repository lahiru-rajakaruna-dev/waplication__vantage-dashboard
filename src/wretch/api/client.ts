import { TClientData }    from '../../schemas';
import { wretchInstance } from '../index';





export const ClientApi = {
    // Add new client
    create: (data: TClientData) =>
        wretchInstance
            .url('/client')
            .post(data)
            .json(),
    
    // Update client name
    updateName: (clientId: string, name: string) =>
        wretchInstance
            .url(`/client/name/${ clientId }`)
            .patch({ client_name: name })
            .json(),
    
    // Update client NIC number
    updateNic: (clientId: string, nic: string) =>
        wretchInstance
            .url(`/client/nic/${ clientId }`)
            .patch({ client_nic_number: nic })
            .json(),
    
    // Update client phone
    updatePhone: (clientId: string, phone: string) =>
        wretchInstance
            .url(`/client/phone/${ clientId }`)
            .patch({ client_phone: phone })
            .json(),
    
    // Set client status to active
    setStatusActive: (clientId: string) =>
        wretchInstance
            .url(`/client/status/active/${ clientId }`)
            .patch()
            .json(),
    
    // Set client status to deactivated
    setStatusDeactivated: (clientId: string) =>
        wretchInstance
            .url(`/client/status/deactivated/${ clientId }`)
            .patch()
            .json(),
    
    // Set client status to unverified
    setStatusUnverified: (clientId: string) =>
        wretchInstance
            .url(`/client/status/unverified/${ clientId }`)
            .patch()
            .json(),
    
    // Get client profile
    getProfile: (clientId: string) =>
        wretchInstance
            .url(`/client/profile/${ clientId }`)
            .get()
            .json(),
    
    // Get all clients for organization
    getAll: () =>
        wretchInstance
            .url('/client/view/organization')
            .get()
            .json(),
};