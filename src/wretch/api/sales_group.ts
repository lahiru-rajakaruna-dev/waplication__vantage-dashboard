import { TSalesGroupData, TSalesGroupSelect, TSalesGroupUpdate } from '../../schemas';
import { wretchInstance }                                        from '../index';





export const SalesGroupApi = {
    create: (data: TSalesGroupData) =>
        wretchInstance
            .url('/sales-groups')
            .post(data)
            .json(),
    
    update: (groupId: string, updates: TSalesGroupUpdate) =>
        wretchInstance
            .url(`/sales-groups/${ groupId }`)
            .patch(updates)
            .json(),
    
    delete: (groupId: string) =>
        wretchInstance
            .url(`/sales-groups/${ groupId }`)
            .delete()
            .json(),
    
    getProfile: (groupId: string) =>
        wretchInstance
            .url(`/sales-groups/${ groupId }`)
            .get()
            .json<TSalesGroupSelect>(),
    
    getAll: () =>
        wretchInstance
            .url('/sales-groups/organization')
            .get()
            .json<TSalesGroupSelect[]>(),
};

