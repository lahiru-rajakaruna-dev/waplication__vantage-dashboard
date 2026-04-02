import {BiLogosGoogle}    from 'solid-icons/bi';
import {createSignal}     from 'solid-js';
import {toast}            from 'solid-toast';
import PrimaryButton      from '../common_components/PrimaryButton';
import {signupWithGoogle} from '../supabase/authentication'



export default function UserSignup() {
    const [getIsBusy, setIsBusy] = createSignal(false)

    return (
            <div class={'w-screen h-screen -bg-linear-30 from-emerald-200/60 to-teal-400/60 rounded-md border-4 border-teal-600/60'}>
                <div class={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-lg h-fit p-8 rounded-md bg-teal-200/80 backdrop-blur-sm v-glass flex flex-col items-stretch justify-start gap-4'}>

                    <div class={'w-full h-fit text-lg font-normal text-v-text-body'}>
                        Share your google profile to continue
                    </div>

                    <div class={'w-full h-fit flex flex-col items-stretch justify-start gap-3'}>
                        <PrimaryButton
                                onClick={async () => {
                                    setIsBusy(true)

                                    try {

                                        const redirectUrl = await signupWithGoogle()

                                        if (import.meta.env.DEV) {
                                            console.debug("REDIRECT: ", redirectUrl)
                                        }

                                        if (!redirectUrl) {
                                            toast.error('[-] Signup failed...', {
                                                unmountDelay: 3000
                                            });
                                            setTimeout(() => {
                                                toast('Wait we are reloading the page...')
                                            }, 3000)
                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 4000)
                                            return
                                        }

                                        window.location.replace(redirectUrl);
                                    } catch (e) {
                                        throw new Error('Google signup failed')
                                    } finally {
                                        setIsBusy(false)
                                    }
                                }}
                                getIsBusy={getIsBusy}
                                getIsDisabled={getIsBusy}
                        >
                            <PrimaryButton.Icon>
                                <BiLogosGoogle size={28}/>
                            </PrimaryButton.Icon>
                            <PrimaryButton.Label>
                                <div class={'text-lg'}>Login with Google</div>
                            </PrimaryButton.Label>
                        </PrimaryButton>
                    </div>
                </div>
            </div>
    )
}