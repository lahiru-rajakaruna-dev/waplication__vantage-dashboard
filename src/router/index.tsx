import {
    Route,
    Router,
    useNavigate
}                                 from "@solidjs/router";
import {
    AuthChangeEvent,
    Session
}                                 from "@supabase/supabase-js";
import {
    createSignal,
    onMount
}                                 from "solid-js";
import App                        from "../App";
import UserSignup                 from "../authentication";
import {
    CNTXAuth,
    useCNTXAuth
}                                 from "../contexts/cntx_auth";
import OrganizationRegistration   from "../registration";
import {fetchSupabaseUserProfile} from "../supabase/authentication";
import {
    getAuthUserProfile,
    isApiAuthenticated,
    isRegistered,
    setAuthUserProfile,
    setIsApiAuthenticated,
    setIsRegistered,
}                                 from "../utility/LocalStorage";
import Employees                  from "../views/employees_manager/employees";
import api                        from "../wretch/api";



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
    </CNTXAuth.Provider>)
}

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
    const navigate = useNavigate()
    const {
              setIsUserAuthenticated,
              setIsAuthenticatedWithApi,
              isAuthenticatedWithApi,
              setIsRegistered,
          }        = useCNTXAuth()

    onMount(checkApplicationState)

    async function checkApplicationState() {
        try {
            await checkUserAuthState()
            await checkApiAuthState()
            await checkRegistrationState()
        } catch (e) {
            console.error(
                    "[ApplicationLoadingScreen]: ",
                    e
            );
        }
    }

    async function checkRegistrationState() {
        const isRegistered = await api.AuthorizationApi.isRegistered()
        if (isRegistered) {
            setIsRegistered(true)
            return
        }
        navigate("/registration")
    }

    async function authenticateWithApi() {
        const isSuccess = await api.AuthorizationApi.authenticateApi()
        if (!isSuccess) {
            setIsAuthenticatedWithApi(false)
            throw new Error("API Authentication Failed")
        }
        setIsAuthenticatedWithApi(true)
    }

    async function checkApiAuthState() {
        if (!isAuthenticatedWithApi()) {
            await authenticateWithApi()
        }
        navigate("/registration")
    }

    async function checkUserAuthState() {
        try {
            const userProfile = await fetchSupabaseUserProfile()
            if (!userProfile) {
                console.log("User Profile Not Found")
                return navigate(
                        "/auth",
                        {
                            replace: true
                        }
                )
            }
            // attachCallbackToAuthStateChange(updateApplicationAuthState)
        } catch (e) {
            console.error('Authentication Failed...')
        }
    }

    async function updateApplicationAuthState(
            event: AuthChangeEvent,
            session: Session | null
    ) {
        if (event === "SIGNED_OUT") {
            setIsUserAuthenticated(false)
        } else if (event === "SIGNED_IN") {
            setIsUserAuthenticated(true)
        }
    }

    return <div class={'absolute inset-0 flex flex-col items-center justify-center'}>
        <p class={'text-7xl font-bold'}>Application Loading</p>
    </div>
}

//TODO IF NOT AUTHED WITH API REDIRECT TO AN ERROR PAGE