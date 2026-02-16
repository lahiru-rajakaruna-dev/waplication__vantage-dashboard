import { createSignal }      from 'solid-js';
import Dialog_AddEmployee    from './Dialog_AddEmployee';
import Dialog_UpdateEmployee from './Dialog_UpdateEmployee';
import EmployeesActionsMenu  from './EmployeesActionsMenu';
import EmployeesTable        from './EmployeesTable';



export default function Employees() {
    const [ getIsAddEmployeeDialogVisible, setIsAddEmployeeDialogVisible ]       = createSignal(false)
    const [ getIsUpdateEmployeeDialogVisible, setIsUpdateEmployeeDialogVisible ] = createSignal(false)
    const [ getIsBusy, setIsBusy ]                                               = createSignal(false)
    
    return (<div class={ 'relative w-full h-full flex flex-col items-stretch justify-start gap-8 overflow-x-visible' }>
        <EmployeesTable/>
        <EmployeesActionsMenu
                showAddEmployeeDialog={ () => setIsAddEmployeeDialogVisible(true) }
                showUpdateEmployeeDialog={ () => setIsUpdateEmployeeDialogVisible(true) }
        />
        
        <Dialog_AddEmployee
                getIsBusy={ getIsBusy }
                setIsBusy={ setIsBusy }
                getIsOpen={ getIsAddEmployeeDialogVisible }
                setIsOpen={ setIsAddEmployeeDialogVisible }
        />
        <Dialog_UpdateEmployee
                getIsBusy={ getIsBusy }
                setIsBusy={ setIsBusy }
                getIsOpen={ getIsUpdateEmployeeDialogVisible }
                setIsOpen={ setIsUpdateEmployeeDialogVisible }
        />
    </div>)
}


