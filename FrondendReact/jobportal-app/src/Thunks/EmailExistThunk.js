import { loginSuccess } from "../Redux/authSlice";
import { showAlert } from "../Scripts/Alert";
import { EmailExistAction,EmailExistRole } from "../Redux/authSlice";
import api from "../api/axios";


export const EmailExistThunk = (token) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        "/auth/existEmail",
        {
          token,
        },
        {
          withCredentials: true,
        },
      );

      if(response.data.emailExist === true){
         dispatch(EmailExistAction(true))
         dispatch(EmailExistRole(response.data.roleData))
         return
      } 

      if(response.data.emailExist === false){
         dispatch(EmailExistAction(false))
         dispatch(EmailExistRole(response.data.roleData))
         return
      }
    } catch (err) {
     console.log("Email-Exist-Error",err?.response?.data?.msg)
    }
  };
};

export const GoogleApiCallThunk = (token,Role) =>  {
    return async(dispatch) => {
                try {
          const response = await api.post("/auth/googleAuthLogin",
            {
              token,
              Role,
            },
            {
              withCredentials: true,
            },
          );


          if (response) {;
             try{
               const response = await api.post('/auth/loginActivity',
              {},
               {withCredentials : true}
                )
             if(response){
                  showAlert("Success","Login Success","success")
                 }
             } catch(err){
               console.log("Google-Login-API-Error",err?.response?.data?.msg)
                }

    dispatch(loginSuccess(response?.data?.user));
            sessionStorage.setItem(
          "tabSession",
          "active",
            );
            showAlert("Success", response?.data?.msg, "success");
            dispatch(EmailExistAction(null))
            dispatch(EmailExistRole(null))
            return response
          }
        } catch (err) {
          console.log("Google-Login-Error",err?.response?.data?.msg)
          throw err
        }
    }
}
