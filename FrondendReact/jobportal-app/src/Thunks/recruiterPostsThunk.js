import api from "../api/axios";
import { IsRecruiterPostsSuccess,IsRecruiterPostsFailure } from "../Redux/recruiterPostsSlice";
import { showAlert } from "../Scripts/Alert";

export const recruiterPostsThunk = () => {
    return async(dispatch) => {
        try{
        const response = await api.get('/Jobs/recruiterPosts/Get',
            {withCredentials : true}
        )
        if(response){
             dispatch(IsRecruiterPostsSuccess(response.data.data))
             return response
        }
    }catch(err){
        dispatch(IsRecruiterPostsFailure(err.response?.data?.msg))
        console.log("Recruiter-Posts-Get-Error",err.response?.data?.msg)
    }
    }
}


export const recruiterPostUpdateThunk = (jobId,UpdateDatas) => {
    return async(dispatch) => {
        try{
            const response = await api.patch(`/Jobs/recruiter/Update/${jobId}`,
                UpdateDatas,
                {
                    withCredentials : true
                }
            )
            if(response){
                dispatch(recruiterPostsThunk())
                return response
            }
        } catch(err){
            console.log("recruiterPostUpdateThunk-Error",err.response?.data?.msg)
        }
    }
}


export const recruiterPostSkillAddThunk = (jobId,skill) => {
    return async(dispatch)=> {
        try{
            const response = await api.patch(`/Jobs/recruiterPost/skill/Add/${jobId}`,
                {
                    skill
                },
                {withCredentials : true}
            )
            if(response){
                dispatch(recruiterPostsThunk())
                return response
            }
        } catch(err){
            console.log("recruiterPostUpdateThunk-Error",err.response?.data?.msg);
        }
    }
}


export const recruiterPostSkillDeleteThunk = (jobId,skill) => {
    return async(dispatch) => {
        try{
            const response = await api.patch(`/Jobs/recruiterPost/skill/delete/${jobId}`,
                {
                    skill
                },
                {withCredentials : true}
            )
            if(response){
                dispatch(recruiterPostsThunk())
                return response
            }
        } catch(err){
            console.log("recruiterPostSkillDeleteThunk-Error",err.response?.data?.msg)
        }
    }
}