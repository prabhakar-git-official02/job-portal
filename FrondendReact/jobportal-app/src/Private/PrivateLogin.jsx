import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authThunk } from "../Thunks/authThunk";
import LoadingPage from "./LoadingPage";

function PrivateLogin({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const AuthStatus = useSelector((state) => state.auth.status)
  const [checked,setChecked] = useState(false)

   console.log("AuthStatus",AuthStatus)

useEffect(() => {
  const checkAuth = async () => {
    await dispatch(authThunk());
    setChecked(true);
  };
  checkAuth();
}, [dispatch]);

  useEffect(() => {

    if(AuthStatus === 500) return navigate('/networkError');

    if(!checked) return;
    

    if(!user){
      navigate('/login')
    }
  },[AuthStatus,checked,navigate,user]);

  if(!checked) return <LoadingPage/>;

  if(!user) return null

  return<>{children}</>
}

export default PrivateLogin;
