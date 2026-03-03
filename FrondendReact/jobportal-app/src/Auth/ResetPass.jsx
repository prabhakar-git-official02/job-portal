import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import ErrorAlert from "../Components/ErrorAlert";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { showAlert } from "../Scripts/Alert";
import { useNavigate } from "react-router-dom";
import MainNav from "../Navbar/MainNav";
import ProgressLoad from "../Components/ProgressLoad";
import { authThunk } from "../Thunks/authThunk";
import { useDispatch } from "react-redux";


function ResetPass() {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [SavebtnError, setSavebtnError] = useState(null)
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authThunk())
    },[dispatch])



    const { token } = useParams()
    console.log(token)
    // Reset password
    const ResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (newPassword.trim() === "") {
            setSavebtnError({
                msg: "New Password Required!",
                id: Date.now(),
            })
            setLoading(false)
            return
        }

    if (confirmPassword.trim() === "") {
            setSavebtnError({
                msg: "Confirm Password Required!",
                id: Date.now(),
            })
            setLoading(false)
            return
        }

        if (newPassword !== confirmPassword) {
                        setSavebtnError({
                msg: "New Password & Confirm Password does not matched!",
                id: Date.now(),
            })
            setLoading(false)
            return
        }
try{
        const response = await api.post(`/auth/reset-password/${token}`,
            {
                password: newPassword,
            },
            {
                withCredentials: true,
            }
        );
        if (response) {
            showAlert("Success", "Password Reserted Successfully", "success")
            setLoading(false)
            setNewPassword("")
            setConfirmPassword("")
             navigate("/")
            return;

        }
    } catch (err) {
        showAlert("Error", err.response?.data?.msg, "error")
        setLoading(false)
    }
};

return (
<div className="container-fluid m-0 p-0">
    <MainNav Navbg={`#1e293b`}/>
    <div className="row m-0 d-flex align-items-center">
  <div className="reset-container">

    <div className="reset-wrapper">

      {/* LEFT SLOGAN */}
      <div className="reset-left">

        <div className="reset-brand">

          <h1>
            Create your new
            <br/>
            <span>Secure Password</span>
          </h1>

          <p>
            Your security is our priority.
            <br/>
            Set a strong password to protect your account
            and continue your journey safely.
          </p>

        </div>

      </div>


      {/* RIGHT FORM */}
      <div className="reset-right">

        <div className="reset-card">

          <div className="reset-title">
            Reset Password
          </div>

          <div className="reset-sub">
            Enter your new password below
          </div>


          <Box className="reset-input">

            <TextField
              fullWidth
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
            />

          </Box>


          <Box className="reset-input">

            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />

          </Box>


          <ErrorAlert
            alertMsg={SavebtnError}
            buttonName={"Save Password"}
            buttonVariant={"contained"}
            buttonClass={"reset-btn"}
            handlefn={ResetPassword}
          />

                    {loading && newPassword  && confirmPassword && (
                      <div className="mt-3 d-flex justify-content-center">
                        <ProgressLoad trigger={1} textColor={`text-light`} msg="Sending..." setSize="20px"/>
                      </div>
                    )}

        </div>

      </div>

    </div>

  </div>
    </div>
    <style>{`
    /* CONTAINER */
.reset-container {

  min-height: 100vh;

  background:
    radial-gradient(circle at 10% 20%, rgba(99,102,241,0.15), transparent),
    radial-gradient(circle at 90% 80%, rgba(0,212,255,0.12), transparent),
    #020617;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

}


/* WRAPPER */
.reset-wrapper {

  width: 100%;
  max-width: 1100px;

  display: flex;

  background: rgba(17,24,39,0.65);

  backdrop-filter: blur(25px);

  border-radius: 20px;

  overflow: hidden;

  border: 1px solid rgba(255,255,255,0.06);

  box-shadow:
    0 20px 60px rgba(0,0,0,0.7);

}


/* LEFT SLOGAN */
.reset-left {

  flex: 1;

  background:
    radial-gradient(circle at 20% 30%, rgba(99,102,241,0.25), transparent),
    radial-gradient(circle at 80% 70%, rgba(0,212,255,0.15), transparent);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 60px;

}

.reset-brand h1 {

  color: white;

  font-size: 40px;

  font-weight: 700;

  line-height: 1.2;

}

.reset-brand span {

  background: linear-gradient(135deg,#6366f1,#00d4ff);

  -webkit-background-clip: text;

  -webkit-text-fill-color: transparent;

}

.reset-brand p {

  color: #94a3b8;

  margin-top: 15px;

  font-size: 16px;

  line-height: 1.6;

}


/* RIGHT FORM */
.reset-right {

  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 50px;

}

.reset-card {

  width: 100%;
  max-width: 380px;

}


/* TITLE */
.reset-title {

  color: white;

  font-size: 26px;

  font-weight: 600;

}

.reset-sub {

  color: #94a3b8;

  font-size: 14px;

  margin-top: 5px;

}


/* INPUT */
.reset-input {

  margin-top: 20px;

}

.reset-input .MuiOutlinedInput-root {

  background: rgba(2,6,23,0.6);

  border-radius: 10px;

}

.reset-input .MuiOutlinedInput-notchedOutline {

  border-color: rgba(255,255,255,0.08);

}

.reset-input .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {

  border-color: #6366f1;

}

.reset-input .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {

  border-color: #6366f1;

  box-shadow: 0 0 10px rgba(99,102,241,0.4);

}

.reset-input input {

  color: white;

}

.reset-input label {

  color: #94a3b8;

}


/* BUTTON */
.reset-btn {

  margin-top: 25px;

  width: 100%;

  padding: 12px;

  background: linear-gradient(135deg,#6366f1,#4f46e5);

  border-radius: 10px;

  color: white;

  font-weight: 600;

  border: none;

  cursor: pointer;

  transition: 0.25s;

}

.reset-btn:hover {

  transform: translateY(-2px);

  box-shadow: 0 10px 25px rgba(99,102,241,0.4);

}


/* MOBILE */
@media(max-width:992px){

  .reset-left {
    display: none;
  }

  .reset-wrapper {
    flex-direction: column;
  }

}
    `}</style>
</div>
);
}

export default ResetPass;
