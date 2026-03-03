import api from "../api/axios";

import { IsAdminProfileSuccess,IsAdminProfileFailure } from "../Redux/adminProfileSlice";
import { showAlert } from "../Scripts/Alert";

export const adminProfileThunk = () => {
    return async(dispatch) => {
        try{
            const response = await api.get('/admin/profileGet',
                {withCredentials : true}
            )
            if(response){
                dispatch(IsAdminProfileSuccess(response.data.data))
                return response
            }
        }catch(err){
            dispatch(IsAdminProfileFailure(err.response?.data?.msg))
            console.log("admin-profile-Get-Error",err.response?.data?.msg)
        }
    }
}

// Recruiter Profile Field Update
export const adminProfileUpdateThunk = (UpdateDatas) => {
    return async(dispatch) => {
        try{
        const response = await api.patch('/admin/profileUpdate',
            UpdateDatas,
         {
            withCredentials : true
         }
        )

        if(response){
            showAlert("Success","Profile Updated","success")
            dispatch(adminProfileThunk())
        }
    } catch(err){
        console.log("AdminProfile-Update-Error",err?.response?.data?.msg)
    }
    }
}