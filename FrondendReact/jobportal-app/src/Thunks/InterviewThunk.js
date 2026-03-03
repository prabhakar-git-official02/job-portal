import api from "../api/axios"
import { showAlert } from "../Scripts/Alert"
import { IsInterviewsSuccess,IsInterviewsFailure } from "../Redux/interviewSlice"


export const InterviewsGet_Thunk = () => {
    return async(dispatch) => {
        try{
            const response = await api.get('/Jobs/Interviews/Get',
                {withCredentials : true}
            )
            if(response){
                dispatch(IsInterviewsSuccess(response.data.data))
                return response 
            }
        } catch(err){
            dispatch(IsInterviewsFailure(err.response?.data?.msg))
            console.log("nterviewsGet_Thunk-Error",err.response?.data?.msg)
        }
    }
}


export const sheduleInterviewPostThunk = (InterviewDatas) => {
    return async(dispatch) => {
        try{
            const response = await api.post('/Jobs/Recruiter/InterviewShedule',
                InterviewDatas,
                {withCredentials : true}
            )
            if(response){
                showAlert("Success","Interview Sheduled","success")
                dispatch(InterviewsGet_Thunk())
                return response
            }
        } catch(err){
            showAlert("Warning",err.response?.data?.msg,"error")
            console.log("sheduleInterviewPostThunk-Error",err.response?.data?.msg)
        }
    }
}


export const Interview_ApplicantResult_Update_Thunk = (applicantId,jobId,result,recruiterId) => {
    return async(dispatch) => {
        try{
            const response = await api.patch(`/Jobs/interview/applicant/result/${applicantId}/${jobId}`,
               {
                result,
                recruiterId
               },
                {
                    withCredentials : true
                }
            )
            if(response){
                showAlert("Success",response?.data?.msg,"success")
                dispatch(InterviewsGet_Thunk())
            }
        } catch(err){
            console.log("Interview_ApplicantResult_Update_Thunk-Error",err.response?.data?.msg)
        }
    }
}


export const Interview_Status_Thunk = (id,result,CancelReason,applicantId,jobId) => {
    return async(dispatch) => {
        try{
            const response = await api.patch(`/Jobs/interviewStatus/Update/${id}`,
                {
                    result,
                    CancelReason,
                    applicantId,
                    jobId
                },
                {withCredentials : true}
            )
            if(response){
                showAlert("Success",response?.data?.msg,"success")
                dispatch(InterviewsGet_Thunk())
            }
        } catch(err){
            console.log("Interview_Status_Thunk-Error",err.response?.data?.msg)
        }
    }
}