import { Dialog }    from '@kobalte/core/dialog';
import { Select }    from '@kobalte/core/select';
import {
    useMutation,
    useQuery,
    useQueryClient
}                    from '@tanstack/solid-query';
import { BsDot }     from 'solid-icons/bs';
import {
    FaRegularCircleDot,
    FaSolidSort,
    FaSolidTrash
}                    from 'solid-icons/fa';
import { IoClose }   from 'solid-icons/io';
import {
    createContext,
    createSignal,
    Setter,
    Show,
    useContext
}                    from 'solid-js';
import { toast }     from 'solid-toast';
import PrimaryButton from '../../../common_components/PrimaryButton';
import TextInput     from '../../../common_components/TextInput';
import {
    EEmployeeStatus,
    EmployeeStatusValues,
    TEmployeeSelect,
    TEmployeeUpdate
}                    from '../../../schemas';
import api           from '../../../wretch/api';
import { Employee }  from '../../../wretch/api/types';



const Context_EmployeeUpdate = createContext<{
    getSelectedEmployee: () => TEmployeeSelect | undefined,
    getEmployeeUpdates: () => TEmployeeUpdate | undefined,
    setEmployeeUpdates: Setter<TEmployeeUpdate>
}>({
       getEmployeeUpdates : () => undefined,
       getSelectedEmployee: () => undefined,
       setEmployeeUpdates : (updates: TEmployeeUpdate | ((prevUpdates: TEmployeeUpdate) => TEmployeeUpdate)) => undefined,
   })

export default function Dialog_UpdateEmployee(props: {
    getIsBusy: () => boolean;
    setIsBusy: (state: boolean) => void
    getIsOpen: () => boolean;
    setIsOpen: (state: boolean) => void
}) {
    
    const queryClient                                  = useQueryClient()
    const [ getSelectedEmployee, setSelectedEmployee ] = createSignal<TEmployeeSelect>()
    const [ getEmployeeUpdates, setEmployeeUpdates ]   = createSignal<TEmployeeUpdate>({})
    const query_Employees                              = useQuery(() => {
        return {
            queryKey: [ 'employees' ],
            async queryFn() {
                return await api.EmployeeApi.getAll()
            },
        }
    })
    
    const mutationUpdateEmployee = useMutation(() => {
        return {
            mutationKey: [
                'employee',
                'update',
                getSelectedEmployee()
            ],
            async mutationFn() {
                if (!getSelectedEmployee()) {
                    toast.error('Please Select an Employee to Remove')
                    return
                }
                
                return await api.EmployeeApi.update(
                        getSelectedEmployee()?.employee_id!,
                        getEmployeeUpdates()
                )
            },
            onMutate : async () => {
                props.setIsBusy(true)
                queryClient.setQueryData<string[], string[], Employee[]>(
                        [ 'employees' ],
                        (employees) => {
                            if (!employees || !getSelectedEmployee()) {
                                return
                            }
                            
                            return employees.map((employee) => {
                                if (employee.employee_id !== getSelectedEmployee()!.employee_id) {
                                    return employee
                                }
                                return {
                                    ...employee, ...getEmployeeUpdates()
                                } as Employee
                            })
                        }
                )
            },
            onSettled: async () => {
                props.setIsBusy(false)
            },
            retry    : false,
            onSuccess: async (data) => {
                await queryClient.setQueryData(
                        [ 'employees' ],
                        data
                )
                toast.success('Employee updated')
            },
            onError  : (e) => {
                console.debug(e)
                toast.error('Could not update employee')
                
            }
            
        }
    })
    
    return (<Context_EmployeeUpdate.Provider
            value={ {
                getSelectedEmployee,
                getEmployeeUpdates,
                setEmployeeUpdates
            } }
    >
        
        <Dialog
                open={ props.getIsOpen() }
                onOpenChange={ props.setIsOpen }
        >
            <Dialog.Portal>
                <Dialog.Overlay class={ 'absolute inset-0 w-full h-full bg-teal-400/10 backdrop-blur-xs' }/>
                <div class={ 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6/12 max-w-xl' }>
                    <Dialog.Content class={ 'w-full flex flex-col items-stretch justify-start bg-teal-200 border-2 border-teal-400 rounded-md' }>
                        <div class={ 'flex flex-row items-center justify-between gap-12 border-b-2 border-teal-400' }>
                            <Dialog.Title class={ 'p-4 font-semibold' }>
                                Update Employee
                            </Dialog.Title>
                            <Dialog.CloseButton class={ 'p-4 border-l-2 border-teal-400' }>
                                <IoClose size={ 16 }/>
                            </Dialog.CloseButton>
                        </div>
                        <div class={ 'p-4 flex flex-col items-stretch justify-start gap-2' }>
                            <Select
                                    class={ 'flex flex-col items-stretch justify-start gap-1' }
                                    options={ query_Employees.data?.map((employee) => `${ employee.employee_id.slice(
                                            0,
                                            6
                                    ) }-${ employee.employee_first_name }`) ?? [] }
                                    /*
                                     value={ `${ getSelectedEmployee()?.employee_first_name } ${ getSelectedEmployee()?.employee_last_name }` }
                                     */
                                    placeholder={ 'Select an employee to update' }
                                    itemComponent={ ({ item }) => {
                                        return <Select.Item
                                                item={ item }
                                                class={ 'px-3 py-2 w-full flex flex-row items-center justify-start gap-4 hover:bg-teal-100 rounded-md cursor-pointer' }
                                        >
                                            <Select.ItemLabel class={ 'w-full' }>
                                                <pre>{ item.rawValue }</pre>
                                            </Select.ItemLabel>
                                            <Select.ItemIndicator class={ 'w-8' }>
                                                <FaRegularCircleDot size={ 14 }/>
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    } }
                                    onChange={ (employee_id__first_name) => {
                                        if (!employee_id__first_name) {
                                            return
                                        }
                                        
                                        if (!query_Employees.data) {
                                            return
                                        }
                                        
                                        const selectedEmployee = query_Employees.data.find((employee) => {
                                            return employee.employee_id.slice(
                                                    0,
                                                    6
                                            ) === employee_id__first_name.split('-')[0]
                                        })
                                        
                                        if (!selectedEmployee) {
                                            return
                                        }
                                        
                                        setSelectedEmployee(selectedEmployee)
                                    } }
                            >
                                <Select.Label>
                                    Select an Employee to Update
                                </Select.Label>
                                
                                <Select.Trigger class={ 'px-3 py-2 w-full h-fit flex flex-row items-center justify-between gap-4 bg-teal-200 border-2 border-teal-400 rounded-md' }>
                                    <Select.Value>
                                        { (state) => {
                                            const value = state.selectedOption()
                                            
                                            if (value) {
                                                return <>{ value }</>
                                            }
                                            
                                            return 'No Value'
                                        }
                                        
                                        }
                                    </Select.Value>
                                    <Select.Icon>
                                        <FaSolidSort size={ 14 }/>
                                    </Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content class={ 'p-2 bg-teal-200 border-2 border-teal-400 rounded-md' }>
                                        <Select.Listbox/>
                                    </Select.Content>
                                </Select.Portal>
                            </Select>
                            
                            
                            { getSelectedEmployee()
                              ? <UpdateForm/>
                              : <></> }
                        </div>
                        
                        <div class={ 'p-4 flex flex-col items-stretch' }>
                            <PrimaryButton
                                    onClick={ () => mutationUpdateEmployee.mutate() }
                                    getIsBusy={ props.getIsBusy }
                                    getIsDisabled={ props.getIsBusy }
                            >
                                <PrimaryButton.Icon>
                                    <FaSolidTrash size={ 14 }/>
                                </PrimaryButton.Icon>
                                <PrimaryButton.Label>
                                    <pre>Update Employee</pre>
                                </PrimaryButton.Label>
                            </PrimaryButton>
                        </div>
                    </Dialog.Content>
                </div>
            </Dialog.Portal>
        </Dialog>
    </Context_EmployeeUpdate.Provider>)
}


function UpdateForm() {
    const {
              getSelectedEmployee,
              setEmployeeUpdates
          } = useContext(Context_EmployeeUpdate)
    
    const query_SalesGroups = useQuery(() => {
        return {
            queryKey: [ 'sales_groups' ],
            queryFn : async () => {
                return await api.SalesGroupApi.getAll()
            }
        }
    })
    
    return (<Show
            when={ getSelectedEmployee() }
            fallback={ <div>
                <pre>Select An Employee to Update</pre>
            </div> }
    >
        <div class={ 'p-2 flex flex-row flex-wrap gap-2 gap-y-4 border-2 border-teal-400/60 rounded-md' }>
            { Object.entries(getSelectedEmployee()!)
                    .map((entry) => {
                        const [ key, value ] = entry;
                        
                        let datalist: string[]  = []
                        let isDisabled: boolean = false
                        
                        if (key === 'employee_sales_group_id') {
                            datalist = query_SalesGroups.data?.map((sales_group) => sales_group.sales_group_id) ?? []
                        }
                        if (key === 'employee_id' || key === 'employee_organization_id') {
                            isDisabled = true
                        }
                        if (key === 'employee_status') {
                            datalist = EmployeeStatusValues
                        }
                        
                        return <div class={ 'flex-4/12' }>
                            <TextInput
                                    onChange={ (value) => setEmployeeUpdates((prevUpdates) => {
                                        return {
                                            ...prevUpdates,
                                            [key]: value
                                        }
                                    }) }
                                    inputConfig={ { type: 'text' } }
                                    value={ value?.toString() }
                                    label={ key }
                                    placeholder={ 'Not-Set' }
                                    datalist={ datalist }
                                    isDisabled={ isDisabled }
                            />
                        </div>
                        
                    }) }
        </div>
    </Show>)
}