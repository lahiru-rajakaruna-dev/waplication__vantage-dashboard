import { wretchInstance } from '../index';





export const EmployeeAttendanceApi = {
    getByEmployee: (employeeId: string) =>
        wretchInstance
            .url(`/employee-attendances/${ employeeId }`)
            .get()
            .json(),
};
