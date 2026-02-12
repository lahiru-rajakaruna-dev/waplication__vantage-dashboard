import { useQuery }                            from '@tanstack/solid-query';
import { CgChevronDoubleRight }                from 'solid-icons/cg';
import {
    For,
    Show
}                                              from 'solid-js';
import EmployeeStatusChip, { EEmployeeStatus } from '../../../common_components/EmployeeStatusChip';
import api                                     from '../../../wretch/api';



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
                console.log('Running Sales Group Data Query')
                return await api.SalesGroupApi.getProfile(props.salesGroupId())
            },
            retry  : 3,
            enabled: props.salesGroupId()
                     ? true
                     : false,
        }
    })
    
    return <Show
            when={ querySalesGroupDetails.data && querySalesGroupDetails.data.sales_group_employees }
            fallback={ <div class={ 'w-full h-full bg-red-200 border-2 border-red-400 rounded-md text-red-400' }>
                <pre>Something Errored</pre>
            </div> }
    >
        <For each={ querySalesGroupDetails.data!.sales_group_employees }>
            { (employee) => {
                return <div class={ 'flex flex-row items-center justify-between gap-4 py-3 border-b-2 border-white/60 last:border-transparent' }>
                    <div class={ 'w-fit max-w-4/12 whitespace-nowrap' }>
                    <pre>
                        { `${ member.name.first.padEnd(
                                10,
                                ' '
                        ) } ${ member.name.last.padEnd(
                                10,
                                ' '
                        ) }` }
                    </pre>
                    </div>
                    <div
                            class={ 'w-full' }
                    />
                    <div class={ 'w-fit max-w-2/12' }>
                        <pre> Rs: { member.thisMonthsSales.toString()
                                          .padStart(
                                                  4,
                                                  ' '
                                          ) } </pre>
                    </div>
                    <div class={ 'w-fit max-w-2/12' }>
                        <EmployeeStatusChip
                                status={ member.status as EEmployeeStatus }
                        />
                    </div>
                    <button class={ 'w-1/12' }><CgChevronDoubleRight size={ 18 }/></button>
                </div>
            } }
        </For>
    </Show>
}