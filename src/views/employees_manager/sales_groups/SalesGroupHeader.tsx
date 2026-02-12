import { useQuery }      from '@tanstack/solid-query';
import { FaSolidUsers }  from 'solid-icons/fa';
import { OcChevrondown } from 'solid-icons/oc';
import {
    createMemo,
    Show
}                        from 'solid-js';
import api               from '../../../wretch/api';



export default function SalesGroupHeader(props: {
    sales_group_id: string,
    sales_group_name: string,
}) {
    const query_SalesGroupEmployees = useQuery(() => {
        return {
            queryKey: [
                'sales_group',
                'employees',
                props.sales_group_id
            ],
            queryFn : async () => {
                return api.EmployeeApi.getBySalesGroup(props.sales_group_id)
            }
        }
    })
    
    const activeMembers = createMemo(() => {
        if (!query_SalesGroupEmployees.data || query_SalesGroupEmployees.data.length <= 0) {
            return []
        }
        
        return query_SalesGroupEmployees.data.filter((employee) => {
            return employee.employee_status === 'ON_FIELD'
        })
    })
    
    return (<div class={ 'w-full h-fit px-3 py-3 flex flex-row item-center justify-between gap-12' }>
        <div class={ 'w-fit max-w-2/12 font-semibold text-left text-v-text-body' }>
            <pre>{ props.sales_group_name.padEnd(
                    20,
                    ' '
            ) }</pre>
        </div>
        <div class={ 'w-full' }/>
        <div class={ 'w-fit max-w-3/12 flex flex-row item-center justify-end gap-1' }>
            <div class={ 'w-full h-full flex flex-row items-center justify-start gap-2' }>
                <FaSolidUsers size={ 18 }/>
                <Show
                        when={ query_SalesGroupEmployees.data && query_SalesGroupEmployees.data.length > 0 }
                        fallback={ <div>
                        <pre>
                            No Data
                        </pre>
                        </div> }
                >
                    <div class={ 'flex flex-row items-center justify-start gap-1' }>
                <pre>
                        { activeMembers()
                                .length
                                .toString()
                                .padStart(
                                        3,
                                        '0'
                                ) }
                    </pre>
                        <div>/</div>
                        <pre>
                        { query_SalesGroupEmployees.data.length.toString()
                                                   .padStart(
                                                           3,
                                                           '0'
                                                   ) }
                    </pre>
                    </div>
                </Show>
            </div>
        </div>
        <div class={ 'w-fit max-w-2/12 text-left whitespace-nowrap flex flex-col items-stretch justify-center' }>
                    <pre class={ 'font-semibold' }>
{/*
 { `Rs: ${ props.sales_group_sales.last_month.toString()
 .padStart(
 6,
 '0'
 ) }` }
 
 */ }
                        50,000
                    </pre>
            <pre class={ 'text-sm font-semibold text-v-text-body' }>
{/*
 { `Rs: ${ props.sales_group_sales.this_month.toString()
 .padStart(
 6,
 '0'
 ) }` }
 */ }
                87,000
                    </pre>
        </div>
        
        <div class={ 'w-fit max-w-2/12 flex flex-col item-start justify-center gap-1 text-start' }>
             <pre class={ 'text-v-text-main font-semibold' }>
                 { `This Month(x1K): ${ (525).toString()
                                             .padStart(
                                                     3,
                                                     '0'
                                             ) }/=` }
             </pre>
            <pre class={ 'text-sm font-semibold text-v-text-body' }>
                { `Last Month(x1K): ${ (500).toString()
                                            .padStart(
                                                    3,
                                                    '0'
                                            ) }/=` }
            </pre>
        </div>
        
        <div class={ 'w-fit max-w-1/12 flex flex-col item-center justify-end' }>
            <OcChevrondown/>
        </div>
    </div>)
}