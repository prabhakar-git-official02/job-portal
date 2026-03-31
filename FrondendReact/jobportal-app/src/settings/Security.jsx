import { useState } from "react";
import { showAlert } from "../Scripts/Alert";
import api from "../api/axios";
import ErrorAlert from "../Components/ErrorAlert";
import { IsTokenSuccess, IsTokenFailure } from "../Redux/ResetTokenSlice";
import { useDispatch, useSelector } from "react-redux";
import ProgressLoad from "../Components/ProgressLoad";
import SecurityIcon from '@mui/icons-material/Security';
import Button from "@mui/material/Button";
import RefreshIcon from '@mui/icons-material/Refresh';

function Security() {
  const dispatch = useDispatch();


  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgetAlertmsg, setForgetAlertmsg] = useState(null);
  const [resetAlertmsg, setResetAlertmsg] = useState("");
  const [forgetloading, setForgetLoading] = useState(false);
  const [resetloading, setResetLoading] = useState(false);
 const [captcha, setCaptcha] = useState(null);
 const [captchaIp,setCaptchaIp] = useState("")
 const [captchaLoading,setCaptchaLoading] = useState(false)
 const [captchaError,setCaptchaError] = useState(null)


  const ResetLink = useSelector((state) => state.resetToken.token);

  console.log("Reset-Link",ResetLink);


  // forget password
  const forgetPassword = async (e) => {
    e.preventDefault();
    setForgetLoading(true);

    try {
      if (email.trim() === "") {
        setForgetAlertmsg({
          msg: "Email Required!",
          id: Date.now(),
        });
        setForgetLoading(false);
        return;
      }
      const response = await api.post(
        "/auth/forgetPassword",
        {
          email: email,
        },
        {
          withCredentials: true,
        },
      );
      if (response) {
        dispatch(IsTokenSuccess(response?.data?.data));
        setForgetLoading(false);
        setEmail("");
        setForgetAlertmsg(null);
      }
    } catch (err) {
      dispatch(IsTokenFailure(err.response?.data?.msg));
      setForgetLoading(false);
      setForgetAlertmsg({
        msg: err?.response?.data?.msg,
        id: Date.now(),
      });
    }
  };

  
  const CleanLink = ResetLink?.replace("https://job-portal-zeta-bice.vercel.app/", "");

  const resetPassword = async (e) => 
    {
    e.preventDefault();
    setResetLoading(true);

    try {
      if (newPassword.trim() === "") {
        setResetAlertmsg({
          msg: "New Password Required!",
          id: Date.now(),
        });
        setResetLoading(false);
        return;
      }

      if (confirmPassword.trim() === "") {
        setResetAlertmsg({
          msg: "Confirm Password Required!",
          id: Date.now(),
        });
        setResetLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        setResetAlertmsg({
          msg: "Passwords does not match!",
          id: Date.now(),
        });
        setResetLoading(false);
        return;
      }

      const response = await api.post(
        `/auth/${CleanLink}`,
        {
          password: newPassword,
        },
        {
          withCredentials: true,
        },
      );
      if (response) {
        dispatch(IsTokenSuccess(null));
        showAlert("Success", response.data.msg, "success");
        setResetLoading(false);
        setNewPassword("");
        setConfirmPassword("");
        setResetAlertmsg(null);
      }
    } catch (err) {
      dispatch(IsTokenFailure(err.response?.data?.msg));
      setResetLoading(false);
      setResetAlertmsg({
        msg: err?.response?.data?.msg,
        id: Date.now(),
      });
    }
  };

  const generateCaptcha = () => {
    try{
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let value = "";
    for (let i = 0; i < 6; i++) {
      value += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(value);
  }catch(err){
    console.log("generateCaptcha-Error",err.message)
  }
  };

  const getRandomColor = () => {
    const colors = ["red", "blue", "green", "purple", "orange", "brown"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

// sign out
const SignOut = async () => {
  try {

    setCaptchaLoading(true)

    if (captchaIp.trim() === "") {
      setCaptchaError({
        msg: 'Captcha Required',
        id: Date.now()
      })
      setCaptchaLoading(false)
      return
    }

    if (captchaIp.trim().toLowerCase() !== captcha.trim().toLowerCase()) {
      setCaptchaError({
        msg: 'Captcha not matched',
        id: Date.now()
      })
      setCaptchaLoading(false)
      return
    }

    const response = await api.delete('/auth/logout', {
      withCredentials: true
    })

    if (response) {
      setCaptchaLoading(false)
      window.location.href = "/"
    }

  } catch (err) {
    showAlert("Error", "Sign Out Failed.Try again later", "error")
    setCaptchaLoading(false)
    console.log(" SignOut-Error", err.response?.data?.msg)
  }
}

  return (
  <div className="lux-security-root">
    <div className="lux-security-wrapper">

      {/* Header */}
      <div className="lux-header">

        <div className="lux-icon">
          <SecurityIcon sx={{ fontSize: 50 }} />
        </div>

        <h1>Security Center</h1>

        <p>
          Protect your account with advanced security controls
        </p>

      </div>


      <div className="lux-grid">


        {/* Password Card */}
        <div className="lux-card">

          <h2>Password Recovery</h2>

          {!ResetLink ? (
            <>
              <div className="lux-field">

                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

              {forgetloading &&
                <ProgressLoad trigger={1} setSize="20px" msg="Processing..." /> 
              }

              <ErrorAlert
                buttonName="Send Reset Link"
                alertMsg={forgetAlertmsg}
                handlefn={forgetPassword}
                buttonClass="lux-btn"
              />

            </>
          ) :
          ResetLink ? (
            <>
              <div className="lux-field">

                <label>New Password</label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

              </div>


              <div className="lux-field">

                <label>Confirm Password</label>

                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

              </div>


              {resetloading &&
                <ProgressLoad trigger={1} setSize="20px" msg="Updating..." />
              }

              <ErrorAlert
                buttonName="Update Password"
                alertMsg={resetAlertmsg}
                handlefn={resetPassword}
                buttonClass="lux-btn"
              />

            </>
          ) : null}

        </div>


        {/* Signout Card */}
        <div className="lux-card danger">

          <h2>Secure Log Out</h2>
          {captcha ? 
          <div>

                    {captcha && (

            <div className="lux-captcha">

              {captcha.split("").map((char, i) => (
                <span key={i}
                  style={{ color: getRandomColor() }}>
                  {char}
                </span>
              ))}
              <span style={{cursor : `pointer`}} onClick={() => generateCaptcha()}><RefreshIcon/></span>
            </div>

          )}


          <div className="lux-field">
            <input
              type="text"
              placeholder="Enter captcha"
              value={captchaIp}
              onChange={(e) => setCaptchaIp(e.target.value)}
            />

          </div>
          </div> : null
             }

          {captchaLoading ? 
            <ProgressLoad trigger={1} setSize="20px" msg="Verifying..." /> : null
          }

          {captcha ? 
          <div>
          <ErrorAlert
            buttonName="Logout"
            alertMsg={captchaError}
            handlefn={SignOut}
            buttonClass="btn lux-danger-btn mt-3"
          />
          </div> : 
          <div>
            <p className="text-danger">Click logout to sign out of your account.</p>
            <Button variant="contained" onClick={generateCaptcha} color="error">Logut</Button>
          </div>
            }

        </div>

      </div>

    </div>
<style>{ `
.lux-security-root {
  color: black;
}

.lux-card {
color : white;
  background:
    radial-gradient(circle at top, #1a1a2e, #0f0f1a);

  border-radius: 20px;
  height : max-content;
  padding: 25px;
  border: 1px solid rgba(255,215,0,0.15);

  box-shadow:
    0 0 40px rgba(0,0,0,0.6),
    inset 0 0 20px rgba(255,215,0,0.05);

  transition: 0.4s;
}



.lux-security-wrapper {

  max-width: 1300px;

  margin: auto;

}


.lux-header {

  text-align: center;

  margin-bottom: 50px;

}


.lux-icon {

  background: linear-gradient(135deg,#FFD700,#C9A227);

  width: 90px;

  height: 90px;

  border-radius: 20px;

  display: flex;

  align-items: center;

  justify-content: center;

  margin: auto;

  margin-bottom: 20px;

  color: black;

}


.lux-header h1 {

  font-size: 40px;

  font-weight: 700;

  letter-spacing: 1px;

}


.lux-header p {

  opacity: 0.7;

}

.lux-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(400px,1fr));
  gap:30px
}




.lux-card:hover {

  transform: translateY(-8px);

  box-shadow:
    0 0 60px rgba(255,215,0,0.2);

}


.lux-card h2 {

  margin-bottom: 25px;

  font-size: 24px;

}


.lux-field {

  display: flex;

  flex-direction: column;

  margin-bottom: 18px;

}


.lux-field label {

  margin-bottom: 6px;

  font-size: 14px;

  opacity: 0.8;

}


.lux-field input {

  padding: 14px;

  border-radius: 10px;

  border: 1px solid rgba(255,215,0,0.2);

  background: rgba(0,0,0,0.4);

  color: white;

  outline: none;

}


.lux-field input:focus {

  border: 1px solid gold;

  box-shadow: 0 0 10px gold;

}


.lux-btn {

  width: 100%;

  padding: 14px;

  border-radius: 12px;

  border: none;

  background: linear-gradient(135deg,#FFD700,#C9A227);

  color: black;

  font-weight: 600;

  margin-top: 10px;

  cursor: pointer;

  transition: 0.3s;

}


.lux-btn:hover {

  transform: scale(1.03);

}


.lux-danger-btn {

  background: linear-gradient(135deg,#ff4b2b,#ff0000);

  color: white;

}


.lux-generate {

  color: gold;

  cursor: pointer;

  margin-bottom: 15px;

  font-weight: 600;

}


.lux-captcha {

  font-size: 30px;

  letter-spacing: 8px;

  margin-bottom: 15px;

  font-weight: bold;

}


@media(max-width:768px){

  .lux-header h1 {

    font-size: 28px;

  }

  .lux-grid {

    grid-template-columns: 1fr;

  }

}
`}</style>
  </div>
);
}

export default Security;
