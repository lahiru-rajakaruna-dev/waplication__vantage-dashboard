import { TEmployeeSalaryProfileSelect, TEmployeeSalaryProfileUpdate, TEmployeeSalaryRecordData, TEmployeeSalaryRecordSelect } from '../../schemas';
import { wretchInstance }                                                                                                     from '../index';





export const EmployeeSalaryApi = {
    getEmployeeProfile: (employeeId: string) =>
        wretchInstance
            .url(`/employees-salaries/${ employeeId }`)
            .get()
            .json<TEmployeeSalaryProfileSelect>(),
    
    updateEmployeeProfile: (employeeId: string, salaryProfileUpdates: TEmployeeSalaryProfileUpdate) =>
        wretchInstance
            .url(`/employees-salaries/${ employeeId }`)
            .patch(salaryProfileUpdates)
            .json<TEmployeeSalaryProfileSelect>(),
    
    getPaidSalaries: (employeeId: string) =>
        wretchInstance.url(`/employees-salaries/records/${ employeeId }`)
                      .get()
                      .json<TEmployeeSalaryRecordSelect[]>(),
    
    addEmployeeSalaryRecord: (
        employeeId: string,
        employeeSalaryData: TEmployeeSalaryRecordData
    ) => wretchInstance
        .url(`/employees-salaries/records/${ employeeId }`)
        .post(employeeSalaryData)
        .json<TEmployeeSalaryRecordSelect>()
    
};

