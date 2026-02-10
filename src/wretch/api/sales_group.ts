import { TEmployeeSelect, TSaleSelect, TSalesGroupData, TSalesGroupSelect } from '../../schemas';
import { wretchInstance }                                                   from '../index';





export const SalesGroupApi = {
    // Create new sales group
    create: (data: TSalesGroupData) =>
        wretchInstance
            .url('/sales-group')
            .post(data)
            .json(),
    
    // Update sales group name
    updateName: (groupId: string, name: string) =>
        wretchInstance
            .url(`/sales-group/name/${ groupId }`)
            .patch({ sales_group_name: name })
            .json(),
    
    // Update sales group territory
    updateTerritory: (groupId: string, territory: string) =>
        wretchInstance
            .url(`/sales-group/territory/${ groupId }`)
            .patch({ sales_group_territory: territory })
            .json(),
    
    // Delete sales group
    delete: (groupId: string) =>
        wretchInstance
            .url(`/sales-group/${ groupId }`)
            .delete()
            .json(),
    
    // Get sales group profile
    getProfile: (groupId: string) =>
        wretchInstance
            .url(`/sales-group/${ groupId }`)
            .get()
            .json<TSalesGroupSelect & {
                sales_group_employees: (TEmployeeSelect & { employee_sales: TSaleSelect[] })[]
            }>(),
    
    // Get all sales groups
    getAll: () =>
        wretchInstance
            .url('/sales-group/organization')
            .get()
            .json<TSalesGroupSelect[]>(),
};

