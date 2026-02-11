import { TEmployeeActivitySelect } from '../../schemas';
import { wretchInstance }          from '../index';





export const EmployeeActivityApi = {
    getEmployeeProfile: (employeeId: string) =>
        wretchInstance
            .url(`/employee-activities/${ employeeId }`)
            .get()
            .json<TEmployeeActivitySelect[]>(),
};

