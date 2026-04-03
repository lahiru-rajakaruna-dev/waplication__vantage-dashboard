import {
    Route,
    Router,
    useNavigate
}                 from "@solidjs/router";
import {
    AuthChangeEvent,
    Session,
    User
}                 from "@supabase/supabase-js";
import {
    createEffect,
    createSignal,
    onMount
}                 from "solid-js";
import App        from "../App";
import UserSignup from "../authentication";
import {
    CNTXAuth,
    useCNTXAuth
}                 from "../contexts/cntx_auth";
import {
    attachCallbackToAuthStateChange,
    fetchSupabaseUserProfile
}                 from "../supabase/authentication";
import {
    getAuthUserProfile,
    setAuthUserProfile,
}                 from "../utility/LocalStorage";
import Employees  from "../views/employees_manager/employees";



export default function ApplicationRouter() {
    const [isUserAuthenticated, setIsUserAuthenticated] = createSignal(false)

    return (<CNTXAuth.Provider
            value={{
                isUserAuthenticated      : isUserAuthenticated,
                setIsUserAuthenticated   : setIsUserAuthenticated,
                isRegistered             : isRegistered,
                setIsRegistered          : setIsRegistered,
                userProfile              : getAuthUserProfile,
                setUserProfile           : setAuthUserProfile,
                isAuthenticatedWithApi   : isApiAuthenticated,
                setIsAuthenticatedWithApi: setIsApiAuthenticated
            }}
    >
                <Router>
                    <Route path={"/"}
                           component={ApplicationLoadingScreen}/>
            <Route path={"/broken"}
                   component={ApplicationBrokenScreen}/>
            <Route path={'/auth'}
                           component={UserSignup}/>
            <Route path={"/registration"}
                   component={OrganizationRegistration}/>
            <Route path={"/dashboard"}>
                        <Route path={"/"}
                               component={App}/>
                        <Route path={"/employees"}
                               component={Employees}/>
                    </Route>
                </Router>
            </CNTXAuth.Provider>
    )

function ApplicationBrokenScreen() {
    return <div class={'absolute inset-0 flex flex-col items-center justify-center border-4 border-red-400/60 bg-red-200/60 text-red-400 text-7xl font-bold'}>
        <pre>
            APPLICATION BROKEN X|
        </pre>

        <code class={'text-3xl'}>
            <pre>
                PLEASE CONTACT DEVELOPER
            </pre>
        </code>
    </div>
}

function ApplicationLoadingScreen() {
    const nav                                   = useNavigate()
    const [isLoading, setIsLoading]             = createSignal(true)
    const {isAuthenticated, setIsAuthenticated} = useCNTXAuth()

    createEffect(redirectBasedOnAuthState)

    onMount(checkApplicationAuthState)

    async function checkApplicationAuthState() {
        try {
            const userProfile = await fetchSupabaseUserProfile()
            await setApplicationAuthState(userProfile)
            const {data} = attachCallbackToAuthStateChange(updateApplicationAuthState)
            // return data.subscription.unsubscribe();
        } catch (e) {
            console.error('Authentication Failed...')
            nav("/auth")
        } finally {
            setIsLoading(false)
        }

    }

    async function setApplicationAuthState(user: User | undefined) {
        if (!user) {
            setIsAuthenticated(false)
            return;
        }
        setIsAuthenticated(true)
    }

    async function updateApplicationAuthState(event: AuthChangeEvent, session: Session | null) {
        if (event === "SIGNED_OUT") {
            setIsAuthenticated(false)
        } else if (event === "SIGNED_IN") {
            setIsAuthenticated(true)
        }
    }

    function redirectBasedOnAuthState() {
        if (isLoading()) {
            return;
        }

        if (isAuthenticated()) {
            nav("/dashboard")
        } else {
            nav("/auth")
        }
    }

    return <div class={'absolute inset-0 flex flex-col items-center justify-center'}>
        <p class={'text-7xl font-bold'}>Application Loading</p>
    </div>
}