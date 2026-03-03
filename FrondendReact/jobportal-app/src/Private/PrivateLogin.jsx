import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authThunk } from "../Thunks/authThunk";

function PrivateLogin({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true); // track auth check

  useEffect(() => {
   
    const fetchUser = async () => {
      await dispatch(authThunk());
      setLoading(false); 
    };
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (!user || !sessionStorage.getItem("AuthProvider")) {
        navigate("/login");
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (user && sessionStorage.getItem("AuthProvider")) {
    return children;
  }

  return null;
}

export default PrivateLogin;
