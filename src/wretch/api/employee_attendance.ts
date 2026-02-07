import { wretchInstance } from '../index';





export const EmployeeAttendanceApi = {
    // Get employee attendance
    getByEmployee: (employeeId: string) =>
        wretchInstance
            .url(`/employee-attendance/${ employeeId }`)
            .get()
            .json(),
};
