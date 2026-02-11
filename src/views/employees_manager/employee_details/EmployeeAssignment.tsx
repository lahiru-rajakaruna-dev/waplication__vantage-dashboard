import { DropdownMenu }               from '@kobalte/core/dropdown-menu';
import { useQuery }                   from '@tanstack/solid-query';
import {
    BiRegularChevronDown,
    BiRegularChevronRight,
    BiRegularCircle
}                                     from 'solid-icons/bi';
import {
    createEffect,
    createMemo,
    For,
    Show
}                                     from 'solid-js';
import { toast }                      from 'solid-toast';
import formatNumbers                  from '../../../utility/format_numbers';
import api                            from '../../../wretch/api';
import { useContextEmployeesManager } from '../context';



export default function EmployeeAssignment() {
    
    const query_AllSalesGroups = useQuery(() => {
        return {
            queryKey: [
                'sales_groups',
            ],
            queryFn : async () => {
                return await api.SalesGroupApi.getAll();
            }
        }
    })
    
    
    function updateEmployeeSalesGroup() {
        toast('Updating employee sales group...')
    }
    
    
    function updateEmployeeServiceArea() {
        toast('Updating employee service area...')
    }
    
    
    return <div class={ 'row-start-3 row-span-2 col-start-5 col-span-8 card' }>
        
        <div class={ 'w-full h-full flex flex-col items-stretch justify-start' }>
            
            <div class={ 'relative w-full h-full flex flex-row items-stretch justify-between' }>
                <Show
                        when={ false }
                        fallback={
                            <div class={ 'relative flex-1 h-full flex flex-col items-center justify-center border-r-1 border-teal-400' }>
                                <pre class={ 'text-xl font-semibold text-teal-500' }>Feature Not Added</pre>
                            </div> }
                >
                    <ServiceArea/>
                </Show>
                <Show
                        when={ true }
                        fallback={
                            <div class={ 'relative flex-1 h-full flex flex-col items-center justify-center border-r-1 border-teal-400' }>
                                <pre class={ 'text-xl font-semibold text-teal-500' }>
                                    Feature Not Added
                                </pre>
                            </div> }
                >
                    <Contribution/>
                </Show>
            </div>
            
            <div class={ 'w-full h-fit flex flex-row items-center justify-end' }>
                <DropdownMenu>
                    <DropdownMenu.Trigger class={ 'px-4 py-2 flex flex-row items-center justify-start gap-4 rounded-md border-2 border-teal-400 bg-teal-200 text-teal-600 hover:border-yellow-400' }>
                        <pre>Actions</pre>
                        <DropdownMenu.Icon>
                            <BiRegularChevronDown size={ 18 }/>
                        </DropdownMenu.Icon>
                    </DropdownMenu.Trigger>
                    
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content class={ 'flex flex-col items-stretch justify-start gap-1 bg-teal-200 border-2 border-teal-400 rounded-md' }>
                            
                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger class={ 'cursor-pointer' }>
                                    <div class={ 'px-4 py-2 flex flex-row items-center justify-start gap-4 hover:bg-teal-400' }>
                                        <pre>Change Service Area</pre>
                                        <BiRegularChevronRight/>
                                    </div>
                                </DropdownMenu.SubTrigger>
                                
                                <DropdownMenu.Portal>
                                    <DropdownMenu.SubContent class={ 'px-4 py-2 flex flex-col items-stretch justify-start gap-1 bg-teal-200 border-2 border-teal-400 rounded-md' }>
                                        <Show
                                                when={ false }
                                                fallback={ <div>
                                                    <pre>No Service Areas</pre>
                                                </div> }
                                        >
                                            
                                            <DropdownMenu.RadioGroup onChange={ updateEmployeeServiceArea }>
                                                <For
                                                        // TODO FETCH AVAILABLE SERVICE AREAS
                                                        each={ [
                                                            'Moratuwa',
                                                            'Kuliyapitiya',
                                                            'Hambantota',
                                                            'Weligama',
                                                            'Kalmunai',
                                                            'Gampaha',
                                                            'Matara',
                                                        ] }
                                                >
                                                    { (service_area) => {
                                                        return <DropdownMenu.RadioItem
                                                                value={ service_area }
                                                                class={ 'px-4 py-2 flex flex-row items-center justify-start gap-4  rounded-md hover:bg-teal-400 cursor-pointer' }
                                                        >
                                                            <div class={ 'aspect-square w-4 h-auto ' }>
                                                                <DropdownMenu.ItemIndicator class={ '' }>
                                                                    <BiRegularCircle/>
                                                                </DropdownMenu.ItemIndicator>
                                                            </div>
                                                            <pre>{ service_area }</pre>
                                                        </DropdownMenu.RadioItem>
                                                    } }
                                                </For>
                                            </DropdownMenu.RadioGroup>
                                        </Show>
                                    </DropdownMenu.SubContent>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Sub>
                            
                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger class={ 'cursor-pointer' }>
                                    <div class={ 'px-4 py-2 flex flex-row items-center justify-start gap-4 hover:bg-teal-400' }>
                                        <pre>Change Sales Group</pre>
                                        <BiRegularChevronRight/>
                                    </div>
                                </DropdownMenu.SubTrigger>
                                
                                <DropdownMenu.Portal>
                                    <DropdownMenu.SubContent class={ 'px-4 py-2 flex flex-col items-stretch justify-start gap-1 bg-teal-200 border-2 border-teal-400 rounded-md' }>
                                        <Show
                                                when={ query_AllSalesGroups.data && query_AllSalesGroups.data.length > 0 }
                                                fallback={ <div>
                                                    <pre>No Sales Groups</pre>
                                                </div> }
                                        >
                                            
                                            <DropdownMenu.RadioGroup onChange={ updateEmployeeSalesGroup }>
                                                // TODO FETCH AVAILABLE SALES GROUPS
                                                <For
                                                        each={ query_AllSalesGroups.data!.map((sales_group) => sales_group.sales_group_name) }
                                                >
                                                    { (sales_group) => {
                                                        return <DropdownMenu.RadioItem
                                                                value={ sales_group }
                                                                class={ 'px-4 py-2 flex flex-row items-center justify-start gap-4  rounded-md hover:bg-teal-400 cursor-pointer' }
                                                        >
                                                            <div class={ 'aspect-square w-4 h-auto ' }>
                                                                <DropdownMenu.ItemIndicator class={ '' }>
                                                                    <BiRegularCircle/>
                                                                </DropdownMenu.ItemIndicator>
                                                            </div>
                                                            <pre>{ sales_group }</pre>
                                                        </DropdownMenu.RadioItem>
                                                    } }
                                                </For>
                                            </DropdownMenu.RadioGroup>
                                        </Show>
                                    </DropdownMenu.SubContent>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Sub>
                        
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu>
            </div>
        
        </div>
    </div>
}


function ServiceArea() {
    const { getSelectedEmployeeId } = useContextEmployeesManager()
    const query_EmployeeProfile     = useQuery(() => {
        return {
            queryKey: [
                'employee',
                getSelectedEmployeeId()
            ],
            queryFn : async () => {
                return api.EmployeeApi.getProfile(getSelectedEmployeeId())
            }
        }
    })
    
    
    function Icon() {
        return (<svg
                class={ 'absolute top-0 left-0 w-16 h-auto' }
                viewBox='-51.2 -51.2 614.41 614.41'
                xml-space='preserve'
        >
            <g
                    class={ 'stroke-teal-400/80' }
                    id='SVGRepo_tracerCarrier'
                    stroke-linecap='round'
                    stroke-linejoin='round'
            />
            <g id='SVGRepo_iconCarrier'>
                <g transform='translate(0 -1)'>
                    <g>
                        <g>
                            <path
                                    d='M388.89,314.055c-11.435-2.773-22.955,4.373-25.664,15.829c-2.731,11.456,4.373,22.955,15.829,25.664 c66.261,15.723,90.283,38.976,90.283,50.795c0,25.493-85.077,64-213.333,64c-128.235,0-213.333-38.507-213.333-64 c0-11.819,24.043-35.072,90.261-50.795c11.477-2.709,18.56-14.208,15.829-25.664c-2.709-11.456-14.229-18.603-25.664-15.829 C43.717,332.871,0.005,365.639,0.005,406.343c0,70.016,128.811,106.667,256,106.667c127.211,0,256-36.651,256-106.667 C512.005,365.639,468.293,332.871,388.89,314.055z'
                                    class={ 'fill-teal-400/60' }
                            />
                            <path
                                    d='M256.015,171.681c11.776,0,21.333-9.557,21.333-21.333s-9.557-21.333-21.333-21.333s-21.333,9.557-21.333,21.333 S244.239,171.681,256.015,171.681z'
                                    class={ 'fill-teal-400/60' }
                            />
                            <path
                                    d='M228.239,398.518l8.683,17.365c3.627,7.232,11.008,11.797,19.093,11.797s15.467-4.565,19.093-11.797l18.389-36.779 c22.379-44.779,49.984-88.149,76.672-130.091l12.16-19.136c15.061-23.808,23.019-51.307,23.019-79.531 c0-42.496-18.197-83.115-49.92-111.445C323.727,10.592,281.082-2.975,238.565,2.017C172.175,9.569,117.349,63.03,108.154,129.121 c-5.44,39.168,4.352,78.059,27.541,109.547C171.877,287.691,200.122,342.241,228.239,398.518z M256.015,86.347 c35.285,0,64,28.715,64,64c0,35.285-28.715,64-64,64s-64-28.715-64-64C192.015,115.062,220.73,86.347,256.015,86.347z'
                                    class={ 'fill-red-400/60' }
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>)
    }
    
    
    return (<div class={ 'relative flex-1 h-full border-r-1 border-teal-400' }>
        <Icon/>
        <pre class={ 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black' }>
                       {/* TODO FETCH ASSIGNED SERVICE AREA*/ }
            Batticaloa
                    </pre>
        <pre class={ 'absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2' }>
               Assigned Service Area
                     </pre>
    </div>)
}


function Contribution() {
    const { getSelectedEmployeeId } = useContextEmployeesManager()
    
    const query_EmployeeProfile = useQuery(() => {
        return {
            queryKey: [
                'employee',
                getSelectedEmployeeId()
            ],
            queryFn : async () => {
                return api.EmployeeApi.getProfile(getSelectedEmployeeId())
            }
        }
    })
    
    createEffect(() => {
        console.debug(query_EmployeeProfile.data)
    })
    
    const query_SalesGroupProfile = useQuery(() => {
        return {
            queryKey: [
                'sales_group',
                query_EmployeeProfile.data?.employee_sales_group_id
            ],
            queryFn : async () => {
                return api.SalesGroupApi.getProfile(query_EmployeeProfile.data?.employee_sales_group_id!)
            },
            get enabled() {
                return !!query_EmployeeProfile.data?.employee_sales_group_id
            }
        }
    })
    
    const query_SalesGroupSales = useQuery(() => {
        return {
            queryKey: [
                'sales',
                'sales_group',
                query_EmployeeProfile.data?.employee_sales_group_id
            ],
            queryFn : async () => {
                return api.SaleApi.getBySalesGroup(query_EmployeeProfile.data!.employee_sales_group_id!)
            },
            get enabled() {
                return !!query_EmployeeProfile.data?.employee_sales_group_id
            }
        }
    })
    
    const totalSalesGroupValue = createMemo(() => {
        if (!query_SalesGroupSales.data || query_SalesGroupSales.data.length <= 0) {
            return 0
        }
        
        return query_SalesGroupSales.data.reduce(
                (
                        totalSaleValue,
                        currentSale
                ) => {
                    return totalSaleValue + currentSale.sale_value
                },
                0
        )
    })
    
    const totalEmployeeValue = createMemo(() => {
        if (!query_SalesGroupSales.data || query_SalesGroupSales.data.length <= 0) {
            return 0
        }
        
        const employeeSales = query_SalesGroupSales.data.filter((sale) => {
            return sale.sale_employee_id === getSelectedEmployeeId()
        })
        
        if (!employeeSales || employeeSales.length <= 0) {
            return 0
        }
        
        return employeeSales.reduce(
                (
                        totalOfSales,
                        currentSale
                ) => {
                    return totalOfSales + currentSale.sale_value
                },
                0
        )
    })
    
    return (<div class={ 'relative flex-1 pl-4 flex flex-col items-stretch justify-center' }>
                    <pre>
                        <span class={ 'text-sm' }>Sales Group: </span>
                        <br/>
                        <span class={ 'text-lg font-semibold text-v-text-body' }>
                            { query_SalesGroupProfile.data?.sales_group_name ?? 'Not-Set' }
                        </span>
                    </pre>
        <Show
                when={ totalSalesGroupValue() > 0 }
                fallback={
                    <div class={ 'relative flex-1 h-full flex flex-col items-center justify-center border-r-1 border-teal-400' }>
                                <pre class={ 'text-xl font-semibold text-teal-500' }>
                                   No Data to Display Yet
                                </pre>
                    </div> }
        >
            <pre class={ 'absolute top-5/12 left-6/12 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-v-text-body' }>Contribution To Group</pre>
            
            <div class={ 'relative w-full h-9/12' }>
                        <pre class={ 'absolute top-6/12 left-5/12 -translate-x-1/2 -translate-y-1/2 text-5xl font-black' }>
                            {/*// TODO ADD EMPLOYEES CONTRIBUTION TO GROUP*/ }
                            { formatNumbers(totalEmployeeValue())
                                    .padStart(
                                            9,
                                            ' '
                                    ) }
                        </pre>
                <pre class={ 'absolute top-7/12 left-9/12 -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold' }>
                            /
                        </pre>
                <pre class={ 'absolute top-8/12 left-10/12 -translate-x-1/2 -translate-y-1/2' }>
                            { formatNumbers(totalSalesGroupValue())
                                    .padStart(
                                            9,
                                            '0'
                                    ) }
                        </pre>
            </div>
        </Show>
    </div>)
}