import { ClientApi }              from './client';
import { ClientPaymentApi }       from './client_payment';
import { EmployeeApi }            from './employee';
import { EmployeeAttendanceApi }  from './employee_attendance';
import { ItemApi }                from './item';
import { OrganizationApi }        from './organization';
import { OrganizationPaymentApi } from './organization_payment';
import { SaleApi }                from './sale';
import { SalesGroupApi }          from './sales_group';





export const Api = {
    organization       : OrganizationApi,
    client             : ClientApi,
    clientPayment      : ClientPaymentApi,
    employee           : EmployeeApi,
    employeeAttendance : EmployeeAttendanceApi,
    item               : ItemApi,
    organizationPayment: OrganizationPaymentApi,
    sale               : SaleApi,
    salesGroup         : SalesGroupApi,
};

/*
 // Type-safe API usage with validation
 export const createApiWithValidation = () => {
 const validateData = <T>(schema: any, data: any): T => {
 const result = schema.safeParse(data);
 if (!result.success) {
 throw new Error(`Validation failed: ${ JSON.stringify(result.error.errors) }`);
 }
 return result.data;
 };
 
 return {
 organization: {
 isRegistered          : OrganizationApi.isRegistered,
 getOrganization       : OrganizationApi.getOrganization,
 register              : (data: TOrganizationData) => {
 const validated = validateData(Schemas.Organization.data, data);
 return OrganizationApi.register(validated);
 },
 updateName            : (data: TOrganizationUpdate) => {
 const validated = validateData(Schemas.Organization.update, data);
 return OrganizationApi.updateName(validated);
 },
 setSubscriptionExpired: OrganizationApi.setSubscriptionExpired,
 setSubscriptionValid  : OrganizationApi.setSubscriptionValid,
 extendSubscription    : OrganizationApi.extendSubscription,
 deactivate            : OrganizationApi.deactivate,
 activate              : OrganizationApi.activate,
 },
 
 client: {
 create              : (data: TClientData) => {
 const validated = validateData(Schemas.Client.data, data);
 return ClientApi.create(validated);
 },
 updateName          : ClientApi.updateName,
 updateNic           : ClientApi.updateNic,
 updatePhone         : ClientApi.updatePhone,
 setStatusActive     : ClientApi.setStatusActive,
 setStatusDeactivated: ClientApi.setStatusDeactivated,
 setStatusUnverified : ClientApi.setStatusUnverified,
 getProfile          : ClientApi.getProfile,
 getAll              : ClientApi.getAll,
 },
 
 clientPayment: {
 create           : (clientId: string, data: TClientPaymentData) => {
 const validated = validateData(Schemas.ClientPayment.data, data);
 return ClientPaymentApi.create(clientId, validated);
 },
 updateAmount     : ClientPaymentApi.updateAmount,
 setStatusPending : ClientPaymentApi.setStatusPending,
 setStatusPaid    : ClientPaymentApi.setStatusPaid,
 setStatusVerified: ClientPaymentApi.setStatusVerified,
 setStatusRefunded: ClientPaymentApi.setStatusRefunded,
 getProfile       : ClientPaymentApi.getProfile,
 getByClient      : ClientPaymentApi.getByClient,
 },
 
 employee: {
 getAll              : EmployeeApi.getAll,
 getBySalesGroup     : EmployeeApi.getBySalesGroup,
 getProfile          : EmployeeApi.getProfile,
 create              : (data: TEmployeeCredentialsData) => {
 const validated = validateData(Schemas.EmployeeCredentials.data, data);
 return EmployeeApi.create(validated);
 },
 updateName          : EmployeeApi.updateName,
 updateNic           : EmployeeApi.updateNic,
 updatePhone         : EmployeeApi.updatePhone,
 addToSalesGroup     : EmployeeApi.addToSalesGroup,
 removeFromSalesGroup: EmployeeApi.removeFromSalesGroup,
 fire                : EmployeeApi.fire,
 suspend             : EmployeeApi.suspend,
 },
 
 employeeAttendance: {
 getByEmployee: EmployeeAttendanceApi.getByEmployee,
 },
 
 item: {
 create     : (data: TItemData) => {
 const validated = validateData(Schemas.Item.data, data);
 return ItemApi.create(validated);
 },
 updateName : ItemApi.updateName,
 updateStock: ItemApi.updateStock,
 getProfile : ItemApi.getProfile,
 getAll     : ItemApi.getAll,
 },
 
 organizationPayment: {
 create           : (amount: number) => OrganizationPaymentApi.create(amount),
 updateAmount     : OrganizationPaymentApi.updateAmount,
 setStatusPending : OrganizationPaymentApi.setStatusPending,
 setStatusPaid    : OrganizationPaymentApi.setStatusPaid,
 setStatusVerified: OrganizationPaymentApi.setStatusVerified,
 setStatusRefunded: OrganizationPaymentApi.setStatusRefunded,
 getProfile       : OrganizationPaymentApi.getProfile,
 getAll           : OrganizationPaymentApi.getAll,
 },
 
 sale: {
 create        : (data: TSaleData) => {
 const validated = validateData(Schemas.Sale.data, data);
 return SaleApi.create(validated);
 },
 getProfile    : SaleApi.getProfile,
 getAll        : SaleApi.getAll,
 getByEmployee : SaleApi.getByEmployee,
 getByItem     : SaleApi.getByItem,
 getByClient   : SaleApi.getByClient,
 getByDate     : SaleApi.getByDate,
 getByDateRange: SaleApi.getByDateRange,
 },
 
 salesGroup: {
 create         : (data: TSalesGroupData) => {
 const validated = validateData(Schemas.SalesGroup.data, data);
 return SalesGroupApi.create(validated);
 },
 updateName     : SalesGroupApi.updateName,
 updateTerritory: SalesGroupApi.updateTerritory,
 delete         : SalesGroupApi.delete,
 getProfile     : SalesGroupApi.getProfile,
 getAll         : SalesGroupApi.getAll,
 },
 };
 };
 */
