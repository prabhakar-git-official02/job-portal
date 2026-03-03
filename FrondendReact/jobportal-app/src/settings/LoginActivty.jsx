import { authThunk } from "../Thunks/authThunk"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { LoginActivityThunk } from "../Thunks/LoginActivityThunk"

function LoginActivity(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authThunk())
    },[dispatch])

    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        dispatch(LoginActivityThunk())
    },[user,dispatch])

   const date = new Date(user?.loginActivity).toLocaleString("en-IN");

   const loginHistory = useSelector(state => state.loginActivity.loginHistory)

    console.log(`User Data`,user)

    console.log(`refreshTime`,date)

    const lastLogin = loginHistory?.loginHistory[loginHistory?.loginHistory.length-1]
    const LastLogin =  new Date(lastLogin).toLocaleString("en-IN")
    return(
        <>
        <div className="container-fluid">
            <div className="row m-5">
                <div >
                    <h3 className="text-center">Login Activity</h3>
                    <div className="card-body">
                        <h2 className={`mt-5 ${user?"text-success" : "text-danger"}`}>{user?"Active" : "Not Active"}</h2>
                        <h6 className="mt-3">Login Status : <span className={`${user?"text-success" : "text-danger"} mt-4`}>{user?"User Logged" : "User not Logged"}</span></h6>
                        <h6 className="mt-3">Last Login </h6>
                        <span>{LastLogin}</span>
                        <h6 className="mt-4">Login Refresh</h6>
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default LoginActivity