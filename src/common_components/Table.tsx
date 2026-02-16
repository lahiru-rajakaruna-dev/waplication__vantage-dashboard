import {
    flexRender,
    Table
}                          from '@tanstack/solid-table';
import {
    BsSearch,
    BsSortDown,
    BsSortUp
}                          from 'solid-icons/bs';
import { TiArrowUnsorted } from 'solid-icons/ti';
import {
    For,
    Match,
    Show,
    Switch
}                          from 'solid-js';



type EntityType = {
    [key: string]: string | number | EntityType
}

export default function GenericTable<T extends EntityType>(props: {
    tanStackTableModel: Table<T>,
    idProperty: string,
    onRowClick: (recordId: string) => void
}) {
    return (<table class={ 'w-full h-full flex flex-col items-stretch justify-start overflow-visible' }>
        <thead>
        <For each={ props.tanStackTableModel.getHeaderGroups() }>
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
        
        <For each={ props.tanStackTableModel.getRowModel().rows }>
            { (row) => {
                return <tr
                        class={ 'px-2 flex flex-row items-stretch justify-start hover:bg-yellow-200/60 transition-all duration-300 cursor-pointer' }
                        onClick={ () => {
                            props.onRowClick(row.original[props.idProperty] as string)
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
    </table>)
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
