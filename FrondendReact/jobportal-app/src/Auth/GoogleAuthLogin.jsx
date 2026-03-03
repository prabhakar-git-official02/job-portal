import { GoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux";
import { EmailExistThunk, GoogleApiCallThunk } from "../Thunks/EmailExistThunk";
import { useSelector } from "react-redux";
import RoleDialog from "./RoleDialog";
import {  useState } from "react";
import { EmailExistAction,EmailExistRole } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";

function GoogleAuthLogin(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const EmailExistRes = useSelector(state => state.auth.emailExist)
    const EmailRole = useSelector(state => state.auth.emailRole)

    const [Token,setToken] = useState(null)

    console.log(EmailExistRes)

    const handleGoogleLogin = () => {
        if(EmailExistRes === true && EmailRole){
            dispatch(GoogleApiCallThunk(Token,EmailRole))
            .then(() => dispatch(EmailExistAction(null)))
            .then(() => dispatch(EmailExistRole(null)))
            .then(() => {navigate('/')})
        }
    }

    return(
        <>
        <GoogleLogin
        onSuccess={async (credentialResponse) => {
            const token = credentialResponse.credential
                setToken(token)
                dispatch(EmailExistThunk(token))      
        }}
        onError={() => console.log("Login Failed")}
        /> 
        {EmailExistRes === false ? 
        <RoleDialog visibleRes={EmailExistRes} tokenRes={Token}/>
        :
        EmailExistRes === true? handleGoogleLogin()
        :
         null}
               </>
    )
}

export default GoogleAuthLogin