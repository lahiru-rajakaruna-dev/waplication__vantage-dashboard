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
    getUserProfile
}                 from "../supabase/authentication";
import {
    getAuthUserProfile,
    setAuthUserProfile,
}                 from "../utility/LocalStorage";
import Employees  from "../views/employees_manager/employees";



export default function ApplicationRouter() {
    const [isAuthenticated, setIsAuthenticated] = createSignal(false)
    const [isRegistered, setIsRegistered]       = createSignal(false)

    return (
            <CNTXAuth.Provider
                    value={{
                        isAuthenticated   : isAuthenticated,
                        setIsAuthenticated: setIsAuthenticated,
                        isRegistered      : isRegistered,
                        setIsRegistered   : setIsRegistered,
                        userProfile       : getAuthUserProfile,
                        setUserProfile    : setAuthUserProfile
                    }}
            >
                <Router>
                    <Route path={"/"}
                           component={ApplicationLoadingScreen}/>
                    <Route path={'/auth'}
                           component={UserSignup}/>
                    <Route path={"/dashboard"}>
                        <Route path={"/"}
                               component={App}/>
                        <Route path={"/employees"}
                               component={Employees}/>
                    </Route>
                </Router>
            </CNTXAuth.Provider>
    )
}

function ApplicationLoadingScreen() {
    const nav                                   = useNavigate()
    const [isLoading, setIsLoading]             = createSignal(true)
    const {isAuthenticated, setIsAuthenticated} = useCNTXAuth()

    createEffect(redirectBasedOnAuthState)

    onMount(checkApplicationAuthState)

    async function checkApplicationAuthState() {
        try {
            const userProfile = await getUserProfile()
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