import { TEmployeeSyncSelect, TEmployeeSyncUpdate } from '../../schemas';
import { wretchInstance }                           from '../index';





export const EmployeeSyncApi = {
    getProfile: (employeeId: string) =>
        wretchInstance.url(`/employees-syncs/${ employeeId }`).get().json<TEmployeeSyncSelect>(),
    update    : (employeeId: string, employeeSyncUpdate: TEmployeeSyncUpdate) =>
        wretchInstance.url(`/employees-syncs/${ employeeId }`).patch(employeeSyncUpdate).json<TEmployeeSyncSelect>(),
}
