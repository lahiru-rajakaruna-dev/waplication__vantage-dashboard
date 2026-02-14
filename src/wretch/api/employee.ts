import { TEmployeeCredentialsData, TEmployeeSelect, TEmployeeUpdate, } from '../../schemas';
import { wretchInstance }                                              from '../index';





export const EmployeeApi = {
    getAll: () =>
        wretchInstance
            .url('/employees')
            .get()
            .json<TEmployeeSelect[]>(),
    
    getBySalesGroup: (salesGroupId: string) =>
        wretchInstance
            .url(`/employees/sales-group/${ salesGroupId }`)
            .get()
            .json<TEmployeeSelect[]>(),
    
    getProfile: (employeeId: string) =>
        wretchInstance
            .url(`/employees/${ employeeId }`)
            .get()
            .json<TEmployeeSelect>(),
    
    create: (data: TEmployeeCredentialsData) =>
        wretchInstance
            .url('/employees')
            .post(data)
            .json(),
    
    update: (employeeId: string, updates: TEmployeeUpdate) =>
        wretchInstance
            .url(`/employees/${ employeeId }`)
            .patch(updates)
            .json(),
    
};
