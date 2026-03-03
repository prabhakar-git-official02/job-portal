import api from "../api/axios"

export const ErraseLoginThunk = () => {
    return async(dispatch) => {
        try{
               const response = await api.delete('/auth/logout',
                    {withCredentials : true}
                )
                if(response){
                    console.log("ErraseLoginThunk-Success",response?.data?.msg)
                }
            } catch(err){
                console.log(`ErraseLoginThunk-Error`,err.response?.data?.msg)
            }
    }
}