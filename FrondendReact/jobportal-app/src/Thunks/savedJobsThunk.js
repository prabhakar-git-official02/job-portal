import api from "../api/axios";
import { IsSavedJobsSuccess,IsSavedJobsFailure } from "../Redux/savedJobsSlice";
import { showAlert } from "../Scripts/Alert";


export const savedJobsThunk = () => {
    return async(dispatch) => {
        try{
            const response = await api.get('/Jobs/savedJob/Get',
                {withCredentials : true}
            )
            if(response){
                dispatch(IsSavedJobsSuccess(response.data.data))
                return response
            }
            
        } catch(err){
            dispatch(IsSavedJobsFailure(err.response?.data?.msg))
            console.log("Saved-Jobs-Get-Error",err.response?.data?.msg)
        }
    }
}

export const SavedJobsPostThunk = (SavedJob) => {
    return async(dispatch) => {
        try{
            const response = await api.post('/Jobs/savedJobs/post',
                SavedJob,
                {
                    withCredentials : true
                }
            )
            if(response){
                showAlert("Success",response.data.msg,"success")
                dispatch(savedJobsThunk())
                return response
            }
        } catch(err){
              showAlert("warning",err.response?.data?.msg,"warning");
            console.log("Saved-Jobs-Post-Error",err.response?.data?.msg)
        }
    }
}

export const SavedJobsRemoveThunk = (id) => {
    return async(dispatch) => {
        try{
            const response = await api.patch(`/Jobs/savedJob/delete/${id}`,
                {},
                {withCredentials : true}
            )
            if(response){
                showAlert("Success","Removed from Saved","success")
                dispatch(savedJobsThunk())
            }
        } catch(err){
            showAlert("Error",err.response?.data?.msg,"error")
            console.log("SaveJobDelete-Error",err.response?.data?.msg)
        }
    }
}