import { TEmployeeCredentialsData, TEmployeeSelect, } from '../../schemas';
import { wretchInstance }                             from '../index';





export const EmployeeApi = {
    // Get all employees
    getAll: () =>
        wretchInstance
            .url('/employee')
            .get()
            .json<TEmployeeSelect[]>(),
    
    // Get employees by sales group
    getBySalesGroup: (salesGroupId: string) =>
        wretchInstance
            .url(`/employee/sales-group/${ salesGroupId }`)
            .get()
            .json(),
    
    // Get employee profile
    getProfile: (employeeId: string) =>
        wretchInstance
            .url(`/employee/${ employeeId }`)
            .get()
            .json<TEmployeeSelect>(),
    
    // Add new employee with credentials
    create: (data: TEmployeeCredentialsData) =>
        wretchInstance
            .url('/employee')
            .post(data)
            .json(),
    
    // Update employee name
    updateName: (employeeId: string, firstName: string, lastName: string) =>
        wretchInstance
            .url(`/employee/update/name/${ employeeId }`)
            .patch({
                       employee_first_name: firstName,
                       employee_last_name : lastName
                   })
            .json(),
    
    // Update employee NIC
    updateNic: (employeeId: string, nic: string) =>
        wretchInstance
            .url(`/employee/update/nic/${ employeeId }`)
            .patch({ employee_nic_number: nic })
            .json(),
    
    // Update employee phone
    updatePhone: (employeeId: string, phone: string) =>
        wretchInstance
            .url(`/employee/update/phone/${ employeeId }`)
            .patch({ employee_phone: phone })
            .json(),
    
    // Add employees to sales group
    addToSalesGroup: (employeeIds: string[], salesGroupId: string) =>
        wretchInstance
            .url('/employee/update/add-to-sales-group/')
            .patch({
                       employee_sales_group_id: salesGroupId,
                       employees_ids          : employeeIds
                   })
            .json(),
    
    // Remove employees from sales group
    removeFromSalesGroup: (employeeIds: string[]) =>
        wretchInstance
            .url('/employee/update/remove-from-sales-group/')
            .patch({ employees_ids: employeeIds })
            .json(),
    
    // Fire employee
    fire: (employeeId: string) =>
        wretchInstance
            .url(`/employee/fire/${ employeeId }`)
            .patch()
            .json(),
    
    // Suspend employee
    suspend: (employeeId: string) =>
        wretchInstance
            .url(`/employee/suspend/${ employeeId }`)
            .patch()
            .json(),
};
