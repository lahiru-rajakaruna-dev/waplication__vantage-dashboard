import {
    createColumnHelper,
    createSolidTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel
}                      from '@tanstack/solid-table';
import {createMemo}    from 'solid-js';
import GenericTable    from '../../common_components/Table';
import {TClientSelect} from '../../schemas';
import {DropdownMenu}  from '@kobalte/core/dropdown-menu'





export default function ClientsManager() {
    const columnBuilder = createColumnHelper<TClientSelect>()
    const clientsTableColumns = createMemo(() => ([
        columnBuilder.accessor(
                'client_name',
                {
                    header            : () => <pre>Name</pre>,
                    cell              : (cellContext) => <pre>{cellContext.getValue()}</pre>,
                    enableColumnFilter: true,
                    enableSorting     : true
                }
        ),
        columnBuilder.accessor(
                'client_phone',
                {
                    header            : () => <pre>Phone</pre>,
                    cell              : (cellContext) => <pre>{cellContext.getValue()}</pre>,
                    enableColumnFilter: true,
                    enableSorting     : true
                }
        ),
        columnBuilder.accessor(
                'client_email',
                {
                    header            : () => <pre>Email</pre>,
                    cell              : (cellContext) => <pre>{cellContext.getValue()}</pre>,
                    enableColumnFilter: true,
                    enableSorting     : true
                }
        ),
        columnBuilder.accessor(
                'client_account_status',
                {
                    header            : 'Status',
                    cell              : (cellContext) => <pre>cellContext.getValue()</pre>,
                    enableColumnFilter: true,
                    enableSorting     : true
                }
        ),
        columnBuilder.display({
                                  id    : 'quick-actions',
                                  header: () => <pre>Quick Actions</pre>,
                                  cell  : (cellContext) => <DropdownMenu></DropdownMenu>
                              })
    ]))

    const ClientsTable = createSolidTable<TClientSelect>({
                                                             get columns() {
                                                                 return clientsTableColumns()
                                                             },
                                                             data               : [],
                                                             getCoreRowModel    : getCoreRowModel(),
                                                             getSortedRowModel  : getSortedRowModel(),
                                                             getFilteredRowModel: getFilteredRowModel()
                                                         })

    return GenericTable<TClientSelect>({
                                           idProperty        : 'client_id',
                                           onRowClick        : (id) => console.log(id),
                                           tanStackTableModel: ClientsTable
                                       })
}