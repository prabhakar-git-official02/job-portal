import { allUsers_Get } from "../../Thunks/adminGetReqThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "../../Navbar/MainNav";
import { useNavigate } from "react-router-dom";

function UserLists() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(allUsers_Get());
  }, [dispatch]);

  const AllUsers = useSelector((state) => state.allUsers.Users);

  return (
    <div className="container-fluid page-bg min-vh-100 px-0">
      {/* Navbar */}

      <div className="row m-0">
        <MainNav />
      </div>

      <br />
      <br />
      <br />

      <div className="container py-4 px-3 px-md-4 px-lg-5 mt-5">
     

<div className="title-wrapper text-center mb-4">

<h2 className="dashboard-title">
Users <span>Directory</span>
</h2>

<p className="dashboard-subtitle">
Manage and monitor all platform users
</p>

</div>

{!AllUsers ?    <div className="no-data-wrapper">
            <img
              src="nodata-image.avif"
              className="no-data-img"
              alt="nodata-image"
            />
            <h5>No records found</h5>
          </div> : 


<div className="table-wrapper">
    {/* Desktop */}
  <table className="premium-table">
    <thead>
      <tr>
        <th>User</th>
        <th>Role</th>
        <th>Authorized</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {AllUsers?.map((user) => (
        <tr key={user._id}>
          <td className="user-cell">
            <div className="avatar">
              {user.email?.charAt(0).toUpperCase()}
            </div>

            <div className="user-email">{user.email}</div>
          </td>

          <td>
            <span className="role-badge">{user.role}</span>
          </td>

          <td>
            <span className="auth-badge">{user.authorizedType}</span>
          </td>

          <td>
            <button
              className="view-btn"
              onClick={() =>
                navigate(`/userPage?userId=${user?._id}&userRole=${user?.role}`)
              }
            >
              View
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
}

{!AllUsers ? <div className="no-data-wrapper">
            <img
              src="nodata-image.avif"
              className="no-data-img"
              alt="nodata-image"
            />
            <h5>No records found</h5>
          </div> : 
<div className="mobile-users">
  {AllUsers?.map((user) => (
    <div key={user._id} className="mobile-user-card">
      <div className="mobile-user-header">
        <div className="avatar">
          {user.email?.charAt(0).toUpperCase()}
        </div>

        <div className="mobile-user-email">{user.email}</div>
      </div>

      <div className="mobile-user-body">
        <div className="mobile-row">
          <span>Role</span>
          <span className="role-badge">{user.role}</span>
        </div>

        <div className="mobile-row">
          <span>Authorized</span>
          <span className="auth-badge">{user.authorizedType}</span>
        </div>
      </div>

      <button
        className="view-btn mt-2"
        onClick={() =>
          navigate(`/userPage?userId=${user?._id}&userRole=${user?.role}`)
        }
      >
        View Details
      </button>
    </div>
  ))}
</div>
}
 </div>



      <style>{`
.table-wrapper{
background:white;
border-radius:16px;
box-shadow:0 10px 40px rgba(0,0,0,0.08);
overflow-x:auto;
}

.no-data-wrapper {
  text-align: center;
  padding: 60px 20px;
  max-width: 500px;
  margin: 0 auto;
}

.no-data-img {
  width: 100%;
  max-width: 280px;
  height: auto;
  border-radius : 20px;
  object-fit: contain;
  opacity: 0.9;
  margin-bottom: 25px;
}

.no-data-title {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 8px;
}

.no-data-text {
  font-size: 14px;
  color: #888;
}

.dashboard-title{
font-size:32px;
font-weight:700;
letter-spacing:0.5px;
}

.dashboard-title span{
background:linear-gradient(135deg,#4f46e5,#6366f1);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.dashboard-subtitle{
color:#6b7280;
font-size:14px;
margin-top:4px;
}

.premium-table{
width:100%;
border-collapse:collapse;
}

.premium-table thead{
background:#f9fafb;
}

.premium-table th{
text-align:left;
padding:16px;
font-size:13px;
font-weight:600;
color:#6b7280;
border-bottom:1px solid #eee;
}

.premium-table td{
padding:16px;
border-bottom:1px solid #f1f1f1;
vertical-align:middle;
}

.premium-table tbody tr{
transition:0.25s;
}

.premium-table tbody tr:hover{
background:#f8fafc;
}

.user-cell{
display:flex;
align-items:center;
gap:12px;
}

.avatar{
width:38px;
height:38px;
border-radius:10px;
background:linear-gradient(135deg,#6366f1,#4f46e5);
color:white;
display:flex;
align-items:center;
justify-content:center;
font-weight:600;
}

.user-email{
font-weight:500;
font-size:14px;
}

.role-badge{
background:#eef2ff;
color:#4f46e5;
padding:5px 12px;
border-radius:20px;
font-size:12px;
font-weight:500;
}

.auth-badge{
background:#ecfdf5;
color:#059669;
padding:5px 12px;
border-radius:20px;
font-size:12px;
font-weight:500;
}

.view-btn{
background:#4f46e5;
color:white;
border:none;
padding:6px 14px;
border-radius:8px;
font-size:12px;
transition:0.25s;
}

.view-btn:hover{
background:#4338ca;
}

/* mobile cards hidden by default */
.mobile-users{
display:none;
}

/* mobile card */

.mobile-user-card{
background:white;
border-radius:14px;
padding:16px;
margin-bottom:14px;
box-shadow:0 8px 25px rgba(0,0,0,0.06);
}

.mobile-user-header{
display:flex;
align-items:center;
gap:10px;
margin-bottom:10px;
}

.mobile-user-email{
font-weight:600;
font-size:14px;
word-break:break-all;
}

.mobile-user-body{
margin-top:8px;
}

.mobile-row{
display:flex;
justify-content:space-between;
padding:6px 0;
font-size:13px;
border-bottom:1px solid #f1f1f1;
}

/* Responsive behavior */

@media(max-width:768px){

.table-wrapper{
display:none;
}

.mobile-users{
display:block;
}

}
`}</style>
    </div>
  );
}

export default UserLists;
