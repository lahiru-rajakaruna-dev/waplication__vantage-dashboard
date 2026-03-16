import {Tabs}                                                                                  from '@kobalte/core/tabs';
import {BiSolidDashboard}                                                                      from 'solid-icons/bi';
import {FaSolidBoxesPacking, FaSolidChartColumn, FaSolidGears, FaSolidHandshake, FaSolidTruck} from 'solid-icons/fa';
import {TiGroup}                                                                               from 'solid-icons/ti';
import {createSignal, ErrorBoundary, For, JSX}                                                 from 'solid-js';
import ApplicationHeader
                                                                                               from '../common_components/ApplicationHeader';
import ClientsManager                                                                          from './clients_manager';
import EmployeesManager
                                                                                               from './employees_manager';





const tabs: Array<{
    key: string,
    title: string,
    component: () => JSX.Element,
    icon: () => JSX.Element
}> = [
    {
        key      : 'dashboard',
        title    : 'Dashboard',
        component: () => <div>Dashboard</div>,
        icon     : () => <BiSolidDashboard
                size={32}
        />

    },
    {
        key      : 'employees_manager',
        title    : 'Employees',
        component: EmployeesManager,
        icon     : () => <TiGroup
                size={32}
        />
    },
    {
        key      : 'inventory',
        title    : 'Inventory',
        component: () => <div>Inventory</div>,
        icon     : () => <FaSolidBoxesPacking
                size={32}
        />

    },
    {
        key      : 'suppliers',
        title    : 'Suppliers',
        component: () => <div>Suppliers</div>,
        icon     : () => <FaSolidTruck
                size={32}
        />

    },
    {
        key      : 'clients',
        title    : 'Clients',
        component: ClientsManager,
        icon     : () => <FaSolidHandshake
                size={32}
        />
    },
    {
        key      : 'sales',
        title    : 'Sales',
        component: () => <div>Sales</div>,
        icon     : () => <FaSolidChartColumn
                size={32}
        />
    },
    {
        key      : 'settings',
        title    : 'Settings',
        component: () => <div>Settings</div>,
        icon     : () => <FaSolidGears
                size={32}
        />
    },
]

export default function Views() {
    const [getSelectedTab, setSelectedTab] = createSignal<string>('dashboard')

    return (<div class={'z-0 w-full h-full grid grid-cols-12 grid-rows-12 bg-white'}>
        {/* HEADER BAR*/}
        <ErrorBoundary
                fallback={<div>
                    <pre>Something Went Wrong</pre>
                    <pre>Check the console</pre>
                </div>}
        >
            <ApplicationHeader/>
        </ErrorBoundary>
        <ErrorBoundary
                fallback={<div>
                    <pre>Something went wrong</pre>
                    <pre>Check the console</pre>
                </div>}
        >
            <div
                    class={'col-start-1 col-end-13 row-start-2 row-end-13 relative bg-white/10 backdrop-blur-sm'}
            >
                <Tabs
                        value={getSelectedTab()}
                        onChange={setSelectedTab}
                        class={'z-0 w-full h-full flex flex-row items-stretch justify-start'}
                >
                    <Tabs.List
                            class={'z-10 w-3/12 min-w-56 max-w-60  h-full flex flex-col items-stretch justify-start transform-3d perspective-normal perspective-origin-top-left backdrop-blur-sm border-r-2 border-r-v-bg/80 bg-v-accent/30'}>
                        <For
                                each={tabs}
                        >
                            {(
                                    item,
                                    index
                            ) => {
                                return <Tabs.Trigger
                                        value={item.key}
                                        class={`py-4 px-3 font-normal last:mt-auto origin-top-left transition-all ${item.key === getSelectedTab()
                                                ? 'translate-z-3'
                                                : 'translate-none'} ${item.key === getSelectedTab()
                                                ? 'shadow-md'
                                                : 'shadow-none'} ${item.key === getSelectedTab()
                                                ? 'bg-yellow-200/60'
                                                : 'bg-teal-200/60'} border-b-2 border-v-bg/30 last:border-0 backdrop-blur-sm`}
                                >
                                    <div class={'w-full h-full flex flex-row items-center justify-start gap-4'}>
                                        <div class={'aspect-square h-full w-auto'}>{item.icon()}</div>
                                        <div
                                                class={`w-full h-full flex flex-col items-start justify-center whitespace-nowrap ${item.key === getSelectedTab()
                                                        ? 'text-v-text-main font-normal'
                                                        : 'text-v-text-body'} font-light`}
                                        >{item.title}</div>
                                    </div>
                                </Tabs.Trigger>
                            }}
                        </For>
                    </Tabs.List>
                    <For
                            each={tabs}
                    >
                        {(
                                item,
                                index
                        ) => {
                            return <Tabs.Content
                                    value={item.key}
                                    class={'relative z-0 w-full h-full p-4 bg-white/90 backdrop-blur-sm'}
                            >
                                {item.component()}
                            </Tabs.Content>
                        }}
                    </For>
                </Tabs>
            </div>
        </ErrorBoundary>
    </div>)
}