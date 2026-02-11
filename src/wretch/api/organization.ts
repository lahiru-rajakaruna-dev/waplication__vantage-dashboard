import { TOrganizationData, TOrganizationUpdate } from '../../schemas';
import { wretchInstance }                         from '../index';





export const OrganizationApi = {
    isRegistered: () =>
        wretchInstance
            .url('/organizations/is_registered')
            .get()
            .json<{ isRegistered: boolean }>(),
    
    getOrganization: () =>
        wretchInstance
            .url('/organizations')
            .get()
            .json(),
    
    register: (data: TOrganizationData) =>
        wretchInstance
            .url('/organizations')
            .post(data)
            .json(),
    
    update: (data: TOrganizationUpdate) =>
        wretchInstance
            .url('/organizations')
            .patch(data)
            .json(),
    
};
