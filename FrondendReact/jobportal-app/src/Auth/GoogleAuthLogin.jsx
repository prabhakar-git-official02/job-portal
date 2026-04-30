import { GoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux";
import { EmailExistThunk, GoogleApiCallThunk } from "../Thunks/EmailExistThunk";
import { useSelector } from "react-redux";
import RoleDialog from "./RoleDialog";
import {  useState } from "react";
import { EmailExistAction,EmailExistRole } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function GoogleAuthLogin(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const EmailExistRes = useSelector(state => state.auth.emailExist)
    const EmailRole = useSelector(state => state.auth.emailRole)

    const [Token,setToken] = useState(null)

    console.log(EmailExistRes)

        useEffect(() => {
        if(EmailExistRes === true && EmailRole && Token){
            dispatch(GoogleApiCallThunk(Token, EmailRole))
            .then(() => dispatch(EmailExistAction(null)))
            .then(() => dispatch(EmailExistRole(null)))
            .then(() => navigate('/')) // better route
        }
    }, [EmailExistRes, EmailRole, Token,dispatch,navigate])



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
        {EmailExistRes === false &&
        <RoleDialog visibleRes={EmailExistRes} tokenRes={Token}/>
        }
               </>
    )
}

export default GoogleAuthLogin