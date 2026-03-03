import api from "../api/axios";
import { IsApplicantSuccess,IsApplicantFailure } from "../Redux/applicantSlice";
import { showAlert } from "../Scripts/Alert";
import { IsAllApplicantsSuccess,IsAllApplicantFailure } from "../Redux/allApplicantSlice";
// user applicant data
export const applicantThunk = () => {
    return async(dispatch) => {
        try{
        const response = await api.get('/Jobs/jobseeker/Get',
            {withCredentials : true}
        )
        if(response){
             dispatch(IsApplicantSuccess(response.data.datas))
             return response
        }
    }catch(err){
        dispatch(IsApplicantFailure(err?.response?.data?.msg))
       console.log("AppliedJobs-Get-Error",err?.response?.data?.msg)
    }
    }
}

// user apply post 
export const applyJobPostThunk = (JobId,userData) => {
    return async(dispatch) => {
        try{
        const response = await api.post(`/Jobs/jobseeker/apply/${JobId}`,
            userData,
            {
                withCredentials : true
            }
        )

        if(response){
            dispatch(applicantThunk())
            showAlert("Success",response?.data?.msg,"success")
        }
    } catch(err){
        showAlert("Warning",err.response?.data?.msg,"warning")
        console.log('Apply-Job-Post-Thunk',err.response?.data?.msg)
    }
    }
}

// all applicant Thunk
export const applicantGetAllThunk = () => {
    return async(dispatch) => {
        try{
            const response = await api.get('/Jobs/getApplicants',
                {
                    withCredentials : true
                }
            )
            if(response){
                dispatch(IsAllApplicantsSuccess(response.data.data.data))
                return response
            }
        } catch(err){
            dispatch(IsAllApplicantFailure(err.response?.data?.msg))
            console.log("Get-All-Applicants-Error",err.response?.data?.msg)
        }
    }
}