import { useQuery }                   from '@tanstack/solid-query';
import {
    createColumnHelper,
    createSolidTable,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel
}                                     from '@tanstack/solid-table';
import {
    BsSearch,
    BsSortDown,
    BsSortUp
}                                     from 'solid-icons/bs';
import { TiArrowUnsorted }            from 'solid-icons/ti';
import {
    createEffect,
    createMemo,
    createSignal,
    For,
    Match,
    Show,
    Switch
}                                     from 'solid-js';
import EmployeeStatusChip, {
    EEmployeeStatus
}                                     from '../../../common_components/EmployeeStatusChip';
import { useCNTXAuth }                from '../../../contexts/cntx_auth';
import api                            from '../../../wretch/api';
import { Employee }                   from '../../../wretch/api/types';
import { useContextEmployeesManager } from '../context'



export default function Table() {
    const columnBuildHelper         = createColumnHelper<Employee>()
    const { setSelectedEmployeeId } = useContextEmployeesManager()
    const queryEmployees            = useQuery(() => {
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
    
    const {
              getHeaderGroups,
              getRowModel
          } = createSolidTable({
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
    
    return <table class={ 'w-full h-full flex flex-col items-stretch justify-start overflow-visible' }>
        <thead>
        <For each={ getHeaderGroups() }>
            { (headerGroup) => {
                return <tr class={ 'w-full h-fit flex flex-row items-stretch justify-start bg-teal-200/30 border-2 border-teal-400/60 rounded-t-md [&>*:not(:last-child)]:border-r-1 [&>*]:border-teal-400/60' }>
                    <For each={ headerGroup.headers }>
                        { (header) => {
                            return <th
                                    class={ `flex-1 py-2 px-2 ${ header.column.getCanSort()
                                                                 ? 'cursor-pointer'
                                                                 : undefined } flex flex-col items-center justify-center gap-2` }
                                    style={ { 'min-width': `${ header.getSize() }px` } }
                            >
                                <div
                                        class={ 'flex flex-row items-center justify-start gap-4' }
                                        onClick={ header.column.getToggleSortingHandler() }
                                >
                                    <Switch fallback={ <TiArrowUnsorted/> }>
                                        <Match when={ header.column.getIsSorted() === 'asc' }>
                                            <BsSortDown/>
                                        </Match>
                                        <Match when={ header.column.getIsSorted() === 'desc' }>
                                            <BsSortUp/>
                                        </Match>
                                    </Switch>
                                    { flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                    ) }
                                </div>
                                <div>
                                    <Show when={ header.column.getCanFilter() }>
                                        <ColumnFilter getFilterValue={ header.column.setFilterValue }/>
                                    </Show>
                                </div>
                            </th>
                        } }
                    </For>
                </tr>
            } }
        </For>
        </thead>
        
        <tbody class={ 'flex flex-col items-stretch justify-start bg-teal-200/30 border-x-2 border-b-2 border-teal-400/60 [&>*:not(:last-child)]:border-b-1 [&>*:not(:last-child)]:border-teal-400/60 transform-3d perspective-near perspective-origin-center overflow-visible' }>
        
        <For each={ getRowModel().rows }>
            { (row) => {
                return <tr
                        class={ 'px-2 flex flex-row items-stretch justify-start hover:bg-yellow-200/60 transition-all duration-300 cursor-pointer' }
                        onClick={ () => {
                            setSelectedEmployeeId(row.original.employee_id)
                        } }
                >
                    
                    <For each={ row.getVisibleCells() }>
                        { (cell) => {
                            return <td
                                    class={ 'flex-1 py-2 flex flex-col items-center justify-center text-center' }
                            >
                                { flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                ) }
                            </td>
                        } }
                    </For>
                
                </tr>
            } }
        </For>
        
        </tbody>
    
    </table>
}


function ColumnFilter(props: {
    getFilterValue: (value: string) => void
}) {
    return <div class={ 'w-full h-fit py-0.2 flex flex-row items-center justify-start rounded-sm border-1 border-teal-400/60' }>
        <div class={ 'aspect-square h-full w-auto p-1 border-r-1 border-teal-400/60 bg-teal-200/60' }>
            <BsSearch size={ 12 }/>
        </div>
        <input
                class={ 'w-full h-4 px-0.5 text-sm font-normal outline-none' }
                onInput={ (e) => {
                    props.getFilterValue(e.currentTarget.value)
                } }
        />
    </div>
}