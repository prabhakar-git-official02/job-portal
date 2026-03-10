import api from "../api/axios";
import { IsJobseekerProfileSuccess,IsJobseekerProfileFailure } from "../Redux/jobseekerProfileSlice";
import { showAlert } from "../Scripts/Alert";

// Jobseeker Profile Get
export const jobseekerProfileThunk = () => {
    return async(dispatch) => {
        try{
        const response = await api.get(
            '/profile/jobseeker-Profile/Get',
            {
                withCredentials : true
            }
        )
        if(response){
        dispatch(IsJobseekerProfileSuccess(response.data.data))
        return response
        }
    }catch(err){
        if(err.response?.data?.msg === 'Profile Not Found'){
            return dispatch(IsJobseekerProfileFailure(err.response?.data?.msg))
        }
      return console.log("JobseekerProfile-Get-Error",err?.response?.data?.msg)
    }}}



// Jobseeker Profile Field Update
export const jobseekerProfileUpdateThunk = (UpdateDatas,alertSts) => {
    return async(dispatch) => {
        try{
        const response = await api.patch('/profile/jobseeker-Profile/Update',
            UpdateDatas,
         {
            withCredentials : true
         }
        )

        if(response){
            dispatch(jobseekerProfileThunk())
            return response
        }
    } catch(err){
        showAlert("Error",err.response?.data?.msg,"error")
    }
    }
}


// Exp Field Index Add
export const jobseekerProfileExpAddThunk = (UpdateDatas,ProfileData) => {
return async(dispatch) => {
    try{

        const updatedList = [...(ProfileData?.experience || []),UpdateDatas]

        const response = await api.patch('/profile/jobseeker-Profile/Update',
            { 
                experience : updatedList      
            },
            {
                withCredentials : true
            }
        )
        if(response){
            dispatch(jobseekerProfileThunk())
        }
    } catch(err){
        showAlert("Error",err.response?.data?.msg,"error")
    }
}
}

// Experience Update
export const jobseekerProfileExpFieldUpdateThunk = (id,expId,UpdatedData) => {
    return async(dispatch) => {
    try{ 
        const response = await api.patch(`/profile/jobseeker-Profile/Update/Experience/Field/${id}/${expId}`,
            UpdatedData,
            {withCredentials : true}
        )
        if(response){
            dispatch(jobseekerProfileThunk())
            return response
        }
    } catch(err){
        showAlert("Error",err.response?.data?.msg,"error")
    }
    }
}


// Exp Field Index delete
export const jobseekerProfileExpDeleteIndexThunk = (indx) => {
    return async(dispatch) => {
        try{
        const response = await api.delete('/profile/jobseeker-Profile/Delete/Experience/Index',
            {
                data : {index : indx},
                withCredentials : true
            }
        )

        if(response){
            dispatch(jobseekerProfileThunk())
        }
    } catch(err){
        showAlert("Error",err.response?.data?.msg,"error")
    }
    }
}


// Exp Field Index Add
export const jobseekerProfileEduAddThunk = (UpdateDatas,ProfileData) => {
return async(dispatch) => {
    try{

        const updatedList = [...(ProfileData?.education || []),UpdateDatas]

        const response = await api.patch('/profile/jobseeker-Profile/Update',
            { 
                education : updatedList      
            },
            {
                withCredentials : true
            }
        )
        if(response){
            dispatch(jobseekerProfileThunk())
        }
    } catch(err){
        showAlert("Error",err.response?.data?.msg,"error")
    }
}
}


// Education Update
export const jobseekerProfileEduFieldUpdateThunk = (id,eduId,UpdatedData) => {
    return async(dispatch) => {
    try{ 
        const response = await api.patch(`/profile/jobseeker-Profile/Update/Education/Field/${id}/${eduId}`,
            UpdatedData,
            {withCredentials : true}
        )
        if(response){
            dispatch(jobseekerProfileThunk())
        }
    } catch(err){
        showAlert("Error",err.response?.data?.msg,"error")
    }
    }
}


// Education Field Index delete
export const jobseekerProfileEduDeleteIndexThunk = (indx) => {
    return async(dispatch) => {
        try{
        const response = await api.delete('/profile/jobseeker-Profile/Delete/Education/Index',
            {
                data : {index : indx},
                withCredentials : true
            }
        )

        if(response){
            dispatch(jobseekerProfileThunk())
        }
    } catch(err){
        showAlert("Error",err.response?.data?.msg,"error")
    }
    }
}

// skill delete 
export const jobseeker_Profile_skill_Delete_Thunk = (skill) => {
    return async(dispatch) => {
        try{
            const response = await api.patch('/profile/jobseeker-Profile/skill/delete',
                {skill},
                {withCredentials : true}
            )
            if(response){
                dispatch(jobseekerProfileThunk())
            }
        } catch(err){
            showAlert("Error",err.response?.data?.msg,"error")
        }
    }
}

// skills add
export const jobseeker_Profile_skill_Add_Thunk = (skill) => {
    return async(dispatch) => {
        try{
        const response = await api.patch('/profile/jobseeker-profile/skill/Add',
            {skill},
            {withCredentials : true}
        )
        if(response){
            dispatch(jobseekerProfileThunk())
        }
    } catch(err){
        showAlert("Error",err.response?.data?.msg,"error")
    }
    }
}