import {
    Match,
    Switch
}                              from 'solid-js';
import { Enum_EmployeeStatus } from '../schemas';



export default function EmployeeStatusChip(props: {
    status: Enum_EmployeeStatus
}) {
    return <Switch
            fallback={
                <pre class={ 'w-32 px-2 pt-1 py-0.5 text-center text-sm font-semibold text-white/60 bg-emerald-300/60 border-2 border-emerald-600/60 rounded-full cursor-default' }>
                    UNKNOWN VALUE
            </pre> }
    >
        <Match when={ props.status === 'ON_FIELD' }>
            <pre class={ 'w-32 px-2 pt-1 py-0.5 text-center text-sm font-semibold text-white/60 bg-emerald-300/60 border-2 border-emerald-600/60 rounded-full cursor-default' }>
                { props.status }
            </pre>
        </Match>
        <Match when={ props.status === 'ON_LEAVE' }>
            <pre class={ 'w-32 px-2 pt-1 py-0.5 text-center text-sm font-semibold text-white/60 rounded-full bg-gray-300/60 border-2 border-gray-600/60 cursor-default' }>
                { props.status }
            </pre>
        </Match>
        <Match when={ props.status === 'NOT_REPORTED' }>
            <pre class={ 'w-32 px-2 pt-1 py-0.5 text-center text-sm font-semibold text-white/60 bg-sky-300/60 border-2 border-sky-600/60 rounded-full cursor-default' }>
                { props.status }
            </pre>
        </Match>
    </Switch>
}
