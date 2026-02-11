import { Tabs }                 from '@kobalte/core/tabs'
import { useQuery }             from '@tanstack/solid-query';
import {
    FaSolidPeopleGroup,
    FaSolidUser,
    FaSolidUserGroup
}                               from 'solid-icons/fa';
import {
    createEffect,
    createSignal,
    For
}                               from 'solid-js';
import { toast }                from 'solid-toast';
import api                      from '../../wretch/api';
import { CNTXEmployeesManager } from './context';
import EmployeeDetails          from './employee_details';
import Employees                from './employees';
import SalesGroups              from './sales_groups';



export default function EmployeesManager() {
    const [ getSelectedTab, setSelectedTab ]               = createSignal('sales_groups')
    const [ getSelectedEmployeeId, setSelectedEmployeeId ] = createSignal('')
    
    const queryAllEmployees = useQuery(() => {
        return {
            queryKey: [ 'employees' ],
            queryFn : async () => {
                return api.EmployeeApi.getAll()
            }
        }
    })
    
    createEffect(() => {
        if (!queryAllEmployees.data || queryAllEmployees.data.length <= 0) {
            return
        }
        
        setSelectedEmployeeId(queryAllEmployees.data[0].employee_id)
    })
    
    createEffect(() => {
        console.debug(getSelectedEmployeeId())
    })
    
    return (<CNTXEmployeesManager.Provider
            value={ {
                getSelectedEmployeeId: getSelectedEmployeeId,
                setSelectedEmployeeId: (value: string) => {
                    toast.success('Employee Selected')
                    setSelectedEmployeeId(value)
                }
            } }
    >
        <Tabs
                onChange={ setSelectedTab }
                value={ getSelectedTab() }
                class={ 'w-full h-full max-h-full flex flex-col items-stretch justify-start gap-8 overflow-x-visible' }
        >
            
            <>
                <Tabs.List class={ 'w-full h-fit flex flex-row items-center justify-start transform-3d perspective-origin-top perspective-normal [&>:first-child]:rounded-l-sm [&>:last-child]:rounded-r-sm' }>
                    <For
                            each={ [
                                {
                                    id   : 'sales_groups',
                                    title: 'Sales Groups',
                                    icon : () => <FaSolidPeopleGroup/>
                                },
                                {
                                    id   : 'employees_manager',
                                    title: 'All Employees',
                                    icon : () => <FaSolidUserGroup/>
                                },
                                {
                                    id   : 'employee_details',
                                    title: 'Employee Details',
                                    icon : () => <FaSolidUser/>
                                },
                            ] }
                    >
                        
                        { (item) => (<Tabs.Trigger
                                value={ item.id }
                                title={ item.title }
                                class={ `w-full h-full px-4 py-3 flex flex-row items-center justify-center gap-3 ${ item.id === getSelectedTab()
                                                                                                                    ? 'bg-yellow-200/80 translate-z-3 shadow-[2px_2px_4px_2px]'
                                                                                                                    : 'bg-teal-400/30' } hover:bg-yellow-300/30 border-2 border-transparent hover:border-teal-300/10 hover:shadow-[2px_2px_4px_2px] shadow-teal-900/10 backdrop-blur-sm hover:translate-z-3 transition-all duration-300 ease-out` }
                        >
                            { item.icon() }
                            { item.title }
                        </Tabs.Trigger>) }
                    </For>
                </Tabs.List>
            </>
            <>
                <Tabs.Content
                        value={ 'sales_groups' }
                        class={ 'w-full max-w-full h-full overflow-y-scroll overflow-x-visible' }
                >
                    <SalesGroups/>
                </Tabs.Content>
                <Tabs.Content
                        value={ 'employees_manager' }
                        class={ 'w-full max-w-full h-full overflow-y-scroll overflow-x-visible' }
                >
                    <Employees/>
                </Tabs.Content>
                <Tabs.Content
                        value={ 'employee_details' }
                        class={ 'w-full max-w-full h-full overflow-y-scroll overflow-x-visible' }
                >
                    <EmployeeDetails/>
                </Tabs.Content>
            </>
        </Tabs>
    </CNTXEmployeesManager.Provider>)
}


