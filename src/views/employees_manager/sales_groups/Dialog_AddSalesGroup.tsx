import { Dialog }            from '@kobalte/core/dialog';
import { Select }            from '@kobalte/core/select';
import {
    useMutation,
    useQueryClient
}                            from '@tanstack/solid-query';
import { BsDot }             from 'solid-icons/bs';
import {
    FaSolidPlus,
    FaSolidSort
}                            from 'solid-icons/fa';
import { IoClose }           from 'solid-icons/io';
import { createSignal }      from 'solid-js';
import { toast }             from 'solid-toast';
import PrimaryButton         from '../../../common_components/PrimaryButton';
import TextInput             from '../../../common_components/TextInput';
import { TSalesGroupSelect } from '../../../schemas';
import api                   from '../../../wretch/api';



export default function Dialog_AddSalesGroup(props: {
    getIsBusy: () => boolean,
    setIsBusy: (state: boolean) => void,
    getIsOpen: () => boolean,
    onOpenStateChange: (state: boolean) => void
}) {
    let timeOutId: NodeJS.Timeout;
    const [ getNewSalesGroupName, setNewSalesGroupName ]           = createSignal('')
    const [ getNewSalesGroupTerritory, setNewSalesGroupTerritory ] = createSignal('')
    const queryClient                                              = useQueryClient()
    const addSalesGroupMutation                                    = useMutation(() => {
        return {
            mutationKey: [
                'sales_group',
                'add'
            ],
            async mutationFn(data: {
                salesGroupName: string,
                salesGroupTerritory: string
            }) {
                return await api.SalesGroupApi.create({
                                                          sales_group_name     : data.salesGroupName,
                                                          sales_group_territory: data.salesGroupTerritory
                                                      })
            },
            onMutate : async () => {
                props.setIsBusy(true)
                queryClient.setQueryData<TSalesGroupSelect[]>(
                        [ 'sales_groups' ],
                        (currentSalesGroups) => {
                            const newSalesGroup = {
                                sales_group_id             : 'temp-group-1',
                                sales_group_organization_id: 'temp-org-id',
                                sales_group_name           : getNewSalesGroupName(),
                                sales_group_territory      : getNewSalesGroupTerritory(),
                            }
                            
                            if (currentSalesGroups && currentSalesGroups.length > 0) {
                                return [
                                    ...(currentSalesGroups as Array<any>),
                                    newSalesGroup
                                ]
                            }
                            return [ newSalesGroup ]
                        }
                )
                
            },
            onSettled: async () => {
                props.setIsBusy(false)
                
            },
            retry    : false,
            onSuccess: async (data) => {
                await queryClient.setQueryData(
                        [ 'sales_groups' ],
                        data
                )
                toast.success('New Sales Group Created')
            }
            
        }
    })
    
    return (<Dialog
            open={ props.getIsOpen() }
            onOpenChange={ props.onOpenStateChange }
    >
        <Dialog.Portal>
            <Dialog.Overlay class={ 'bg-teal-400/30' }/>
            <div class={ 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' }>
                <Dialog.Content class={ 'flex flex-col items-stretch justify-start bg-teal-200 border-2 border-teal-400 rounded-md' }>
                    <div class={ 'flex flex-row items-center justify-between gap-12 border-b-2 border-teal-400' }>
                        <Dialog.Title class={ 'p-4 font-semibold' }>
                            Create new sales group
                        </Dialog.Title>
                        <Dialog.CloseButton class={ 'p-4 border-l-2 border-teal-400' }>
                            <IoClose size={ 16 }/>
                        </Dialog.CloseButton>
                    </div>
                    <div class={ 'p-4 flex flex-col items-stretch justify-start gap-2' }>
                        <Select
                                class={ 'flex flex-col items-stretch justify-start gap-1' }
                                options={ [
                                    'Mannar',
                                    'Hambantota',
                                    'Kurunegala',
                                    'Kalmunai',
                                    'Kuliyapitiya',
                                    'Moratuwa',
                                    'Kalmunai',
                                    'Maharagama',
                                    'Sri Jayawardenepura Kotte',
                                    'Dehiwala-mount Lavinia'
                                ] }
                                placeholder={ <pre>Select A Territory</pre> }
                                itemComponent={ (props) => {
                                    return <Select.Item
                                            item={ props.item }
                                            class={ 'px-3 py-2 flex flex-row items-center justify-start gap-4 hover:bg-teal-100 rounded-md cursor-pointer' }
                                    >
                                        <Select.ItemLabel>
                                            <pre>{ props.item.textValue }</pre>
                                        </Select.ItemLabel>
                                        <Select.ItemIndicator>
                                            <BsDot size={ 14 }/>
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                } }
                                onChange={ (value) => {
                                    if (!value) {
                                        return
                                    }
                                    
                                    setNewSalesGroupTerritory(value)
                                } }
                        >
                            <Select.Label>
                                Assign a Territory
                            </Select.Label>
                            <Select.Trigger class={ 'px-3 py-2 w-full h-fit flex flex-row items-center justify-between gap-4 bg-teal-200 border-2 border-teal-400 rounded-md' }>
                                <Select.Value>
                                    { (state) => {
                                        const value = state.selectedOption()
                                        if (value) {
                                            return <>{ value }</>
                                        }
                                        return <>No Value</>
                                    }
                                    
                                    }
                                </Select.Value>
                                <Select.Icon>
                                    <FaSolidSort size={ 14 }/>
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content class={ 'p-2 bg-teal-200 border-2 border-teal-400 rounded-md' }>
                                    <Select.Listbox
                                            class={ 'max-h-36 overflow-y-scroll' }
                                    />
                                </Select.Content>
                            </Select.Portal>
                        </Select>
                        <TextInput
                                onChange={ (value) => {
                                    if (timeOutId) {
                                        clearTimeout(timeOutId)
                                    }
                                    timeOutId = setTimeout(
                                            () => {
                                                setNewSalesGroupName(value)
                                            },
                                            500
                                    )
                                } }
                                value={ getNewSalesGroupName() }
                                placeholder={ 'Sales group name' }
                                inputConfig={ { type: 'text' } }
                        />
                    </div>
                    <div class={ 'p-4' }>
                        <PrimaryButton
                                onClick={ () => addSalesGroupMutation.mutate({
                                                                                 salesGroupName     : getNewSalesGroupName(),
                                                                                 salesGroupTerritory: getNewSalesGroupTerritory()
                                                                             }) }
                                getIsBusy={ props.getIsBusy }
                                getIsDisabled={ props.getIsBusy }
                        >
                            <PrimaryButton.Icon>
                                <FaSolidPlus size={ 14 }/>
                            </PrimaryButton.Icon>
                            <PrimaryButton.Label>
                                <pre>Create New Sales Group</pre>
                            </PrimaryButton.Label>
                        </PrimaryButton>
                    </div>
                </Dialog.Content>
            </div>
        </Dialog.Portal>
    </Dialog>)
}
