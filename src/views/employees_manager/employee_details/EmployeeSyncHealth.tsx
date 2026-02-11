import { AiOutlineCloudSync } from 'solid-icons/ai';
import { toast }              from 'solid-toast';
import PrimaryButton          from '../../../common_components/PrimaryButton';



export default function EmployeeSyncHealth() {
    
    function forceSync() {
        toast('Sending force sync call...')
    }
    
    
    return <div class={ 'row-start-1 row-span-2 col-start-9 col-span-4 card' }>
        
        <div class={ 'relative w-full h-full' }>
            
            <svg
                    class={ 'aspect-auto w-16' }
                    viewBox='0 0 124.392 124.391'
                    xml-space='preserve'
            >
                <g
                        id='SVGRepo_bgCarrier'
                        stroke-width='0'
                ></g>
                <g
                        id='SVGRepo_tracerCarrier'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                ></g>
                <g id='SVGRepo_iconCarrier'>
                    <g>
                        <path
                                class={ 'fill-teal-400/80' }
                                d='M22.496,124.391h7.7c2.4,0,4.5-1.4,5.5-3.601l0.7-1.699c0.5-1.101,1.6-1.801,2.7-1.801h23.1h22.4c1.2,0,2.2,0.7,2.7,1.801 l0.8,1.8c1,2.1,3.101,3.5,5.5,3.5h8.2c4.4,0,7.3-4.601,5.4-8.601l-33.5-71.099l0,0c-3.301,2.3-7.201,3.7-11.5,3.7 c-4.6,0-8.9-1.6-12.2-4.2c-0.1,0.2-0.2,0.4-0.3,0.6l-32.6,71.1C15.196,119.891,18.096,124.391,22.496,124.391z M53.796,78.091 l5.5-13.301c0.5-1.3,1.7-1.899,2.8-1.8c1.101,0,2.2,0.601,2.7,1.8l5.699,13.301c0.801,2-0.6,4.199-2.799,4.199h-5.5h-5.6 C54.396,82.291,52.996,80.091,53.796,78.091z M45.596,99.191l0.5-1.1c0.5-1.101,1.6-1.801,2.7-1.801h26.699 c1.201,0,2.201,0.7,2.701,1.801l0.5,1.1c0.899,2-0.5,4.2-2.701,4.2H48.396C46.196,103.391,44.696,101.191,45.596,99.191z'
                        />
                        <circle
                                cx='62.196'
                                cy='28.391'
                                r='12'
                                class={ 'fill-red-500/60' }
                        />
                        <path
                                class={ 'fill-teal-400/60' }
                                d='M86.196,43.091c0.899,0.7,2,1,3,1c1.5,0,3-0.7,4-2c3-4,4.6-8.7,4.6-13.7c0-5.1-1.7-10-4.9-14c-1.699-2.2-4.9-2.5-7-0.8 c-2.199,1.7-2.5,4.9-0.8,7c1.8,2.2,2.7,4.9,2.7,7.8c0,2.8-0.9,5.4-2.6,7.6C83.495,38.291,83.995,41.391,86.196,43.091z'
                        />
                        <path
                                class={ 'fill-teal-400/60' }
                                d='M104.796,55.491c0.9,0.7,2,1,3,1c1.5,0,3-0.7,4-2c5.8-7.5,8.8-16.5,8.8-26c0-9.8-3.2-19-9.3-26.6c-1.7-2.2-4.9-2.5-7-0.8 c-2.2,1.7-2.5,4.9-0.801,7c4.601,5.8,7.101,12.9,7.101,20.4c0,7.3-2.3,14.2-6.7,19.9C102.196,50.691,102.596,53.891,104.796,55.491 z'
                        />
                        <path
                                class={ 'fill-teal-400/60' }
                                d='M38.496,13.591c-2.2-1.7-5.3-1.4-7,0.8c-3.1,4-4.9,8.9-4.9,14c0,5,1.6,9.7,4.6,13.7c1,1.3,2.5,2,4,2c1.1,0,2.1-0.3,3-1 c2.2-1.7,2.6-4.8,0.9-7c-1.7-2.2-2.6-4.8-2.6-7.6c0-2.9,0.9-5.6,2.7-7.8C40.996,18.491,40.696,15.291,38.496,13.591z'
                        />
                        <path
                                class={ 'fill-teal-400/60' }
                                d='M20.096,1.191c-2.2-1.7-5.3-1.4-7,0.8c-6.1,7.6-9.3,16.8-9.3,26.6c0,9.5,3,18.5,8.8,26c1,1.3,2.5,2,4,2c1.1,0,2.1-0.3,3-1 c2.2-1.7,2.6-4.8,0.9-7c-4.4-5.8-6.7-12.7-6.7-19.9c0-7.5,2.5-14.5,7.1-20.4C22.596,5.991,22.296,2.891,20.096,1.191z'
                        />
                    </g>
                </g>
            </svg>
            <pre class={ 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-8/12 text-8xl font-black' }>
                       3H
                    </pre>
            <pre class={ 'absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-8/12' }>ago</pre>
            <pre class={ 'absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-12' }>
                        Last Synced
                    </pre>
            
            <div class={ 'absolute bottom-0 left-0 right-0 flex flex-col items-stretch' }>
                <PrimaryButton
                        onClick={ forceSync }
                        getIsBusy={ () => false }
                        getIsDisabled={ () => false }
                >
                    <PrimaryButton.Icon>
                        <AiOutlineCloudSync size={ 22 }/>
                    </PrimaryButton.Icon>
                    <PrimaryButton.Label>
                        <pre class={ '' }>Force Sync</pre>
                    </PrimaryButton.Label>
                </PrimaryButton>
            </div>
        </div>
    
    </div>
}

