import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authThunk } from "../Thunks/authThunk";
import LoadingPage from "./LoadingPage";


function PrivateLogin({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);        
  const [authChecked, setAuthChecked] = useState(false); 
  const [error, setError] = useState(null);         

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(authThunk());
        setError(null); 
      } catch (err) {
        console.log("PrivateLogin-AuthError:", err.message);
        setError("Network or auth error. Retrying...");
      } finally {
        setAuthChecked(true); 
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    if (authChecked && !loading && !error) {
      if (!user || !sessionStorage.getItem("tabSession")) {
        navigate("/login");
      }
    }
  }, [user, authChecked, loading, error, navigate]);

  if (loading) {
    return (
     <LoadingPage/>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-danger mb-3">{error}</p>
        <button
          className="btn btn-primary"
          onClick={() => {
            setLoading(true);
            setAuthChecked(false);
            setError(null);
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (user && sessionStorage.getItem("tabSession")) {
    return children;
  }

  return null;
}

export default PrivateLogin;
