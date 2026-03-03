import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationDeleteThunk,
  notificationGetThunk,
} from "../Thunks/notificationThunk";
import MainNav from "../Navbar/MainNav";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../Components/timeago";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

function Notifications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(notificationGetThunk());
  }, [dispatch]);

  const notifications = useSelector(
    (state) => state.notifications.notification,
  );

  const handleDelete = (id) => {
    dispatch(notificationDeleteThunk(id));
  };

  const getRedirectPath = (notif) => {
    // recipient - recruiter
    if (notif?.type === "job_applied")
      return `/postDetails/${notif?.relatedJobId}`;

    // recipient - jobseeker
    if (
      notif?.type === "interview_scheduled" ||
      notif?.type === "interview_cancelled"
    )
      return `/interviewCall/${notif?.relatedJobId}`;

    // recipient - jobseeker
    if (notif?.type === "application_status_updated")
      return `/jobDescription/${notif?.relatedJobId}`;

    if(notif?.type === "applicant_interviewCall_status")
      return `/interviewCallDescription/${notif?.senderId}/${notif?.relatedJobId}`;

    if(notif?.type === "recruiter_post_status")
      return `/postDetails/${notif?.relatedJobId}`
    return "#";


  };

  return (
    <div className="premium-notif-page">
      <MainNav />
      <br /><br />
      <div className="premium-notif-container ">
        {/* Header */}

        <div className="premium-header">
          <div className="premium-header-left">
            <div className="premium-icon-box">
              <NotificationsActiveIcon />
            </div>

            <div>
              <h2>Notifications</h2>
              <p>Your latest activity and updates</p>
            </div>
          </div>

          <span className="notif-count">{notifications?.length || 0}</span>
        </div>

        {/* List */}

        {!notifications?.length ? (
          <div className="premium-empty">
            <NotificationsActiveIcon style={{ fontSize: "60px" }} />

            <h4>No notifications yet</h4>

            <p>We'll notify you when something arrives</p>
          </div>
        ) : (
          <div className="premium-list">
            {notifications.map((notif) => (
              <div key={notif._id} className="premium-item">
                <div
                  className="premium-left"
                  onClick={() => navigate(getRedirectPath(notif))}
                >
                  {/* Avatar */}

                  <div className="premium-avatar">
                    {notif?.message?.charAt(0)}
                  </div>

                  {/* Content */}

                  <div className="premium-content">
                    <div className="premium-message">{notif?.message}</div>

                    <div className="premium-time">
                      {timeAgo(notif?.updatedAt)}
                    </div>
                  </div>
                </div>

                {/* Delete */}

                <IconButton
                  className="premium-delete"
                  onClick={() => handleDelete(notif._id)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`

.premium-notif-page{

min-height:100vh;

background:
linear-gradient(180deg,#f8fafc,#eef3f9);

}



.premium-notif-container{

max-width:850px;

margin:auto;

padding:90px 20px 40px;

}



/* Header */

.premium-header{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:25px;

}



.premium-header-left{

display:flex;

align-items:center;

gap:15px;

}



.premium-icon-box{

background:
linear-gradient(135deg,#4f46e5,#06b6d4);

color:white;

width:50px;

height:50px;

border-radius:12px;

display:flex;

align-items:center;

justify-content:center;

box-shadow:
0 10px 25px rgba(79,70,229,0.3);

}



.notif-count{

background:#111827;

color:white;

padding:6px 14px;

border-radius:20px;

font-weight:600;

}



/* List */

.premium-list{

display:flex;

flex-direction:column;

gap:12px;

}



/* Item */

.premium-item{

background:white;

border-radius:14px;

padding:16px;

display:flex;

justify-content:space-between;

align-items:center;

transition:0.3s;

border:1px solid #eef2f7;

}



.premium-item:hover{

transform:translateY(-4px);

box-shadow:
0 15px 35px rgba(0,0,0,0.08);

}



/* Left */

.premium-left{

display:flex;

align-items:center;

gap:15px;

cursor:pointer;

}



/* Avatar */

.premium-avatar{

width:42px;

height:42px;

border-radius:12px;

background:
linear-gradient(135deg,#6366f1,#06b6d4);

color:white;

font-weight:700;

display:flex;

align-items:center;

justify-content:center;

}



/* Content */

.premium-message{

font-weight:600;

}



.premium-time{

font-size:13px;

color:#6b7280;

margin-top:3px;

}



/* Delete */

.premium-delete{

opacity:0.5;

}



.premium-delete:hover{

opacity:1;

color:#ef4444;

}



/* Empty */

.premium-empty{

text-align:center;

margin-top:80px;

color:#6b7280;

}



`}</style>
    </div>
  );
}

export default Notifications;
