import { Accordion }           from '@kobalte/core/accordion';
import { useQuery }            from '@tanstack/solid-query';
import {
    createSignal,
    For,
    Show
}                              from 'solid-js';
import { toast }               from 'solid-toast';
import api                     from '../../../wretch/api';
import Dialog_AddSalesGroup    from './Dialog_AddSalesGroup';
import Dialog_RemoveSalesGroup from './Dialog_RemoveSalesGroup';
import SalesGroupActionsMenu   from './SalesGroupActionMenu';
import SalesGroupDetails       from './SalesGroupDetails';
import SalesGroupHeader        from './SalesGroupHeader';



export default function SalesGroups() {
    const [ getIsBusy, setIsBusy ]                                             = createSignal(false)
    const [ getIsAddSalesGroupDialogOpen, setIsAddSalesGroupDialogOpen ]       = createSignal(false)
    const [ getIsRemoveSalesGroupDialogOpen, setIsRemoveSalesGroupDialogOpen ] = createSignal(false)
    
    const query_SalesGroups = useQuery(() => {
        return {
            queryKey: [ 'sales_groups' ],
            queryFn : async () => {
                return await api.SalesGroupApi.getAll()
            },
        }
    })
    
    return <div>
        <Show
                when={ query_SalesGroups.data && query_SalesGroups.data.length > 0 }
                fallback={ <div>
                    <pre>No Sales Groups Created</pre>
                </div> }
        >
            <Accordion
                    defaultValue={ [] }
                    multiple={ true }
                    class={ 'w-full max-w-full px-4 h-fit flex flex-col sales_group.-stretch justify-start gap-1 overflow-x-visible' }
            >
                
                <For each={ query_SalesGroups.data }>
                    { (sales_group) => {
                        if (!sales_group || !sales_group.sales_group_id) {
                            return
                        }
                        
                        return (<Accordion.Item
                                value={ sales_group.sales_group_id }
                                class={ 'w-full h-fit min-h-12 rounded-md transform-3d perspective-normal perspective-origin-top overflow-x-visible' }
                        >
                            
                            <Accordion.Header class={ 'w-full h-fit rounded-md bg-teal-300/60 hover:bg-yellow-300/60 hover:translate-z-3 hover:shadow-[0px_2px_4px_2px] shadow-teal-600/10 transition-all ease-in-out duration-300' }>
                                <Accordion.Trigger class={ 'w-full h-fit' }>
                                    <SalesGroupHeader
                                            sales_group_id={ sales_group.sales_group_id }
                                            sales_group_name={ sales_group.sales_group_name }
                                    />
                                </Accordion.Trigger>
                            </Accordion.Header>
                            
                            <Accordion.Content class={ 'w-full h-fit max-h-[300px] px-2 flex flex-col sales_group.-stretch justify-start gap-1 bg-teal-600/60 overflow-y-scroll' }>
                                <SalesGroupDetails salesGroupId={ () => sales_group.sales_group_id }/>
                            </Accordion.Content>
                        </Accordion.Item>)
                    } }
                </For>
            </Accordion>
        </Show>
        
        <Dialog_RemoveSalesGroup
                setIsBusy={ setIsBusy }
                getIsBusy={ getIsBusy }
                getIsOpen={ getIsRemoveSalesGroupDialogOpen }
                onOpenStateChange={ setIsRemoveSalesGroupDialogOpen }
        />
        
        <Dialog_AddSalesGroup
                getIsOpen={ getIsAddSalesGroupDialogOpen }
                onOpenStateChange={ setIsAddSalesGroupDialogOpen }
                getIsBusy={ getIsBusy }
                setIsBusy={ setIsBusy }
        />
        
        <SalesGroupActionsMenu
                showDeleteSalesGroupDialog={ () => setIsRemoveSalesGroupDialogOpen(true) }
                showAddSalesGroupDialog={ () => setIsAddSalesGroupDialogOpen(true) }
        />
    </div>
}



