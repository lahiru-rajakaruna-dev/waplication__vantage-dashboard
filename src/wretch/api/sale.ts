import { TSaleData }      from '../../schemas';
import { wretchInstance } from '../index';





export const SaleApi = {
    // Create new sale
    create: (data: TSaleData) =>
        wretchInstance
            .url('/sale')
            .post(data)
            .json(),
    
    // Get sale profile
    getProfile: (saleId: string) =>
        wretchInstance
            .url(`/sale/${ saleId }`)
            .get()
            .json(),
    
    // Get all sales for organization
    getAll: () =>
        wretchInstance
            .url('/sale/organization')
            .get()
            .json(),
    
    // Get sales by employee
    getByEmployee: (employeeId: string) =>
        wretchInstance
            .url(`/sale/employee/${ employeeId }`)
            .get()
            .json(),
    
    // Get sales by item
    getByItem: (itemId: string) =>
        wretchInstance
            .url(`/sale/item/${ itemId }`)
            .get()
            .json(),
    
    // Get sales by client
    getByClient: (clientId: string) =>
        wretchInstance
            .url(`/sale/client/${ clientId }`)
            .get()
            .json(),
    
    // Get sales by date
    getByDate: (date: number) =>
        wretchInstance
            .url(`/sale/date/${ date }`)
            .get()
            .json(),
    
    // Get sales by date range
    getByDateRange: (startDate: number, endDate: number) =>
        wretchInstance
            .url(`/sale/date-range/${ startDate }/${ endDate }`)
            .get()
            .json(),
};

