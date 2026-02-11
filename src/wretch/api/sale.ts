import { TSaleData, TSaleSelect } from '../../schemas';
import { wretchInstance }         from '../index';





export const SaleApi = {
    create: (data: TSaleData) => wretchInstance
        .url('/sales')
        .post(data)
        .json(),
    
    getProfile: (saleId: string) => wretchInstance
        .url(`/sales/${ saleId }`)
        .get()
        .json(),
    
    getAll: () => wretchInstance
        .url('/sales/organization')
        .get()
        .json(),
    
    getBySalesGroup: (salesGroupId: string) => wretchInstance
        .url(`sales/sales-group/${ salesGroupId }`)
        .get()
        .json<TSaleSelect[]>(),
    
    getByEmployee: (employeeId: string) => wretchInstance
        .url(`/sales/employee/${ employeeId }`)
        .get()
        .json<TSaleSelect[]>(),
    
    getByItem: (itemId: string) => wretchInstance
        .url(`/sales/item/${ itemId }`)
        .get()
        .json(),
    
    getByClient: (clientId: string) => wretchInstance
        .url(`/sales/client/${ clientId }`)
        .get()
        .json(),
    
    getByDate: (date: number) => wretchInstance
        .url(`/sales/date/${ date }`)
        .get()
        .json(),
    
    getByDateRange: (startDate: number, endDate: number) => wretchInstance
        .url(`/sales/date-range/${ startDate }/${ endDate }`)
        .get()
        .json(),
};

