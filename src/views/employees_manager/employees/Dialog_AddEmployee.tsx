import { Dialog }          from '@kobalte/core/dialog';
import {
    useMutation,
    useQueryClient
}                          from '@tanstack/solid-query';
import { FaSolidUserPlus } from 'solid-icons/fa';
import { IoClose }         from 'solid-icons/io';
import { createSignal }    from 'solid-js';
import { toast }           from 'solid-toast';
import PrimaryButton       from '../../../common_components/PrimaryButton';
import TextInput           from '../../../common_components/TextInput';
import api                 from '../../../wretch/api';
import { Employee }        from '../../../wretch/api/types';



export default function Dialog_AddEmployee(props: {
    getIsBusy: () => boolean,
    setIsBusy: (state: boolean) => void,
    getIsOpen: () => boolean,
    setIsOpen: (state: boolean) => void
}) {
    let timeOutId: NodeJS.Timeout;
    const [ getNewEmployeeUsername, setNewEmployeeUsername ] = createSignal('')
    const [ getNewEmployeePassword, setNewEmployeePassword ] = createSignal('')
    
    const queryClient            = useQueryClient()
    const addNewEmployeeMutation = useMutation(() => {
        return {
            mutationKey: [
                'employee',
                'add'
            ],
            async mutationFn() {
                return await api.EmployeeApi.create({
                                                        employee_credential_username: getNewEmployeeUsername()
                                                                .toString(),
                                                        employee_credential_password: getNewEmployeePassword()
                                                                .toString()
                                                    })
            },
            onMutate : async () => {
                props.setIsBusy(true)
                queryClient.setQueryData<unknown, string[], Employee[]>(
                        [ 'employees' ],
                        (currentEmployees) => {
                            if (currentEmployees && currentEmployees.length) {
                                return [
                                    ...(currentEmployees as Array<any>),
                                    {
                                        employee_id      : 'temp-employee-1',
                                        employee_username: getNewEmployeeUsername(),
                                        employee_phone   : 'no-set',
                                    }
                                ]
                            }
                            
                            return [
                                {
                                    employee_id      : 'temp-employee-1',
                                    employee_username: getNewEmployeeUsername(),
                                    employee_phone   : 'no-set',
                                }
                            ]
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
                toast.success('New Employee Added',)
            }
            
        }
    })
    
    return (<Dialog
            open={ props.getIsOpen() }
            onOpenChange={ props.setIsOpen }
    >
        <Dialog.Portal>
            <Dialog.Overlay class={ 'bg-teal-400/30' }/>
            <div class={ 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' }>
                <Dialog.Content class={ 'flex flex-col items-stretch justify-start bg-teal-200 border-2 border-teal-400 rounded-md' }>
                    <div class={ 'flex flex-row items-center justify-between gap-12 border-b-2 border-teal-400' }>
                        <Dialog.Title class={ 'p-4 font-semibold' }>
                            Add New Employee
                        </Dialog.Title>
                        <Dialog.CloseButton class={ 'p-4 border-l-2 border-teal-400' }>
                            <IoClose size={ 16 }/>
                        </Dialog.CloseButton>
                    </div>
                    <div class={ 'p-4 flex flex-col items-stretch justify-start gap-2' }>
                        {/*<Select*/ }
                        {/*        class={ 'flex flex-col items-stretch justify-start gap-1' }*/ }
                        {/*        options={ [*/ }
                        {/*            'Mannar',*/ }
                        {/*            'Hambantota',*/ }
                        {/*            'Kurunegala',*/ }
                        {/*            'Kalmunai',*/ }
                        {/*            'Kuliyapitiya',*/ }
                        {/*            'Moratuwa',*/ }
                        {/*            'Kalmunai',*/ }
                        {/*            'Maharagama',*/ }
                        {/*            'Sri Jayawardenepura Kotte',*/ }
                        {/*            'Dehiwala-mount Lavinia'*/ }
                        {/*        ] }*/ }
                        {/*        placeholder={ <pre>Select A Territory</pre> }*/ }
                        {/*        itemComponent={ (props) => {*/ }
                        {/*            return <Select.Item*/ }
                        {/*                    item={ props.item }*/ }
                        {/*                    class={ 'px-3 py-2 flex flex-row items-center justify-start gap-4 hover:bg-teal-100 rounded-md cursor-pointer' }*/ }
                        {/*            >*/ }
                        {/*                <Select.ItemLabel>*/ }
                        {/*                    <pre>{ props.item.textValue }</pre>*/ }
                        {/*                </Select.ItemLabel>*/ }
                        {/*                <Select.ItemIndicator>*/ }
                        {/*                    <BsDot size={ 14 }/>*/ }
                        {/*                </Select.ItemIndicator>*/ }
                        {/*            </Select.Item>*/ }
                        {/*        } }*/ }
                        {/*        onChange={ (value) => {*/ }
                        {/*            if (!value) {*/ }
                        {/*                return*/ }
                        {/*            }*/ }
                        {/*            */ }
                        {/*            setNewEmployeePassword(value)*/ }
                        {/*        } }*/ }
                        {/*>*/ }
                        {/*    <Select.Label>*/ }
                        {/*        Assign a Territory*/ }
                        {/*    </Select.Label>*/ }
                        {/*    <Select.Trigger class={ 'px-3 py-2 w-full h-fit flex flex-row items-center justify-between gap-4 bg-teal-200 border-2 border-teal-400 rounded-md' }>*/ }
                        {/*        <Select.Value>*/ }
                        {/*            { (state) => {*/ }
                        {/*                const value = state.selectedOption()*/ }
                        {/*                if (value) {*/ }
                        {/*                    return <>{ value }</>*/ }
                        {/*                }*/ }
                        {/*                return <>No Value</>*/ }
                        {/*            }*/ }
                        {/*            */ }
                        {/*            }*/ }
                        {/*        </Select.Value>*/ }
                        {/*        <Select.Icon>*/ }
                        {/*            <FaSolidSort size={ 14 }/>*/ }
                        {/*        </Select.Icon>*/ }
                        {/*    </Select.Trigger>*/ }
                        {/*    <Select.Portal>*/ }
                        {/*        <Select.Content class={ 'p-2 bg-teal-200 border-2 border-teal-400 rounded-md' }>*/ }
                        {/*            <Select.Listbox*/ }
                        {/*                    class={ 'max-h-36 overflow-y-scroll' }*/ }
                        {/*            />*/ }
                        {/*        </Select.Content>*/ }
                        {/*    </Select.Portal>*/ }
                        {/*</Select>*/ }
                        <TextInput
                                onChange={ (value) => {
                                    if (timeOutId) {
                                        clearTimeout(timeOutId)
                                    }
                                    timeOutId = setTimeout(
                                            () => {
                                                setNewEmployeeUsername(value)
                                            },
                                            500
                                    )
                                } }
                                value={ getNewEmployeeUsername() }
                                placeholder={ 'Enter a nic number' }
                                inputConfig={ { type: 'text' } }
                        />
                        <TextInput
                                onChange={ (value) => {
                                    if (timeOutId) {
                                        clearTimeout(timeOutId)
                                    }
                                    timeOutId = setTimeout(
                                            () => {
                                                setNewEmployeePassword(value)
                                            },
                                            500
                                    )
                                } }
                                value={ getNewEmployeePassword() }
                                placeholder={ 'Enter a password' }
                                inputConfig={ { type: 'password' } }
                        />
                    </div>
                    <div class={ 'p-4 flex flex-col items-stretch justify-start' }>
                        <PrimaryButton
                                onClick={ () => addNewEmployeeMutation.mutate() }
                                getIsBusy={ props.getIsBusy }
                                getIsDisabled={ props.getIsBusy }
                        >
                            <PrimaryButton.Icon>
                                <FaSolidUserPlus size={ 14 }/>
                            </PrimaryButton.Icon>
                            <PrimaryButton.Label>
                                <pre>Add Employee</pre>
                            </PrimaryButton.Label>
                        </PrimaryButton>
                    </div>
                </Dialog.Content>
            </div>
        </Dialog.Portal>
    </Dialog>)
}


