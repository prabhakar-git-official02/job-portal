import api from "../api/axios";
import { loginSuccess,logout,IsStatus} from "../Redux/authSlice";
import { IsTokenSuccess,IsTokenFailure } from "../Redux/ResetTokenSlice";
import { showAlert } from "../Scripts/Alert";


export const authThunk = () => {
    return async(dispatch) => {
        try{
            const response = await api.get('/auth/me',
                {withCredentials : true}
            )
            if(response){
            dispatch(loginSuccess(response?.data?.user))
            dispatch(IsStatus(response?.status || 200))
            return response
            }
        }catch(err){
            dispatch(logout(err?.response?.data?.msg))
            dispatch(IsStatus(err?.response?.status || 500))
            console.log("Authentication-Error",err.response?.data?.msg)
            return null; 
        }
    }
}

export const forgotPasswordThunk = (email) => {
return async(dispatch) => {
        try{
        const response = await api.post(
            "/auth/forgetPassword",
            {
                email: email,
            },
            {
                withCredentials: true,
            }
        );
        if (response) {
            dispatch(IsTokenSuccess(response.data.data))
            
        }
    } catch(err){
        dispatch(IsTokenFailure(err.response?.data?.msg))
        console.log("forgotPasswordThunk-Error",err?.response?.data?.msg)
    }
}
}

export const resetPasswordThunk = (token,newPassword) => {
    return async(dispatch) => {
        try{
            console.log(token)
            console.log(newPassword)
        const response = await api.post(`/auth/reset-password/${token}`,
            {
                password: newPassword,
            },
            {
                withCredentials: true,
            }
        );
        if (response) {
            dispatch(authThunk())
            showAlert("Success", "Password Reserted Successfully", "success")
        }
    } catch (err) {
        console.log("resetPasswordThunk-Error", err.response?.data?.msg, "error")
    }
    }
}
