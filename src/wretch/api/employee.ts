import { wretchInstance }                                                                                                                                                                    from '../index';
import { CreateEmployeeRequest, Employee, UpdateEmployeeNameRequest, UpdateEmployeeNicRequest, UpdateEmployeePhoneRequest, UpdateEmployeeSalesGroupRequest, UpdateEmployeeTerritoryRequest } from './types';





export const employeeApi = {
    // Create a new employee
    create: async (data: CreateEmployeeRequest) => {
        return wretchInstance.post(data, '/employee').json<Employee[]>;
    },
    
    // Update employee name
    updateName: async (employeeId: string, data: UpdateEmployeeNameRequest) => {
        return wretchInstance.patch(data, `/employee/update/name/${ employeeId }`).json<Employee[]>();
    },
    
    // Update employee phone
    updatePhone: async (employeeId: string, data: UpdateEmployeePhoneRequest) => {
        return wretchInstance.patch(data, `/employee/update/phone/${ employeeId }`).json<Employee[]>();
    },
    
    // Update employee NIC
    updateNic: async (employeeId: string, data: UpdateEmployeeNicRequest) => {
        return wretchInstance.patch(`/employee/update/nic/${ employeeId }`).json<Employee[]>();
    },
    
    // Update employee sales group
    updateSalesGroup: async (employeeId: string, data: UpdateEmployeeSalesGroupRequest) => {
        return wretchInstance.patch(data, `/employee/update/sales-group/${ employeeId }`).json<Employee[]>();
    },
    
    // Update employee territory
    updateTerritory: async (employeeId: string, data: UpdateEmployeeTerritoryRequest) => {
        return wretchInstance.patch(data, `/employee/update/territory/${ employeeId }`).json<Employee[]>();
    },
    
    // Delete employee
    delete: async (employeeId: string) => {
        return wretchInstance.delete(`/employee/delete/${ employeeId }`).json<Employee[]>();
    },
    
    // Get employee profile
    getProfile: async (employeeId: string) => {
        return wretchInstance.get(`/employee/profile/${ employeeId }`).json<Employee>();
    },
    
    // Get all employees by organization
    getByOrganization: async () => {
        return wretchInstance.get('/employee/view').json<Employee[]>();
    },
    
    // Get employees by sales group
    getBySalesGroup: async (salesGroupId: string) => {
        return wretchInstance.get(`/employee/view/sales-group/${ salesGroupId }`).json<Employee[]>;
    },
};