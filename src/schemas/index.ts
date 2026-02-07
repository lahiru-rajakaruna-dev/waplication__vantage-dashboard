import { z } from 'zod';

// ==========================
// ENUM DEFINITIONS
// ==========================

export const EOrganizationStatus = z.enum([ 'ACTIVE', 'DEACTIVATED', 'SUSPENDED', 'TRIAL' ]);
export const ESubscriptionStatus = z.enum([ 'VALID', 'EXPIRED' ]);
export const EEmployeeStatus     = z.enum([ 'ON_FIELD', 'ON_LEAVE', 'SUSPENDED', 'FIRED', 'NOT_REPORTED' ]);
export const EAccountStatus      = z.enum([ 'ACTIVE', 'DEACTIVATED', 'UNVERIFIED' ]);
export const EPaymentStatus      = z.enum([ 'PENDING', 'PAID', 'VERIFIED', 'REFUNDED' ]);
export const EActivityType       = z.enum([
                                              'CHECK_IN',
                                              'CHECK_OUT',
                                              'SALE_CREATED',
                                              'PAYMENT_RECEIVED',
                                              'CLIENT_VISIT',
                                              'MEETING',
                                              'BREAK_START',
                                              'BREAK_END',
                                              'OTHER'
                                          ]);
export const EActivityStatus     = z.enum([ 'ACTIVE', 'ARCHIVED', 'DELETED' ]);

// ==========================
// ORGANIZATIONS
// ==========================

export const SchemaInsertOrganization = z.object({
                                                     organization_id                   : z.string().uuid(),
                                                     organization_admin_id             : z.string().uuid(),
                                                     organization_stripe_customer_id   : z.string(),
                                                     organization_name                 : z.string().min(2).max(100),
                                                     organization_admin_email          : z.string().email(),
                                                     organization_admin_phone          : z.string(),
                                                     organization_logo_url             : z.string().url(),
                                                     organization_registration_date    : z.number().int().positive(),
                                                     organization_subscription_end_date: z.number().int().positive(),
                                                     organization_status               : EOrganizationStatus.default(
                                                         'ACTIVE'),
                                                     organization_subscription_status  : ESubscriptionStatus.default(
                                                         'VALID'),
                                                 });

export const SchemaOrganizationData = SchemaInsertOrganization.omit({
                                                                        organization_id                : true,
                                                                        organization_admin_id          : true,
                                                                        organization_stripe_customer_id: true,
                                                                    });

export const SchemaUpdateOrganization = SchemaInsertOrganization
    .omit({
              organization_id                : true,
              organization_admin_id          : true,
              organization_stripe_customer_id: true,
              organization_registration_date : true,
          })
    .partial();

export const SchemaSelectOrganization = SchemaInsertOrganization;

export type TOrganizationInsert = z.infer<typeof SchemaInsertOrganization>;
export type TOrganizationData = z.infer<typeof SchemaOrganizationData>;
export type TOrganizationUpdate = z.infer<typeof SchemaUpdateOrganization>;
export type TOrganizationSelect = z.infer<typeof SchemaSelectOrganization>;

// ==========================
// EMPLOYEES
// ==========================

export const SchemaEmployeeInsert = z.object({
                                                 employee_id                 : z.string().uuid(),
                                                 employee_organization_id    : z.string().uuid(),
                                                 employee_sales_group_id     : z.string().uuid().optional(),
                                                 employee_profile_picture_url: z.string().url().optional(),
                                                 employee_first_name         : z.string().min(1).max(50),
                                                 employee_last_name          : z.string().min(1).max(50),
                                                 employee_phone              : z.string(),
                                                 employee_nic_number         : z.string(),
                                                 employee_active_territory   : z.string().optional(),
                                                 employee_registration_date  : z.number().int().positive(),
                                                 employee_status             : EEmployeeStatus.default('NOT_REPORTED'),
                                             });

export const SchemaEmployeeData = SchemaEmployeeInsert.omit({
                                                                employee_id             : true,
                                                                employee_organization_id: true,
                                                            });

export const SchemaEmployeeUpdate = SchemaEmployeeInsert
    .omit({
              employee_id               : true,
              employee_organization_id  : true,
              employee_registration_date: true,
          })
    .partial();

export const SchemaEmployeeSelect = SchemaEmployeeInsert;

export type TEmployeeInsert = z.infer<typeof SchemaEmployeeInsert>;
export type TEmployeeData = z.infer<typeof SchemaEmployeeData>;
export type TEmployeeUpdate = z.infer<typeof SchemaEmployeeUpdate>;
export type TEmployeeSelect = z.infer<typeof SchemaEmployeeSelect>;

// ==========================
// EMPLOYEES ATTENDANCES
// ==========================

export const SchemaEmployeeAttendanceInsert = z.object({
                                                           employee_attendance_id                : z.string().uuid(),
                                                           employee_attendance_employee_id       : z.string().uuid(),
                                                           employee_attendance_organization_id   : z.string().uuid(),
                                                           employee_attendance_year              : z.number().int().min(
                                                               2000).max(2100),
                                                           employee_attendance_month             : z.number().int().min(
                                                               1).max(12),
                                                           employee_attendance_total_reported    : z.number().int().min(
                                                               0).default(0),
                                                           employee_attendance_total_non_reported: z.number().int().min(
                                                               0).default(0),
                                                           employee_attendance_total_half_days   : z.number().int().min(
                                                               0).default(0),
                                                           employee_attendance_total_day_offs    : z.number().int().min(
                                                               0).default(0),
                                                       });

export const SchemaEmployeeAttendanceData = SchemaEmployeeAttendanceInsert.omit({
                                                                                    employee_attendance_id             : true,
                                                                                    employee_attendance_employee_id    : true,
                                                                                    employee_attendance_organization_id: true,
                                                                                });

export const SchemaEmployeeAttendanceUpdate = SchemaEmployeeAttendanceInsert
    .omit({
              employee_attendance_id             : true,
              employee_attendance_employee_id    : true,
              employee_attendance_organization_id: true,
              employee_attendance_year           : true,
              employee_attendance_month          : true,
          })
    .partial();

export const SchemaEmployeeAttendanceSelect = SchemaEmployeeAttendanceInsert;

export type TEmployeeAttendanceInsert = z.infer<typeof SchemaEmployeeAttendanceInsert>;
export type TEmployeeAttendanceData = z.infer<typeof SchemaEmployeeAttendanceData>;
export type TEmployeeAttendanceUpdate = z.infer<typeof SchemaEmployeeAttendanceUpdate>;
export type TEmployeeAttendanceSelect = z.infer<typeof SchemaEmployeeAttendanceSelect>;

// ==========================
// EMPLOYEES ACTIVITIES
// ==========================

export const SchemaEmployeeActivityInsert = z.object({
                                                         employee_activity_id             : z.string().uuid(),
                                                         employee_activity_employee_id    : z.string().uuid(),
                                                         employee_activity_organization_id: z.string().uuid(),
                                                         employee_activity_type           : EActivityType,
                                                         employee_activity_timestamp      : z.number().int().positive(),
                                                         employee_activity_message        : z.string().min(1).max(500),
                                                         employee_activity_latitude       : z.number().min(-90).max(90).optional(),
                                                         employee_activity_longitude      : z.number().min(-180).max(180).optional(),
                                                         employee_activity_ip_address     : z.ipv4().optional(),
                                                         employee_activity_status         : EActivityStatus.default(
                                                             'ACTIVE'),
                                                         employee_activity_created_at     : z.number().int().positive(),
                                                         employee_activity_updated_at     : z.number().int().positive(),
                                                     });

export const SchemaEmployeeActivityData = SchemaEmployeeActivityInsert.omit({
                                                                                employee_activity_id             : true,
                                                                                employee_activity_employee_id    : true,
                                                                                employee_activity_organization_id: true,
                                                                                employee_activity_created_at     : true,
                                                                                employee_activity_updated_at     : true,
                                                                            });

export const SchemaEmployeeActivityUpdate = SchemaEmployeeActivityInsert
    .omit({
              employee_activity_id             : true,
              employee_activity_employee_id    : true,
              employee_activity_organization_id: true,
              employee_activity_created_at     : true,
          })
    .partial();

export const SchemaEmployeeActivitySelect = SchemaEmployeeActivityInsert;

export type TEmployeeActivityInsert = z.infer<typeof SchemaEmployeeActivityInsert>;
export type TEmployeeActivityData = z.infer<typeof SchemaEmployeeActivityData>;
export type TEmployeeActivityUpdate = z.infer<typeof SchemaEmployeeActivityUpdate>;
export type TEmployeeActivitySelect = z.infer<typeof SchemaEmployeeActivitySelect>;

// ==========================
// EMPLOYEES CREDENTIALS
// ==========================

export const SchemaEmployeeCredentialsInsert = z.object({
                                                            employee_credential_id             : z.string().uuid(),
                                                            employee_credential_employee_id    : z.string().uuid(),
                                                            employee_credential_organization_id: z.string().uuid(),
                                                            employee_credential_username       : z.string().min(3).max(
                                                                50),
                                                            employee_credential_password       : z.string().min(8),
                                                        });

export const SchemaEmployeeCredentialsData = SchemaEmployeeCredentialsInsert.omit({
                                                                                      employee_credential_id             : true,
                                                                                      employee_credential_employee_id    : true,
                                                                                      employee_credential_organization_id: true,
                                                                                  });

export const SchemaEmployeeCredentialsUpdate = SchemaEmployeeCredentialsInsert
    .omit({
              employee_credential_id             : true,
              employee_credential_employee_id    : true,
              employee_credential_organization_id: true,
          })
    .partial();

export const SchemaEmployeeCredentialsSelect = SchemaEmployeeCredentialsInsert;

export type TEmployeeCredentialsInsert = z.infer<typeof SchemaEmployeeCredentialsInsert>;
export type TEmployeeCredentialsData = z.infer<typeof SchemaEmployeeCredentialsData>;
export type TEmployeeCredentialsUpdate = z.infer<typeof SchemaEmployeeCredentialsUpdate>;
export type TEmployeeCredentialsSelect = z.infer<typeof SchemaEmployeeCredentialsSelect>;

// ==========================
// EMPLOYEES SALARIES
// ==========================

export const SchemaEmployeeSalaryInsert = z.object({
                                                       employee_salary_id                   : z.string().uuid(),
                                                       employee_salary_organization_id      : z.string().uuid(),
                                                       employee_salary_employee_id          : z.string().uuid(),
                                                       employee_salary_base                 : z.number().positive(),
                                                       employee_salary_commission_percentage: z.number().int().min(0).max(
                                                           100).default(0),
                                                   });

export const SchemaEmployeeSalaryData = SchemaEmployeeSalaryInsert.omit({
                                                                            employee_salary_id             : true,
                                                                            employee_salary_organization_id: true,
                                                                            employee_salary_employee_id    : true,
                                                                        });

export const SchemaEmployeeSalaryUpdate = SchemaEmployeeSalaryInsert
    .omit({
              employee_salary_id             : true,
              employee_salary_organization_id: true,
              employee_salary_employee_id    : true,
          })
    .partial();

export const SchemaEmployeeSalarySelect = SchemaEmployeeSalaryInsert;

export type TEmployeeSalaryInsert = z.infer<typeof SchemaEmployeeSalaryInsert>;
export type TEmployeeSalaryData = z.infer<typeof SchemaEmployeeSalaryData>;
export type TEmployeeSalaryUpdate = z.infer<typeof SchemaEmployeeSalaryUpdate>;
export type TEmployeeSalarySelect = z.infer<typeof SchemaEmployeeSalarySelect>;

// ==========================
// SALES GROUPS
// ==========================

export const SchemaSalesGroupInsert = z.object({
                                                   sales_group_id             : z.string().uuid(),
                                                   sales_group_organization_id: z.string().uuid(),
                                                   sales_group_name           : z.string().min(2).max(100),
                                                   sales_group_territory      : z.string().min(2).max(100),
                                               });

export const SchemaSalesGroupData = SchemaSalesGroupInsert.omit({
                                                                    sales_group_id             : true,
                                                                    sales_group_organization_id: true,
                                                                });

export const SchemaSalesGroupUpdate = SchemaSalesGroupInsert
    .omit({
              sales_group_id             : true,
              sales_group_organization_id: true,
          })
    .partial();

export const SchemaSalesGroupSelect = SchemaSalesGroupInsert;

export type TSalesGroupInsert = z.infer<typeof SchemaSalesGroupInsert>;
export type TSalesGroupData = z.infer<typeof SchemaSalesGroupData>;
export type TSalesGroupUpdate = z.infer<typeof SchemaSalesGroupUpdate>;
export type TSalesGroupSelect = z.infer<typeof SchemaSalesGroupSelect>;

// ==========================
// ITEMS
// ==========================

export const SchemaItemInsert = z.object({
                                             item_id              : z.string().uuid(),
                                             item_organization_id : z.string().uuid(),
                                             item_name            : z.string().min(2).max(100),
                                             item_stock_unit_count: z.number().int().min(0).default(0),
                                         });

export const SchemaItemData = SchemaItemInsert.omit({
                                                        item_id             : true,
                                                        item_organization_id: true,
                                                    });

export const SchemaItemUpdate = SchemaItemInsert
    .omit({
              item_id             : true,
              item_organization_id: true,
          })
    .partial();

export const SchemaItemSelect = SchemaItemInsert;

export type TItemInsert = z.infer<typeof SchemaItemInsert>;
export type TItemData = z.infer<typeof SchemaItemData>;
export type TItemUpdate = z.infer<typeof SchemaItemUpdate>;
export type TItemSelect = z.infer<typeof SchemaItemSelect>;

// ==========================
// CLIENTS
// ==========================

export const SchemaClientInsert = z.object({
                                               client_id               : z.string().uuid(),
                                               client_organization_id  : z.string().uuid(),
                                               client_name             : z.string().min(2).max(100),
                                               client_nic_number       : z.string(),
                                               client_email            : z.string().email(),
                                               client_phone            : z.string(),
                                               client_account_status   : EAccountStatus.default('UNVERIFIED'),
                                               client_registration_date: z.number().int().positive(),
                                           });

export const SchemaClientData = SchemaClientInsert.omit({
                                                            client_id             : true,
                                                            client_organization_id: true,
                                                        });

export const SchemaClientUpdate = SchemaClientInsert
    .omit({
              client_id               : true,
              client_organization_id  : true,
              client_registration_date: true,
          })
    .partial();

export const SchemaClientSelect = SchemaClientInsert;

export type TClientInsert = z.infer<typeof SchemaClientInsert>;
export type TClientData = z.infer<typeof SchemaClientData>;
export type TClientUpdate = z.infer<typeof SchemaClientUpdate>;
export type TClientSelect = z.infer<typeof SchemaClientSelect>;

// ==========================
// CLIENTS PAYMENTS
// ==========================

export const SchemaClientPaymentInsert = z.object({
                                                      client_payment_id             : z.string().uuid(),
                                                      client_payment_client_id      : z.string().uuid(),
                                                      client_payment_organization_id: z.string().uuid(),
                                                      client_payment_amount         : z.number().positive(),
                                                      client_payment_date           : z.number().int().positive(),
                                                      client_payment_status         : EPaymentStatus.default('PENDING'),
                                                  });

export const SchemaClientPaymentData = SchemaClientPaymentInsert.omit({
                                                                          client_payment_id             : true,
                                                                          client_payment_client_id      : true,
                                                                          client_payment_organization_id: true,
                                                                      });

export const SchemaClientPaymentUpdate = SchemaClientPaymentInsert
    .omit({
              client_payment_id             : true,
              client_payment_client_id      : true,
              client_payment_organization_id: true,
          })
    .partial();

export const SchemaClientPaymentSelect = SchemaClientPaymentInsert;

export type TClientPaymentInsert = z.infer<typeof SchemaClientPaymentInsert>;
export type TClientPaymentData = z.infer<typeof SchemaClientPaymentData>;
export type TClientPaymentUpdate = z.infer<typeof SchemaClientPaymentUpdate>;
export type TClientPaymentSelect = z.infer<typeof SchemaClientPaymentSelect>;

// ==========================
// SALES
// ==========================

export const SchemaSaleInsert = z.object({
                                             sale_id               : z.string().uuid(),
                                             sale_organization_id  : z.string().uuid(),
                                             sale_employee_id      : z.string().uuid(),
                                             sale_client_id        : z.string().uuid(),
                                             sale_client_payment_id: z.string().uuid(),
                                             sale_item_id          : z.string().uuid(),
                                             sale_item_unit_count  : z.number().int().min(1).default(1),
                                             sale_value            : z.number().positive(),
                                             sale_date             : z.number().int().positive(),
                                         });

export const SchemaSaleData = SchemaSaleInsert.omit({
                                                        sale_id             : true,
                                                        sale_organization_id: true,
                                                        sale_employee_id    : true,
                                                    });

export const SchemaSaleUpdate = SchemaSaleInsert
    .omit({
              sale_id               : true,
              sale_organization_id  : true,
              sale_employee_id      : true,
              sale_client_id        : true,
              sale_client_payment_id: true,
              sale_item_id          : true,
          })
    .partial();

export const SchemaSaleSelect = SchemaSaleInsert;

export type TSaleInsert = z.infer<typeof SchemaSaleInsert>;
export type TSaleData = z.infer<typeof SchemaSaleData>;
export type TSaleUpdate = z.infer<typeof SchemaSaleUpdate>;
export type TSaleSelect = z.infer<typeof SchemaSaleSelect>;

// ==========================
// ORGANIZATIONS PAYMENTS
// ==========================

export const SchemaOrganizationPaymentInsert = z.object({
                                                            organization_payment_id             : z.string().uuid(),
                                                            organization_payment_organization_id: z.string().uuid(),
                                                            organization_payment_amount         : z.number().positive(),
                                                            organization_payment_status         : EPaymentStatus.default(
                                                                'VERIFIED'),
                                                            organization_payment_timestamp      : z.number().int().positive(),
                                                        });

export const SchemaOrganizationPaymentData = SchemaOrganizationPaymentInsert.omit({
                                                                                      organization_payment_id             : true,
                                                                                      organization_payment_organization_id: true,
                                                                                  });

export const SchemaOrganizationPaymentUpdate = SchemaOrganizationPaymentInsert
    .omit({
              organization_payment_id             : true,
              organization_payment_organization_id: true,
          })
    .partial();

export const SchemaOrganizationPaymentSelect = SchemaOrganizationPaymentInsert;

export type TOrganizationPaymentInsert = z.infer<typeof SchemaOrganizationPaymentInsert>;
export type TOrganizationPaymentData = z.infer<typeof SchemaOrganizationPaymentData>;
export type TOrganizationPaymentUpdate = z.infer<typeof SchemaOrganizationPaymentUpdate>;
export type TOrganizationPaymentSelect = z.infer<typeof SchemaOrganizationPaymentSelect>;

// ==========================
// SIMPLE COLLECTION
// ==========================

export const Schemas = {
    Organization       : {
        insert: SchemaInsertOrganization,
        data  : SchemaOrganizationData,
        update: SchemaUpdateOrganization,
        select: SchemaSelectOrganization,
    },
    Employee           : {
        insert: SchemaEmployeeInsert,
        data  : SchemaEmployeeData,
        update: SchemaEmployeeUpdate,
        select: SchemaEmployeeSelect,
    },
    EmployeeAttendance : {
        insert: SchemaEmployeeAttendanceInsert,
        data  : SchemaEmployeeAttendanceData,
        update: SchemaEmployeeAttendanceUpdate,
        select: SchemaEmployeeAttendanceSelect,
    },
    EmployeeActivity   : {
        insert: SchemaEmployeeActivityInsert,
        data  : SchemaEmployeeActivityData,
        update: SchemaEmployeeActivityUpdate,
        select: SchemaEmployeeActivitySelect,
    },
    EmployeeCredentials: {
        insert: SchemaEmployeeCredentialsInsert,
        data  : SchemaEmployeeCredentialsData,
        update: SchemaEmployeeCredentialsUpdate,
        select: SchemaEmployeeCredentialsSelect,
    },
    EmployeeSalary     : {
        insert: SchemaEmployeeSalaryInsert,
        data  : SchemaEmployeeSalaryData,
        update: SchemaEmployeeSalaryUpdate,
        select: SchemaEmployeeSalarySelect,
    },
    SalesGroup         : {
        insert: SchemaSalesGroupInsert,
        data  : SchemaSalesGroupData,
        update: SchemaSalesGroupUpdate,
        select: SchemaSalesGroupSelect,
    },
    Item               : {
        insert: SchemaItemInsert,
        data  : SchemaItemData,
        update: SchemaItemUpdate,
        select: SchemaItemSelect,
    },
    Client             : {
        insert: SchemaClientInsert,
        data  : SchemaClientData,
        update: SchemaClientUpdate,
        select: SchemaClientSelect,
    },
    ClientPayment      : {
        insert: SchemaClientPaymentInsert,
        data  : SchemaClientPaymentData,
        update: SchemaClientPaymentUpdate,
        select: SchemaClientPaymentSelect,
    },
    Sale               : {
        insert: SchemaSaleInsert,
        data  : SchemaSaleData,
        update: SchemaSaleUpdate,
        select: SchemaSaleSelect,
    },
    OrganizationPayment: {
        insert: SchemaOrganizationPaymentInsert,
        data  : SchemaOrganizationPaymentData,
        update: SchemaOrganizationPaymentUpdate,
        select: SchemaOrganizationPaymentSelect,
    },
};

export default Schemas;