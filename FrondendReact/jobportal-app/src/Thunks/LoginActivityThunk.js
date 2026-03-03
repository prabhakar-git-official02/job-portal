import api from "../api/axios"
import { IsLoginHistorySuccess,IsLoginHistoryFailure } from "../Redux/loginActivitySlice"

export const LoginActivityThunk = () => {
    return async(dispatch) => {
        try{
            const response = await api.get(
                '/auth/loginActivity/Get',
                {withCredentials : true}
            )

            if(response){
                dispatch(IsLoginHistorySuccess(response.data.data))
            }
        } catch(err){
            console.log("Login-Activity-Get-Error",err.response?.data?.msg)
            dispatch(IsLoginHistoryFailure(err.response?.data?.msg))
        }
    }
}