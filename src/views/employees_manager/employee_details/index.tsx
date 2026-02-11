import { Show }                       from 'solid-js';
import { useContextEmployeesManager } from '../context';
import ActivityTimeline               from './ActivityTimeline';
import EmployeeAssignment             from './EmployeeAssignment';
import EmployeeBio                    from './EmployeeBio';
import EmployeePerformance            from './EmployeePerformance';
import EmployeeSyncHealth             from './EmployeeSyncHealth';



export default function EmployeeDetails() {
    const { getSelectedEmployeeId } = useContextEmployeesManager()
    
    return <div class={ 'w-full h-full p-2 border-2 border-teal-400/60 rounded-md bg-teal-200/30 overflow-y-scroll backdrop-blur-sm' }>
        <div class={ 'w-full min-h-full h-fit grid grid-cols-12 auto-rows-fr gap-2' }>
            <Show
                    when={ getSelectedEmployeeId() }
                    fallback={ <div class={ 'flex flex-col items-center justify-center' }>
                        <pre class={ 'whitespace-nowrap' }>
                            Please Select an Employee From the Employees List
                        </pre>
                    </div> }
            >
                <EmployeeBio/>
                <EmployeePerformance/>
                <EmployeeSyncHealth/>
                <EmployeeAssignment/>
                <ActivityTimeline/>
            </Show>
        </div>
    </div>
}
