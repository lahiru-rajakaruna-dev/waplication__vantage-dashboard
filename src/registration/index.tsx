import { useMutation }      from '@tanstack/solid-query';
import { FaSolidArrowLeft } from 'solid-icons/fa';
import {
    Component,
    createSignal
}                           from 'solid-js';
import { Dynamic }          from 'solid-js/web';
import { toast }            from 'solid-toast';
import PrimaryButton        from '../common_components/PrimaryButton';
import { useCNTXAuth }      from '../contexts/cntx_auth';
import api                  from '../wretch/api';
import Step_1               from './components/Step_1';
import Step_3               from './components/Step_3';
import { TStepProps }       from './components/types';



const steps: Component<TStepProps>[] = [
    Step_1, // 1: Step_2,
    Step_3
]

export default function OrganizationRegistration() {
    const {userProfile}          = useCNTXAuth()
    const [ getStep, setStep ]       = createSignal(0)
    const [ getData, setData ]       = createSignal<{
        organization_name: string
        organization_admin_email: string,
        organization_admin_phone: string,
        organization_logo_url: string,
    }>({
           organization_name       : '',
           organization_logo_url   : '',
           organization_admin_email: userProfile()?.email ?? '',
           organization_admin_phone: '',
       })
    const [ getIsBusy, setIsBusy ]   = createSignal<boolean>(false)
    
    const mutationAddOrganization = useMutation(() => {
        return {
            mutationKey: [
                'organization',
                'register'
            ],
            mutationFn : async () => {
                return await api.OrganizationApi.register({
                                                              ...getData(),
                                                              organization_registration_date: Date.now(),
                                                          })
            },
            onMutate   : () => {
                setIsBusy(true)
            },
            onSettled  : (responseData) => {
                setIsBusy(false)
                if (import.meta.env.DEV) {
                    console.debug(responseData)
                }
            },
            onError    : (
                    error,
                    vars,
                    result
            ) => {
                toast.error(error.message)
            },
            onSuccess  : (
                    data,
                    vars,
                    result
            ) => {
                toast.success('Registration successful...')
            },
        }
    })
    
    
    async function submitOrganizationData() {
        setIsBusy(true)
        try {
            const {
                      organization_admin_email,
                      organization_admin_phone,
                      organization_logo_url,
                      organization_name
                  } = getData()
            
            if (!organization_name || !organization_admin_email || !organization_admin_phone || !organization_logo_url) {
                toast.error('[-] Incomplete registration data...')
                return
            }
            
            mutationAddOrganization.mutate()
        } catch (e) {
            throw new Error('Registration failed...')
        } finally {
            setIsBusy(false)
        }
    }
    
    
    function storeData(data: Record<string, any>) {
        setData((prevData) => {
            return {
                ...prevData, ...data
            }
        })
    }
    
    
    return <div class={ 'relative w-full h-full flex flex-col items-center justify-center gap-12' }>
        <div class={ 'absolute top-1/12 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-black' }>VANTAGE</div>
        <div class={ 'w-fit min-w-lg h-fit p-8 flex flex-col items-stretch justify-start gap-4 bg-v-bg/80 shadow-[inset_0px_0px_1px_3px] shadow-v-accent-glow backdrop-blur-md rounded-md ' }>
            <Dynamic
                    component={ steps[getStep()] }
                    onButtonClick={ async (data) => {
                        storeData(data);
                        
                        if (getStep() >= steps.length - 1) {
                            await submitOrganizationData()
                            return
                        }
                        
                        if (getIsBusy()) {
                            toast('Please wait for a moment...')
                            return
                        }
                        
                        setStep((prevStep) => {
                            if (prevStep >= steps.length - 1) {
                                return prevStep
                            }
                            
                            return prevStep + 1
                        })
                    } }
                    getIsBusy={ getIsBusy }
                    setIsBusy={ setIsBusy }
            />
            <div class={ 'w-full h-fit flex flex-col items-stretch justify-center' }>
                <PrimaryButton
                        onClick={ () => {
                            setStep((prevStep) => {
                                if (prevStep <= 0) {
                                    return prevStep;
                                }
                                
                                return prevStep - 1
                            })
                        } }
                        getIsBusy={ getIsBusy }
                        getIsDisabled={ getIsBusy }
                >
                    <PrimaryButton.Icon>
                        <FaSolidArrowLeft size={ 14 }/>
                    </PrimaryButton.Icon>
                    <PrimaryButton.Label>
                        <pre>Go Back</pre>
                    </PrimaryButton.Label>
                </PrimaryButton>
            </div>
        </div>
    </div>
}
