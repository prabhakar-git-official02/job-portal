import { IsAllRecruitersSuccess,IsAllRecruitersFailure } from "../Redux/allRecruitersSlice"
import { IsAllJobseekersSuccess,IsAllJobseekersFailure } from "../Redux/allJobseekersSlice"
import api from "../api/axios"
import { showAlert } from "../Scripts/Alert"
import { allPostsThunk } from "./allPostsThunk"

// All Recruiters Get
export const allRecruiters_Get = () => {
    return async(dispatch) => {
        try{
            const response = await api.get('/admin/allRecruiters/Get',
                {withCredentials : true}
            )
            if(response){
                dispatch(IsAllRecruitersSuccess(response.data.data))
                return response
            }
        } catch(err){
            dispatch(IsAllRecruitersFailure(err.response?.data?.msg))
            console.log("allRecruiters_Get-Error",err.response?.data?.msg);
            
        }
    }
}

export const allJobseekers_Get = () => {
    return async(dispatch) => {
        try{
            const response = await api.get('/admin/allJobseekers/Get',
                {withCredentials : true}
            )
            if(response){
                dispatch(IsAllJobseekersSuccess(response.data.data))
                return response
            }
        } catch(err){
            dispatch(IsAllJobseekersFailure(err.response?.data?.msg))
            console.log("allJobseekers_Get-Error",err.response?.data?.msg);
        }
    }
}


export const Post_Status_Update = (status,id,recruiterId) => {
    return async(dispatch) => {
        try{
            const response = await api.patch(`/admin/recruiterPost/status/update/${id}`,
                {
                    status,
                    recruiterId
                },
                {withCredentials : true}
            )
            if(response){
                showAlert("Success",response?.data?.msg,"success")
                dispatch(allPostsThunk())
                dispatch(allRecruiters_Get())
                dispatch(allJobseekers_Get())
            }
        } catch(err){
            console.log("Post_Status_Update-Error",err.response?.data?.msg)
        }
    }
}