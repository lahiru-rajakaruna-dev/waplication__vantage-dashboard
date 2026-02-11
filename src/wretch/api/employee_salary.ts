import { TEmployeeSalaryProfileSelect, TEmployeeSalarySelect } from '../../schemas';
import { wretchInstance }                                      from '../index';





export const EmployeeSalaryApi = {
    getEmployeeProfile: (employeeId: string) =>
        wretchInstance
            .url(`/employee-salaries/${ employeeId }`)
            .get()
            .json<TEmployeeSalaryProfileSelect>(),
    
    getPaidSalaries: (employeeId: string) =>
        wretchInstance.url(`/employee-salaries/${ employeeId }`)
                      .get()
                      .json<TEmployeeSalarySelect[]>()
    
};

