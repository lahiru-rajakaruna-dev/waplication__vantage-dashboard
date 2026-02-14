import { useQuery }       from '@tanstack/solid-query';
import {
    createMemo,
    For,
    Show
}                         from 'solid-js';
import EmployeeStatusChip from '../../../common_components/EmployeeStatusChip';
import {
    Enum_EmployeeStatus,
    TEmployeeSelect,
    TSaleSelect
}                         from '../../../schemas';
import api                from '../../../wretch/api';



export default function SalesGroupDetails(props: {
    salesGroupId: () => string
}) {
    const querySalesGroupDetails = useQuery(() => {
        return {
            queryKey: [
                'sales_group',
                'details',
                props.salesGroupId()
            ],
            async queryFn() {
                return await api.SalesGroupApi.getProfile(props.salesGroupId())
            },
            enabled: props.salesGroupId()
                     ? true
                     : false,
        }
    })
    
    return <Show
            when={ querySalesGroupDetails.data && querySalesGroupDetails.data.employees }
            fallback={ <div class={ 'w-full h-full bg-red-200 border-2 border-red-400 rounded-md text-red-400' }>
                <pre>Something Errored</pre>
            </div> }
    >
        <For each={ querySalesGroupDetails.data!.employees }>
            { (employee) => {
                return <EmployeeRow employee={ employee }/>
            } }
        </For>
    </Show>
}


function EmployeeRow(props: {
    employee: TEmployeeSelect & {
        sales: TSaleSelect[]
    }
}) {
    
    const thisMonthsSales = createMemo(() => {
        if (!props.employee) {
            return []
        }
        
        return props.employee.sales.filter((sale) => {
            const thisMonth = new Date(Date.now()).getMonth()
            const saleMonth = new Date(sale.sale_date).getMonth()
            
            return saleMonth === thisMonth
        })
        
    })
    
    return <div class={ 'flex flex-row items-center justify-between gap-4 py-3 border-b-2 border-white/60 last:border-transparent' }>
        <div class={ 'w-fit max-w-4/12 whitespace-nowrap' }>
                    <pre>
                        { `${ props.employee.employee_first_name?.padEnd(
                                10,
                                ' '
                        ) } ${ props.employee.employee_last_name?.padEnd(
                                10,
                                ' '
                        ) }` }
                    </pre>
        </div>
        <div
                class={ 'w-full' }
        />
        <div class={ 'w-fit max-w-2/12' }>
                        <pre> Rs: { thisMonthsSales()
                                .reduce(
                                        (
                                                totalValue,
                                                currentSale
                                        ) => {
                                            return totalValue + currentSale.sale_value
                                        },
                                        0
                                )
                                .toString()
                                .padStart(
                                        4,
                                        ' '
                                ) } </pre>
        </div>
        <div class={ 'w-fit max-w-2/12' }>
            <EmployeeStatusChip
                    status={ props.employee.employee_status as Enum_EmployeeStatus }
            />
        </div>
        {/*<button class={ 'w-1/12' }><CgChevronDoubleRight size={ 18 }/></button>*/ }
    </div>
}