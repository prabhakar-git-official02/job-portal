import api from "../api/axios";
import { IsAllPostsSuccess,IsAllPostsFailure } from "../Redux/allPostsSlice";
export const allPostsThunk = () => {
    return async(dispatch) => {
        try{
        const response = await api.get('/Jobs/getAllPosts',
            {withCredentials : true}
        )
        if(response){
            dispatch(IsAllPostsSuccess(response.data.data))
            return response
        }
    } catch(err){
        dispatch(IsAllPostsFailure(err.response?.data?.msg))
        console.log("Posts-Get-Error",err.response?.data?.msg)
    }
    }
}