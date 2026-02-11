import { useQuery }                   from '@tanstack/solid-query';
import {
    Chart,
    Colors,
    Title,
    Tooltip
}                                     from 'chart.js';
import { Bar }                        from 'solid-chartjs';
import {
    createMemo,
    onMount,
    Show
}                                     from 'solid-js';
import { TSaleSelect }                from '../../../schemas';
import api                            from '../../../wretch/api';
import { useContextEmployeesManager } from '../context';



export default function EmployeePerformance() {
    const { getSelectedEmployeeId } = useContextEmployeesManager()
    
    const query_EmployeeSales = useQuery(() => {
        return {
            queryKey: [
                'employee',
                'performance',
                getSelectedEmployeeId()
            ],
            queryFn : async () => {
                return await api.SaleApi.getByEmployee(getSelectedEmployeeId())
            }
        }
    })
    
    return <div class={ 'row-start-1 row-span-2 col-start-5 col-span-4 card' }>
        <Show
                when={ query_EmployeeSales.data && query_EmployeeSales.data.length > 0 }
                fallback={ <div class={ 'w-full h-full flex flex-col items-center justify-center' }>
                    <pre class={ 'text-xl text-teal-600 font-semibold' }>No Data to Show Yet</pre>
                </div> }
        >
            <Graph data={ query_EmployeeSales.data }/>
            <div class={ 'relative w-full h-full p-4 flex flex-col items-center justify-center gap-2' }>
                <div class={ 'flex-1 flex flex-col items-center justify-center' }>
        <pre class={ 'text-3xl font-semibold' }>
            Rs:{ `5,300` }<span class={ 'text-xl text-v-text-body' }>/Month</span>
        </pre>
                    <pre class={ 'text-v-text-body text-sm' }>
            Company Avg: Rs:{ `3,120` }/Month
        </pre>
                </div>
            </div>
        </Show>
    </div>
}


function Graph(props: {
    data: Array<TSaleSelect> | undefined
}) {
    onMount(() => {
        Chart.register(
                Tooltip,
                Colors,
                Title
        )
    })
    
    const chartData = createMemo(() => {
        if (!props.data) {
            return []
        }
        
        return props.data!
                .map((sale) => {
                    return Math.floor(Math.random() * 100)
                })
    })
    
    return <Bar
            width={ 400 }
            height={ 200 }
            options={ {
                animation      : true,
                backgroundColor: 'hsla(187,30%,45%,0.9)',
                elements       : {
                    bar: {
                        borderRadius   : 4,
                        borderWidth    : 1,
                        borderColor    : 'hsla(173,50%,35%,0.9)',
                        backgroundColor: 'hsla(173,50%,55%,0.3)',
                    },
                },
                scales         : {
                    y: {
                        min  : 0,
                        max  : 10,
                        ticks: {
                            callback: (
                                    value: any,
                                    index: number,
                                    ticks: any[]
                            ) => {
                                return `$${ value }K`
                            },
                            color   : 'hsla(173,50%,35%,0.9)'
                        },
                        grace: 5,
                        grid : {
                            lineWidth: 0,
                            drawTicks: true,
                            tickWidth: 1,
                            color    : 'hsla(173,35%,55%,0.8)'
                        },
                    },
                    x: {
                        ticks: {
                            color: 'hsla(173,50%,35%,0.9)'
                        },
                        grid : {
                            lineWidth: 0,
                            drawTicks: true,
                            tickWidth: 1,
                            color    : 'hsla(173,35%,55%,0.8)',
                        }
                    }
                },
                responsive     : true,
            } }
            data={ {
                labels  : [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sept'
                ],
                datasets: [
                    {
                        label: 'Sales',
                        data : chartData(),
                    },
                ]
            } }
    />
    
}