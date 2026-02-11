import { DropdownMenu }               from '@kobalte/core/dropdown-menu';
import { useQuery }                   from '@tanstack/solid-query';
import {
    BsChevronDown,
    BsChevronRight
}                                     from 'solid-icons/bs';
import {
    FaSolidArrowTrendDown,
    FaSolidArrowTrendUp,
    FaSolidBiohazard
}                                     from 'solid-icons/fa';
import { IoLockClosed }               from 'solid-icons/io';
import { toast }                      from 'solid-toast';
import LabeledValue                   from '../../../common_components/LabeledValue';
import api                            from '../../../wretch/api';
import { useContextEmployeesManager } from '../context';



export default function EmployeeBio() {
    
    function increaseEmployeeCommissionBy_1() {
        toast('Increasing employee commission by 1%')
    }
    
    
    function decreaseEmployeeCommissionBy_1() {
        toast('Decrease employee commission by 1%')
    }
    
    
    function deactivateEmployee() {
        toast('Deactivating employee')
    }
    
    
    function suspendEmployee() {
        toast('Suspend employee')
    }
    
    
    return <div class={ 'row-start-1 row-span-6 col-start-1 col-span-4 p-4 card' }>
        
        <div class={ 'w-full h-full flex flex-col items-stretch justify-start gap-4' }>
            
            <div class={ 'aspect-square w-full h-auto border-2 border-teal-400/60 rounded-md overflow-hidden' }>
                <img
                        src={ 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }
                        class={ 'w-full h-full object-center object-cover' }
                />
            </div>
            
            <BioData/>
            
            <div class={ 'w-full h-0.5 my-4 bg-teal-400' }/>
            
            <SalaryData/>
            
            <div class={ 'col-start-1 col-span-2 row-span-1 flex flex-col items-stretch justify-end' }>
                <DropdownMenu>
                    <DropdownMenu.Trigger class={ 'p-2 flex flex-row items-center justify-between gap-4 border-2 border-teal-400 bg-teal-200 text-teal-400 rounded hover:border-yellow-400' }>
                        <pre>Actions</pre>
                        <DropdownMenu.Icon>
                            <BsChevronDown size={ 14 }/>
                        </DropdownMenu.Icon>
                    </DropdownMenu.Trigger>
                    
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content class={ 'p-2 flex flex-col items-stretch justify-start gap-1 bg-teal-200 border-2 border-teal-400 rounded-md' }>
                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger
                                        class={ 'p-2 flex flex-row items-center justify-between gap-4 bg-teal-200 border-2 border-teal-400 rounded-md' }
                                >
                                    <pre>User</pre>
                                    <DropdownMenu.Icon>
                                        <BsChevronRight size={ 14 }/>
                                    </DropdownMenu.Icon>
                                </DropdownMenu.SubTrigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.SubContent class={ 'p-2 flex flex-col items-stretch justify-start gap-1 bg-teal-200 border-2 border-teal-400 rounded-md' }>
                                        <DropdownMenu.Item
                                                class={ 'w-full' }
                                                onClick={ deactivateEmployee }
                                        >
                                            <button class={ 'w-full px-2 py-2 flex flex-row items-center justify-start gap-4 hover:bg-red-400 text-red-400 hover:text-white border-2 border-red-400 rounded-md' }>
                                                <FaSolidBiohazard size={ 14 }/>
                                                <pre>
                                                   Deactivate User
                                                </pre>
                                            </button>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item
                                                class={ 'w-full' }
                                                onClick={ suspendEmployee }
                                        >
                                            <button class={ 'w-full px-2 py-2 flex flex-row items-center justify-start gap-4 hover:bg-orange-400 text-orange-400 hover:text-white border-2 border-orange-400 rounded-md' }>
                                                <IoLockClosed size={ 14 }/>
                                                <pre>
                                                    Suspend User
                                                </pre>
                                            </button>
                                        </DropdownMenu.Item>
                                    </DropdownMenu.SubContent>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Sub>
                            <DropdownMenu.Separator class={ 'border-teal-400' }/>
                            
                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger class={ 'p-2 flex flex-row items-center justify-start gap-4 bg-teal-200 border-2 border-teal-400 rounded-md' }>
                                    <pre>Commission</pre>
                                    <DropdownMenu.Icon>
                                        <BsChevronRight size={ 14 }/>
                                    </DropdownMenu.Icon>
                                </DropdownMenu.SubTrigger>
                                
                                <DropdownMenu.Portal>
                                    <DropdownMenu.SubContent class={ 'p-2 flex flex-col items-stretch justify-start gap-1 bg-teal-200 border-2 border-teal-400 rounded-md' }>
                                        <DropdownMenu.Item
                                                class={ 'w-full' }
                                                onClick={ increaseEmployeeCommissionBy_1 }
                                        >
                                            <button class={ 'w-full px-4 py-2 flex flex-row items-center justify-center gap-4 bg-blue-200 hover:bg-blue-400 border-2 border-blue-400 text-blue-400 hover:text-white rounded-md' }>
                                                <FaSolidArrowTrendUp size={ 16 }/>
                                                <pre>
                                                    Increase Commission by 1%
                                    </pre>
                                            </button>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item disabled={ true }>
                                            <pre>Current Commission: { '5'.padStart(
                                                    2,
                                                    '0'
                                            ) }%</pre>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item
                                                class={ 'w-full' }
                                                onClick={ decreaseEmployeeCommissionBy_1 }
                                        >
                                            <button class={ 'w-full px-4 py-2 flex flex-row items-center justify-center gap-4 bg-blue-200 hover:bg-blue-400 border-2 border-blue-400 text-blue-400 hover:text-white rounded-md' }>
                                                <FaSolidArrowTrendDown size={ 16 }/>
                                                <pre>
                                                    Increase Commission by 1%
                                    </pre>
                                            </button>
                                        </DropdownMenu.Item>
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


function BioData() {
    const { getSelectedEmployeeId } = useContextEmployeesManager()
    const query_EmployeeProfile     = useQuery(() => {
        return {
            queryKey: [
                'employee',
                getSelectedEmployeeId()
            ],
            queryFn : async () => {
                return await api.EmployeeApi.getProfile(getSelectedEmployeeId())
            }
        }
    })
    return (<
                    div
                    class={ 'w-full h-fit col-start-1 col-span-2 row-start-5 row-span-3 grid grid-cols-2 auto-rows-fr gap-4' }
            >
                < div
                        class={ 'col-start-1 col-span-1 row-start-1 row-span-1' }
                >< LabeledValue
                        label={ 'Full Name' }
                        value={ `${ query_EmployeeProfile.data?.employee_first_name ?? 'Not-Set' } ${ query_EmployeeProfile.data?.employee_last_name ?? 'Not-Set' }` }
                />
                </div>
                <div class={ 'col-start-2 col-span-1 row-start-1 row-span-1' }>
                    <LabeledValue
                            label={ 'Joined Date' }
                            value={ query_EmployeeProfile.data !== undefined
                                    ? new Date(query_EmployeeProfile.data.employee_registration_date).toLocaleDateString()
                                    : 'Not-Set' }
                    />
                </div>
                
                <div class={ 'col-start-1 col-span-1 row-start-2 row-span-1' }>
                    <LabeledValue
                            label={ 'NIC Number' }
                            value={ query_EmployeeProfile.data?.employee_nic_number && query_EmployeeProfile.data.employee_nic_number.length > 0
                                    ? query_EmployeeProfile.data.employee_nic_number
                                    : 'Not-Set' }
                    />
                </div>
                <div class={ 'col-start-2 col-span-1 row-start-2 row-span-1' }>
                    <LabeledValue
                            label={ 'Service Area' }
                            value={ query_EmployeeProfile.data?.employee_active_territory ?? 'Not-Set' }
                    />
                </div>
                
                <div class={ 'col-start-1 col-span-1 row-start-3 row-span-1' }>
                    <LabeledValue
                            label={ 'Phone' }
                            value={ query_EmployeeProfile.data?.employee_phone ?? 'Not-Set' }
                    />
                </div>
            </div>
    
    )
}


function SalaryData() {
    const { getSelectedEmployeeId } = useContextEmployeesManager()
    
    const query_EmployeeSalaryProfile = useQuery(() => {
        return {
            queryKey: [
                'employee',
                'salary-profile',
                getSelectedEmployeeId()
            ],
            queryFn : async () => {
                return await api.EmployeeSalaryApi.getEmployeeProfile(getSelectedEmployeeId())
            },
            enabled : false
        }
    })
    
    const query_EmployeePaidSalaries = useQuery(() => {
        return {
            queryKey: [
                'employee',
                'salaries',
                getSelectedEmployeeId()
            ],
            queryFn : async () => {
                return await api.EmployeeSalaryApi.getPaidSalaries(getSelectedEmployeeId());
            },
            enabled : false
        }
    })
    
    return (<div class={ 'w-full h-fit grid grid-cols-2 auto-rows-fr gap-4' }>
        <div class={ 'col-start-1 col-span-2 row-start-1 row-span-1' }>
            <LabeledValue
                    label={ 'Account Number' }
                    // TODO FIX THIS
                    value={ !!query_EmployeeSalaryProfile.data
                            ? 'Not-Set'
                            : 'Not-Set' }
            
            />
        </div>
        <div class={ 'col-start-2 col-span-1 row-start-1 row-span-1' }>
            <LabeledValue
                    label={ 'Last Salary' }
                    value={ query_EmployeePaidSalaries.data && query_EmployeePaidSalaries.data.length > 0
                            ? query_EmployeePaidSalaries.data[0].employee_salary_amount
                            : 'Not-Set' }
            
            />
        </div>
        <div class={ 'col-start-1 col-span-1 row-start-2 row-span-1' }>
            <LabeledValue
                    label={ 'Current Commission' }
                    value={ query_EmployeeSalaryProfile.data?.employee_salary_profile_commission_percentage ?? 'Not-Set' }
            
            />
        </div>
        <div class={ 'col-start-1 col-span-1 row-start-3 row-span-1' }>
            <LabeledValue
                    label={ 'Current Base' }
                    value={ query_EmployeeSalaryProfile.data?.employee_salary_profile_base ?? 'Not-Set' }
            
            />
        </div>
    </div>)
}