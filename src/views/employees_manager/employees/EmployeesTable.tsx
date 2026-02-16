import { useQuery }   from '@tanstack/solid-query';
import {
    createColumnHelper,
    createSolidTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel
}                     from '@tanstack/solid-table';
import { createMemo } from 'solid-js';
import GenericTable   from '../../../common_components/Table';
import api            from '../../../wretch/api';
import { Employee }   from '../../../wretch/api/types';



export default function EmployeesTable() {
    const columnBuildHelper = createColumnHelper<Employee>()
    const queryEmployees    = useQuery(() => {
        return {
            queryKey: [ 'employees' ],
            queryFn : async () => {
                return (await api.EmployeeApi.getAll())
            },
        }
    })
    
    const columns = createMemo(() => [
        columnBuildHelper.accessor(
                (row) => `${ row.employee_id }`,
                {
                    id                : 'employee_id',
                    header            : () => <pre>ID</pre>,
                    cell              : (row) => <pre>{ row.getValue() ?? 'not-set' }</pre>,
                    enableColumnFilter: true
                }
        ),
        columnBuildHelper.accessor(
                (row) => `${ row.employee_first_name ?? 'not-registered' } ${ row.employee_last_name ?? 'not-registered' }`,
                {
                    id                : 'employee_name',
                    header            : () => <pre>Name</pre>,
                    sortingFn         : 'text',
                    cell              : (row) => <pre class={ 'px-4' }>{ row.getValue()
                                                                            .toString()
                                                                            .padEnd(
                                                                                    15,
                                                                                    ' '
                                                                            ) }</pre>,
                    enableSorting     : true,
                    enableResizing    : true,
                    enableColumnFilter: true
                }
        ),
        columnBuildHelper.accessor(
                (row) => row.employee_phone,
                {
                    id                : 'employee_phone',
                    header            : () => <pre>Phone</pre>,
                    enableSorting     : true,
                    sortingFn         : 'alphanumeric',
                    cell              : (row) => <pre>{ row.getValue() ?? 'not-set' }</pre>,
                    enableResizing    : true,
                    enableColumnFilter: true
                }
        ),
        columnBuildHelper.accessor(
                (row) => row.employee_active_territory,
                {
                    id                : 'employee_service_area',
                    header            : () => <pre>Area</pre>,
                    enableSorting     : true,
                    sortingFn         : 'text',
                    cell              : (row) => <pre>{ row.getValue()
                                                           ?.toString() ?? 'not-set' }</pre>,
                    enableResizing    : true,
                    enableColumnFilter: true
                }
        ),
        /* columnBuildHelper.accessor((row) => row.employee_sales_this_month, {
         id                : 'employee_sales_this_month',
         header            : () => <pre>Sales</pre>,
         enableSorting     : true,
         sortingFn         : 'basic',
         cell              : (row) => <pre>Rs: { row.getValue().toString().padStart(5, '0') }</pre>,
         enableResizing    : true,
         enableColumnFilter: true
         }),
         columnBuildHelper.accessor(
         (row) => `${ row
         .leaves
         .taken
         .toString()
         .padStart(2, '0')
         } / ${
         row
         .leaves
         .total
         .toString()
         .padStart(2, '0')
         }`,
         {
         id                : 'employee_leaves',
         header            : () => <pre>Leaves</pre>,
         enableSorting     : true,
         sortingFn         : 'text',
         cell              : (row) => <pre>{ row.getValue() }</pre>,
         enableResizing    : true,
         enableColumnFilter: true
         }
         ),
         columnBuildHelper.accessor(
         (row) => `${ row.employee_status }`,
         {
         id                : 'employee_status',
         header            : () => <pre>Status</pre>,
         enableSorting     : true,
         sortingFn         : 'text',
         cell              : (row) => <EmployeeStatusChip status={ row.getValue() as EEmployeeStatus }/>,
         enableResizing    : true,
         enableColumnFilter: true
         }
         ),*/
    ])
    
    const employeesTable = createSolidTable({
                                                get columns() {
                                                    return columns()
                                                },
                                                get data() {
                                                    return queryEmployees.data ?? []
                                                },
                                                getCoreRowModel    : getCoreRowModel(),
                                                getSortedRowModel  : getSortedRowModel(),
                                                getFilteredRowModel: getFilteredRowModel(),
                                                globalFilterFn     : 'includesString',
                                            })
    
    return <GenericTable tanStackTableModel={ employeesTable }/>
}
