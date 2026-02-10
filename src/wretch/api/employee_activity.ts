import { TEmployeeActivitySelect } from '../../schemas';
import { wretchInstance }          from '../index';





export const EmployeeActivityApi = {
    getEmployeeProfile: (employeeId: string) =>
        wretchInstance
            .url(`/employee-activity/${ employeeId }`)
            .get()
            .json<TEmployeeActivitySelect[]>(),
};

