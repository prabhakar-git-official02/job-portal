import {  useState } from "react";
import { showAlert } from "../Scripts/Alert";
import api from "../api/axios";
import ErrorAlert from "../Components/ErrorAlert";
import { IsTokenSuccess,IsTokenFailure } from "../Redux/ResetTokenSlice";
import { useDispatch } from "react-redux";
import ProgressLoad from "../Components/ProgressLoad";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MainNav from "../Navbar/MainNav";
import { useNavigate } from "react-router-dom";

function ForgotPass(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [Alertmsg,setAlertmsg] = useState(null)
    const [loading,setLoading] = useState(false)


    const forgetPassword = async (e) => {
        e.preventDefault();
        setLoading(true)

        try{
        if (email.trim() === "") {
            setAlertmsg({
                msg: "Email Required!",
                id: Date.now(),
            })
            setLoading(false)
            return
        }
        const response = await api.post(
            "/auth/forgetPassword",
            {
                email: email,
            },
            {
                withCredentials: true,
            }
        );
        if (response) {
            dispatch(IsTokenSuccess(response.data.data))
           showAlert("Success",response.data.msg,"success")
           setLoading(false)
           setEmail("")
           setAlertmsg(null)
           
        }
    } catch(err){
        dispatch(IsTokenFailure(err.response?.data?.msg))
        setLoading(false)
        setAlertmsg({
            msg : err?.response?.data?.msg,
            id : Date.now()
        })
    }
    };

    return(
            <div className="container-fluid m-0 p-0">
              <MainNav Navbg={`#1e293b`}/>
              <div className="row m-0 d-flex align-items-center">
  <div className="forgot-container vh-100">

    <div className="forgot-wrapper">

      {/* LEFT */}
{/* LEFT */}
<div className="forgot-left">

  <div className="forgot-brand">

    <h1>
      Recover your
      <br/>
      <span>Account Access</span>
    </h1>

    <p>
      Don't worry. It happens.
      <br/>
      Enter your email and we'll send you a secure reset link
      to get back into your account instantly.
    </p>

  </div>

</div>


      {/* RIGHT */}
      <div className="forgot-right">

        <div className="forgot-card">

          <div>
            <div className="forgot-title">
              Forgot Password ?
            </div>

            <div className="forgot-sub">
              Enter your email to receive reset link
            </div>
          </div>


          <Box className="forgot-input">

            <TextField
              fullWidth
              type="email"
              label="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

          </Box>


          <div className="mt-3">

            <ErrorAlert
              alertMsg={Alertmsg}
              buttonName={"Send Reset Link"}
              buttonVariant={"contained"}
              buttonClass={"forgot-btn"}
              handlefn={forgetPassword}
            />

          </div>


          {loading && email && (
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
.forgot-container {
  min-height: calc(100vh - 70px);

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
.forgot-wrapper {

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


/* LEFT SIDE */
/* LEFT SIDE SLOGAN */
.forgot-left {

  flex: 1;

  background:
    radial-gradient(circle at 20% 30%, rgba(99,102,241,0.25), transparent),
    radial-gradient(circle at 80% 70%, rgba(0,212,255,0.15), transparent);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 60px;

}


/* BRAND CONTENT */
.forgot-brand {

  max-width: 420px;

}


.forgot-brand h1 {

  color: white;

  font-size: 40px;

  font-weight: 700;

  line-height: 1.2;

}


.forgot-brand span {

  background: linear-gradient(135deg,#6366f1,#00d4ff);

  -webkit-background-clip: text;

  -webkit-text-fill-color: transparent;

}


.forgot-brand p {

  color: #94a3b8;

  margin-top: 15px;

  font-size: 16px;

  line-height: 1.6;

}


/* RIGHT SIDE */
.forgot-right {

  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 50px;

}


/* CARD */
.forgot-card {

  width: 100%;
  max-width: 380px;

}


/* TITLE */
.forgot-title {

  color: white;

  font-size: 26px;

  font-weight: 600;

}

.forgot-sub {

  color: #94a3b8;

  font-size: 14px;

  margin-top: 5px;

}


/* INPUT */
.forgot-input {

  margin-top: 20px;

}

.forgot-input .MuiOutlinedInput-root {

  background: rgba(2,6,23,0.6);

  border-radius: 10px;

}

.forgot-input .MuiOutlinedInput-notchedOutline {

  border-color: rgba(255,255,255,0.08);

}

.forgot-input .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {

  border-color: #6366f1;

}

.forgot-input .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {

  border-color: #6366f1;

  box-shadow:
    0 0 10px rgba(99,102,241,0.4);

}

.forgot-input input {

  color: white;

}

.forgot-input label {

  color: #94a3b8;

}


/* BUTTON */
.forgot-btn {

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

.forgot-btn:hover {

  transform: translateY(-2px);

  box-shadow:
    0 10px 25px rgba(99,102,241,0.4);

}


/* MOBILE */
@media(max-width:992px){

  .forgot-left {
    display: none;
  }

  .forgot-wrapper {
    flex-direction: column;
  }

}
              `}</style>
            </div>
    )
}

export default ForgotPass