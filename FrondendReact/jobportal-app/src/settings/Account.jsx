import { authThunk } from "../Thunks/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { jobseekerProfileThunk } from "../Thunks/jobseekerProfileThunk";
import { recruiterProfileThunk } from "../Thunks/recruiterProfileThunk";
import { adminProfileThunk } from "../Thunks/adminProfileThunk";
import { LoginActivityThunk } from "../Thunks/LoginActivityThunk";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Account() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.roleData === "admin") {
      dispatch(adminProfileThunk());
    } else if (user?.roleData === "recruiter") {
      dispatch(recruiterProfileThunk());
    } else if (user?.roleData === "user") {
      dispatch(jobseekerProfileThunk());
    }
  }, [user, dispatch]);

  const JobseekerProfile = useSelector(
    (state) => state.jobseekerProfile.profile,
  );
  const RecruiterProfile = useSelector(
    (state) => state.recruiterProfile.profile,
  );
  const AdminProfile = useSelector((state) => state.adminProfile.profile);

  const Profile =
    user?.roleData === "admin"
      ? AdminProfile
      : user?.roleData === "recruiter"
        ? RecruiterProfile
        : user?.roleData === "user"
          ? JobseekerProfile
          : null;

  useEffect(() => {
    dispatch(LoginActivityThunk());
  }, [user, dispatch]);

  const date = new Date(user?.loginActivity).toLocaleString("en-IN");

  const loginHistory = useSelector((state) => state.loginActivity.loginHistory);

  console.log(`User Data`, user);

  console.log(`refreshTime`, date);

  const lastLogin =
    loginHistory?.loginHistory[loginHistory?.loginHistory.length - 1];
  const LastLogin = new Date(lastLogin).toLocaleString("en-IN");


  return (
    <>
      <div className="">
        <div className="account-header">
          <h1>
            <AccountCircleIcon sx={{ fontSize: 50 }} />
          </h1>
          <h2>Account Overview</h2>
        </div>

        <div className="account-body">
          {/* Profile Image & Name */}
          <div className="profile-section">
            <img
              src={
                user?.picture ??
                Profile?.profileImage?.url ??
                "default-profile.jpg"
              }
              alt="profile"
              className="profile-image"
            />
            <h3>
              {user?.name
                ? user.name
                : Profile?.firstName && Profile?.lastName
                  ? Profile?.firstName + " " + Profile?.lastName
                  : null}
            </h3>
          </div>

          {/* Info Section */}
          <div className="info-grid">
            <div>
              <label>Role</label>
              <p>{user?.roleData ? user?.roleData : "Role Not Found"}</p>
            </div>
            <div>
              <label>Email</label>
              <p>{user?.email ? user?.email : "Email Not Found"}</p>
            </div>
            <div>
              <label>Authentication</label>
              <p>
                {user?.authProvider
                  ? user?.authProvider
                  : "Authprovider Not Found"}
              </p>
            </div>
          </div>

          {/* Login Activity */}
          <div className="login-section">
            <h3>Login Activity</h3>
            <div className="login-info">
              <p>
                <strong>Status:</strong>{" "}
                <span className={user ? "active" : "inactive"}>
                  {user ? "User Logged" : "User not Logged"}
                </span>
              </p>
              <p>
                <strong>Last Login:</strong>{" "}
                {LastLogin ? LastLogin : "Last login Not Found"}
              </p>
              <p>
                <strong>Login Refresh:</strong>{" "}
                {date ? date : "Last Referesh not Found"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
      .account-wrapper {
        width: 100%;
        max-width: 900px;
        margin: auto;
        padding: 40px 20px;
      }

      .account-header {
        text-align: center;
        margin-bottom: 30px;
      }

      .account-header h2 {
        font-size: 28px;
        font-weight: 700;
        color: #1f3c88;
      }

      .account-body {
        display: flex;
        flex-direction: column;
        gap: 40px;
      }

      .profile-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }

      .profile-image {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #1f3c88;
      }

      .profile-section h3 {
        font-weight: 600;
        font-size: 22px;
        margin: 0;
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 25px;
        padding: 0 10px;
      }

      .info-grid div {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .info-grid label {
        font-weight: 600;
        color: #1f3c88;
        font-size: 15px;
      }

      .info-grid p {
        margin: 0;
        font-size: 14px;
        color: #444;
      }

      .login-section {
        background: #f8f9fc;
        padding: 25px 20px;
        border-radius: 10px;
      }

      .login-section h3 {
        font-size: 20px;
        margin-bottom: 15px;
        color: #1f3c88;
      }

      .login-info p {
        margin-bottom: 10px;
        font-size: 14px;
      }

      .active {
        color: #28a745;
        font-weight: 600;
      }

      .inactive {
        color: #dc3545;
        font-weight: 600;
      }

      /* ✅ Responsive */
      @media (max-width: 600px) {
        .profile-image {
          width: 100px;
          height: 100px;
        }

        .account-header h2 {
          font-size: 22px;
        }

        .profile-section h3 {
          font-size: 18px;
        }

        .login-section {
          padding: 20px 15px;
        }
      }
    `}</style>
    </>
  );
}

export default Account;
