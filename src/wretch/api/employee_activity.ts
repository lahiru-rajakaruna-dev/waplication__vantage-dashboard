import { TEmployeeActivityData, TEmployeeActivitySelect } from '../../schemas';
import { wretchInstance }                                 from '../index';





export const EmployeeActivityApi = {
    getEmployeeActivityProfile: (employeeId: string) =>
        wretchInstance
            .url(`/employees-activities/${ employeeId }`)
            .get()
            .json<TEmployeeActivitySelect[]>(),
    
    addEmployeeActivityProfile: (employeeId: string, employeeActivityData: TEmployeeActivityData) => wretchInstance
        .url(`/employee-activities`)
        .post(employeeActivityData)
        .json<TEmployeeActivitySelect[]>()
};

