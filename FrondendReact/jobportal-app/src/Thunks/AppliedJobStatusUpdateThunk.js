import api from "../api/axios";
import { showAlert } from "../Scripts/Alert";
import { applicantGetAllThunk } from "./applicantThunk";

export const AppliedJobStatusUpdateThunk = (applicantId,jobid,Email,status) => {
    return async(dispatch) => {
    try{
    const response = await api.patch(
      `/Jobs/updateJob/status/${applicantId}/${jobid}`,
      {
        email : Email,
        status: status,
      },
      {
        withCredentials: true,
      },
    );

    if (response) {
      showAlert("Success", response?.data?.msg, "success");
      dispatch(applicantGetAllThunk())
    }
}catch(err){
    showAlert("AppliedJobStatusUpdateThunk-Error",err.response?.data?.msg)
}
    }
}