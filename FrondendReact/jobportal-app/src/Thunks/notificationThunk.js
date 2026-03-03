import api from "../api/axios"
import { IsNotificationSuccess,IsNotificationCountSuccess,IsNotificationFailure } from "../Redux/notificationSlice"
import { showAlert } from "../Scripts/Alert"
export const notificationGetThunk = () => {
    return async(dispatch) => {
        try{
            const response = await api.get('/Jobs/Recipient/Notification/Get',
                {
                    withCredentials : true
                }
            )
            if(response){
                dispatch(IsNotificationSuccess(response?.data?.data))
                dispatch(IsNotificationCountSuccess(response?.data?.count))
                return response
            }
        } catch(err){
            dispatch(IsNotificationFailure(err.response?.data?.msg))
            console.log("notificationGetThunk-Error",err.response?.data?.msg)
        }
    }
}

export const notificationDeleteThunk = (id) => {
    return async(dispatch) => {
        try{
            const response = await api.delete(`/Jobs/Notification/Delete/${id}`,
                {withCredentials : true}
            )
            if(response){
                showAlert("Success",response?.data?.msg,"success")
                dispatch(notificationGetThunk())
                return response
            }
        } catch(err){
            console.log("notificationDeleteThunk-Error",err.response?.data?.msg);
        }
    }
}