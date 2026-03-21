import { allRecruiters_Get } from "../../Thunks/adminGetReqThunk";
import { allJobseekers_Get } from "../../Thunks/adminGetReqThunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MainNav from "../../Navbar/MainNav";

function UserPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const UserId = query.get("userId");

  const UserRole = query.get("userRole");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allRecruiters_Get());
  }, [dispatch]);

  const AllRecruiters = useSelector(
    (state) => state.allRecruiters.AllRecruiters,
  );

  useEffect(() => {
    dispatch(allJobseekers_Get());
  }, [dispatch]);

  const AllJobseekers = useSelector(
    (state) => state.allJobseekers.AllJobseekers,
  );

  const UserDetails =
    UserRole === "recruiter"
      ? AllRecruiters?.find(
          (r) =>
            r?.recruiterId.trim().toLowerCase() === UserId.trim().toLowerCase(),
        )
      : UserRole === "user"
        ? AllJobseekers?.find(
            (j) =>
              j?.jobseekerId.trim().toLowerCase() ===
              UserId.trim().toLowerCase(),
          )
        : null;

  console.log(UserDetails);

  return (
    <div className="container-fluid premium-page">
      <MainNav />

      <div className="profile-container">
        {!UserDetails ? (
          <div className="no-data-wrapper">
            <img
              src="nodata-image.avif"
              className="no-data-img"
              alt="nodata-image"
            />
            <h5>No records found</h5>
          </div>
        ) : (
          <div className="premium-card">
            <div className="profile-banner"></div>

            <div className="profile-header">
              <img
                src={UserDetails?.profileImage?.url || "default-profile.jpg"}
                className="profile-avatar"
                alt="user-img"
              />

              <h2>
                {UserDetails?.firstName} {UserDetails?.lastName}
              </h2>

              <p className="bio">{UserDetails?.bio || "Bio not found"}</p>

              <span
                className={
                  UserDetails?.isActive ? "status active" : "status inactive"
                }
              >
                {UserDetails?.isActive ? "Active User" : "Inactive User"}
              </span>
            </div>

            <div className="profile-info-grid">
              <div className="info-box">
                <label>Email</label>
                <p>{UserDetails?.email || "Not Found"}</p>
              </div>

              <div className="info-box">
                <label>Phone</label>
                <p>{UserDetails?.phone || "Not Found"}</p>
              </div>

              <div className="info-box">
                <label>Age</label>
                <p>{UserDetails?.age || "Not Found"}</p>
              </div>

              <div className="info-box">
                <label>Gender</label>
                <p>{UserDetails?.gender || "Not Found"}</p>
              </div>

              <div className="info-box">
                <label>City</label>
                <p>{UserDetails?.location || "Not Found"}</p>
              </div>

              <div className="info-box">
                <label>State</label>
                <p>{UserDetails?.state || "Not Found"}</p>
              </div>

              <div className="info-box">
                <label>Country</label>
                <p>{UserDetails?.country || "Not Found"}</p>
              </div>

              <div className="info-box">
                <label>Profile Created</label>
                <p>{new Date(UserDetails?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="about-section">
              <h4>About</h4>
              <p>{UserDetails?.about || "No description available"}</p>
            </div>
          </div>
        )}
      </div>
      <style>{`
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
.premium-page{
background:#f4f7fb;
min-height:100vh;
}

.profile-container{
display:flex;
justify-content:center;
padding-top:120px;
padding-bottom:40px;
}

.premium-card{
width:100%;
max-width:850px;
background:white;
border-radius:20px;
box-shadow:0 15px 50px rgba(0,0,0,0.08);
overflow:hidden;
transition:0.3s;
}

.premium-card:hover{
transform:translateY(-5px);
}

.profile-banner{
height:140px;
background:linear-gradient(135deg,#6366f1,#4f46e5);
}

.profile-header{
text-align:center;
margin-top:-70px;
padding:0 20px 20px;
}

.profile-avatar{
width:130px;
height:130px;
border-radius:50%;
border:6px solid white;
object-fit:cover;
box-shadow:0 8px 20px rgba(0,0,0,0.2);
}

.profile-header h2{
margin-top:10px;
font-weight:600;
}

.bio{
color:#777;
font-size:14px;
margin-top:5px;
}

.status{
display:inline-block;
margin-top:10px;
padding:6px 14px;
border-radius:30px;
font-size:12px;
font-weight:600;
}

.status.active{
background:#e6f9ec;
color:#16a34a;
}

.status.inactive{
background:#ffecec;
color:#dc2626;
}

.profile-info-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
gap:18px;
padding:25px 30px;
}

.info-box{
background:#f9fafc;
border-radius:10px;
padding:12px 15px;
}

.info-box label{
font-size:12px;
color:#888;
display:block;
margin-bottom:4px;
}

.info-box p{
font-weight:500;
margin:0;
}

.about-section{
padding:20px 30px 30px;
border-top:1px solid #eee;
}

.about-section h4{
margin-bottom:10px;
}

.about-section p{
color:#666;
line-height:1.6;
}

.no-data-wrapper{
text-align:center;
padding:60px;
}

.no-data-img{
max-width:250px;
border-radius:15px;
margin-bottom:15px;
}

@media(max-width:600px){

.profile-banner{
height:110px;
}

.profile-avatar{
width:100px;
height:100px;
}

.profile-info-grid{
padding:20px;
}

}
`}</style>
    </div>
  );
}

export default UserPage;
