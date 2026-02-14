import { useQuery }                   from '@tanstack/solid-query';
import {
    For,
    Show
}                                     from 'solid-js';
import api                            from '../../../wretch/api';
import { useContextEmployeesManager } from '../context';



export default function ActivityTimeline() {
    const { getSelectedEmployeeId } = useContextEmployeesManager()
    
    const query_EmployeeActivityRecords = useQuery(() => {
        return {
            queryKey: [
                'employee',
                'activity',
                getSelectedEmployeeId()
            ],
            queryFn : async () => {
                return api.EmployeeActivityApi.getEmployeeActivityProfile(getSelectedEmployeeId())
            }
        }
    })
    return <div class={ 'card row-start-5 row-span-2 col-start-5 col-span-8' }>
        <div class={ 'w-full h-full flex flex-col items-stretch justify-start gap-0 [&>*:not(last-child)]:border-b-2 [&>*]:border-teal-400 [&>*]:py-2 text-teal-600' }>
            <Show
                    when={ query_EmployeeActivityRecords.data && query_EmployeeActivityRecords.data.length > 0 }
                    fallback={ <div class={ 'w-full h-full flex flex-col items-center justify-center' }>
                        <pre class={ 'text-xl font-semibold text-teal-600 border-0!' }>No Data to Display Yet</pre>
                    </div> }
            >
                <For each={ query_EmployeeActivityRecords.data }>
                    { (activity) => {
                        return <EmployeeActivityRecord
                                activity={ activity.employee_activity_type }
                                message={ activity.employee_activity_message }
                                timestamp={ activity.employee_activity_timestamp }
                        />
                    } }
                </For>
            </Show>
        </div>
    </div>
}


function EmployeeActivityRecord(props: {
    activity: string,
    message: string,
    timestamp: number
}) {
    return (<div class={ 'w-full h-fit flex flex-row items-center justify-between gap-4' }>
        <pre class={ 'flex-2 font-semibold' }>{ props.activity }</pre>
        <pre class={ 'w-full' }>{ props.message }</pre>
        <pre class={ 'flex-1' }>{ new Date(props.timestamp).toLocaleTimeString() }</pre>
    </div>)
}
