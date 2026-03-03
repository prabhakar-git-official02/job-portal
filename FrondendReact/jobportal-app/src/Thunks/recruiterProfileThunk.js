import api from "../api/axios";
import { IsRecruiterProfileSuccess,IsRecruiterProfileFailure } from "../Redux/recruiterProfileSlice";
import { showAlert } from "../Scripts/Alert";

export const recruiterProfileThunk = () => {
    return async(dispatch) => {
        try{
        const response = await api.get(
            'profile/recruiter-Profile/Get',
            {withCredentials : true}
        )
        if(response){
        dispatch(IsRecruiterProfileSuccess(response.data.data))
        return response
        }
    } catch(err){
        if(err.response?.data?.msg === "Recruiter Not Found"){
            return dispatch(IsRecruiterProfileFailure(err.response?.data?.msg))
        }
        return console.log("Recruiter-Profile-Get-Error",err.response?.data?.msg)
    }
    }
}

// Recruiter Profile Field Update
export const recruiterProfileUpdateThunk = (UpdateDatas) => {
    return async(dispatch) => {
        try{
        const response = await api.patch('/profile/recruiter-Profile/Update',
            UpdateDatas,
         {
            withCredentials : true
         }
        )

        if(response){
            showAlert("Success","Profile Updated","success")
            dispatch(recruiterProfileThunk())
        }
    } catch(err){
        console.log("Error",err.response?.data?.msg,"error")
    }
    }
}