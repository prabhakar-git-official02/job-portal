import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../Scripts/emailValidation.js";
import { showAlert } from "../Scripts/Alert.js";
import ErrorAlert from "../Components/ErrorAlert";
import ProgressLoad from "../Components/ProgressLoad";
import MainNav from "../Navbar/MainNav.jsx";
function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Alertmsg, setAlertmsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isValidEmail(email)) {
      setLoading(false);
      setAlertmsg({
        msg: "Invalid Email!",
        id: Date.now(),
      });
      return;
    }
    const emailUP = email;
    if (emailUP !== email.toLowerCase()) {
      setLoading(false);
      setAlertmsg({
        msg: "Invalid Email!",
        id: Date.now(),
      });
      return;
    }
    if (role.length === 0) {
      setLoading(false);
      setAlertmsg({
        msg: "Role Required!",
        id: Date.now(),
      });
      return;
    }
    if (email.trim() === "") {
      setLoading(false);
      setAlertmsg({
        msg: "Email Required!",
        id: Date.now(),
      });
      return;
    }
    if (password.trim() === "") {
      setLoading(false);
      setAlertmsg({
        msg: "Password Required!",
        id: Date.now(),
      });
      return;
    }
    try {
      const response = await api.post(
        "/auth/register",
        {
          email: email,
          password: password,
          role: role,
        },
        { withCredentials: true },
      );
      if (response) {
        showAlert("Success", "Registered Successfully", "success");
        setLoading(false);
        setAlertmsg(null);
        setEmail("");
        setPassword("");
        setRole("");
        navigate("/login");
      }
    } catch (err) {
              setAlertmsg({
            msg : err?.response?.data?.msg,
            id : Date.now()
        })
      setLoading(false);
    }
  };

  return (
    <>
    <div className="container-fluid m-0 p-0">
      <MainNav Navbg={`#1e293b`}/>
      <br /><br /><br />
            <div className="row m-0 d-flex align-items-center m-0">
 <div className="ureg-container">
        <div className="ureg-wrapper">
          {/* LEFT PANEL */}
          <div className="ureg-left">
            <div className="ureg-brand">
              <h1>Create account</h1>

              <p>Join the platform and start your journey.</p>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="ureg-right">
            <div className="ureg-card">
              <h3 style={{ color: `white` }}>Register</h3>

              <span style={{ color: `white` }}>Create your new account</span>

              {/* ROLE SELECT */}
              <div className="ureg-role">
                <button
                  className={
                    role === "recruiter"
                      ? "ureg-role-btn active"
                      : "ureg-role-btn"
                  }
                  onClick={() => setRole("recruiter")}
                >
                  Recruiter
                </button>

                <button
                  className={
                    role === "user" ? "ureg-role-btn active" : "ureg-role-btn"
                  }
                  onClick={() => setRole("user")}
                >
                  Jobseeker
                </button>
              </div>

              {/* EMAIL */}
              <div className="ureg-field">
                <label>Email</label>

                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              <div className="ureg-field">
                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* BUTTON */}
              <ErrorAlert
                alertMsg={Alertmsg}
                buttonName={loading ? "Creating..." : "Create account"}
                buttonClass="ureg-btn"
                handlefn={register}
              />

              {loading && <p className="d-flex justify-content-center mt-3"><ProgressLoad textColor={`text-light`} trigger={1} msg="Please wait..."  setSize={`20px`}/></p>}

              <div className="ureg-footer">
                <span>Already registered?</span>

                <span onClick={() => navigate("/login")} className="ureg-link">
                  Sign in
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>  
      <style>{`
/* CONTAINER */
.ureg-container {
  min-height: 100vh;
  background: radial-gradient(circle at top, #0f172a, #020617);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* WRAPPER */
.ureg-wrapper {
  width: 100%;
  max-width: 1200px;
  min-height: 700px;
  display: flex;
  background: rgba(17, 24, 39, 0.7);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.15);
  box-shadow:
    0 10px 40px rgba(0,0,0,0.6),
    0 0 0 1px rgba(255,255,255,0.03);
}

/* LEFT PANEL */
.ureg-left {
  flex: 1;
  background:
    radial-gradient(circle at 20% 20%, rgba(99,102,241,0.25), transparent),
    radial-gradient(circle at 80% 80%, rgba(0,212,255,0.15), transparent),
    linear-gradient(135deg, #020617, #020617);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.ureg-brand h1 {
  color: white;
  font-size: 44px;
  font-weight: 700;
  letter-spacing: -1px;
}

.ureg-brand p {
  color: #9ca3af;
  margin-top: 10px;
  font-size: 15px;
}

/* RIGHT PANEL */
.ureg-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

/* CARD */
.ureg-card {
  width: 100%;
  max-width: 400px;
  animation: fadeSlide 0.6s ease;
}

/* ROLE BUTTONS */
.ureg-role {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.ureg-role-btn {
  flex: 1;
  padding: 12px;
  background: rgba(2,6,23,0.6);
  border: 1px solid rgba(255,255,255,0.05);
  color: #cbd5e1;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.25s;
}

.ureg-role-btn:hover {
  border-color: #6366f1;
  color: white;
}

.ureg-role-btn.active {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border: none;
  color: white;
  box-shadow: 0 0 15px rgba(99,102,241,0.5);
}

/* FIELD */
.ureg-field {
  margin-top: 20px;
}

.ureg-field label {
  color: #94a3b8;
  font-size: 14px;
}

.ureg-field input {
  width: 100%;
  padding: 13px;
  margin-top: 6px;
  background: rgba(2,6,23,0.6);
  border: 1px solid rgba(255,255,255,0.06);
  color: white;
  border-radius: 10px;
  transition: 0.25s;
}

.ureg-field input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 10px rgba(99,102,241,0.4);
  outline: none;
}

/* BUTTON */
.ureg-btn {
  margin-top: 28px;
  width: 100%;
  padding: 13px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
}

.ureg-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(99,102,241,0.4);
}

/* FOOTER */
.ureg-footer {
  margin-top: 20px;
  color: #94a3b8;
  font-size: 14px;
}

.ureg-link {
  color: #6366f1;
  margin-left: 5px;
  cursor: pointer;
}

.ureg-link:hover {
  text-decoration: underline;
}

/* ANIMATION */
@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* RESPONSIVE */

/* Tablet */
@media(max-width: 992px) {

  .ureg-wrapper {
    flex-direction: column;
    min-height: auto;
  }

  .ureg-left {
    display: none;
  }

  .ureg-right {
    padding: 20px;
  }

}

/* Mobile */
@media(max-width: 576px) {

  .ureg-container {
    padding: 10px;
  }

  .ureg-card {
    max-width: 100%;
  }

}
      `}</style>
    </>
  );
}

export default Register;
