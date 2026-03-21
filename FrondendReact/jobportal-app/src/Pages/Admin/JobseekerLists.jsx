import MainNav from "../../Navbar/MainNav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allJobseekers_Get } from "../../Thunks/adminGetReqThunk";

import AddCallIcon from "@mui/icons-material/AddCall";
import MailIcon from "@mui/icons-material/Mail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchInput from "../../Components/SearchInput";
import DropDown from "../../Components/DropDown";

function JobseekerLists() {
  const dispatch = useDispatch();

  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");

  const [locationKey, setLocationKey] = useState("");
  const [qualificationKey, setQualificationKey] = useState("");

  useEffect(() => {
    dispatch(allJobseekers_Get());
  }, [dispatch]);

  const AllJobseekers = useSelector(
    (state) => state.allJobseekers.AllJobseekers,
  );

  const qualifications = [
    "All Qualifications",
    "10th",
    "12th",
    "ITI",
    "Diploma / Polytechnic",
    "UG - Any Degree",
    "B.E",
    "B.Tech",
    "B.Sc",
    "B.Com",
    "BCA",
    "BA",
    "BBA",
    "B.Pharm",
    "LLB",
    "MBBS",
    "BDS",
    "PG - Any Degree",
    "M.E",
    "M.Tech",
    "M.Sc",
    "M.Com",
    "MCA",
    "MBA",
    "M.Pharm",
    "PhD",
    "CA",
    "CS",
    "ICWA",
    "Other",
  ];

  const filteredJobseekers = AllJobseekers?.filter((r) => {
    const qualificationMatch =
      qualificationKey && qualificationKey !== "All Qualifications"
        ? r?.education?.some((e) =>
            e?.qualification
              ?.trim()
              .toLowerCase()
              .includes(qualificationKey.trim().toLowerCase()),
          )
        : true;

    const locationMatch =
      locationKey && locationKey !== ""
        ? r?.location
            ?.trim()
            .toLowerCase()
            .includes(locationKey.trim().toLowerCase())
        : true;

    return locationMatch && qualificationMatch;
  });

  return (
    <div className="container-fluid page-bg min-vh-100 px-0">
      {/* Navbar */}

      <div className="row m-0">
        <MainNav />
      </div>

      <br />
      <br />
      <br />

      {/* Content */}

      <div className="container py-4 px-3 px-md-4 px-lg-5 mt-5">
        {/* Title */}

        
        <div className="title-wrapper text-center mb-4">

<h2 className="dashboard-title">
Jobseekers <span>Profile</span>
</h2>

<p className="dashboard-subtitle">
Explore talented candidates and their professional profiles
</p>

</div>

        {/* Search */}

        <div className="d-flex justify-content-center justify-content-md-start mb-4">
          <SearchInput
            search={search}
            setSearch={setSearch}
            placeholder="Search jobseekers..."
          />
        </div>

        <div className="d-flex gap-2 flex-wrap mb-4">
          <DropDown
            datas={qualifications}
            dataName={qualificationKey}
            setDatas={setQualificationKey}
            classname="premium-dropdown"
            initialName="Filter Qualification"
          />

          <input
            type="text"
            placeholder="🔍 Filter Recruiter Location..."
            className="premium-input"
            value={locationKey}
            onChange={(e) => setLocationKey(e.target.value)}
          />
        </div>

        {/* Cards */}

        {/* Desktop Table */}
{!AllJobseekers ?   <div className="no-data-wrapper">
            <img
              src="nodata-image.avif"
              className="no-data-img"
              alt="nodata-image"
            />
            <h5>No records found</h5>
          </div> : 
        <div className="table-wrapper">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Jobseeker</th>
                <th>Job Type</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredJobseekers
                ?.filter((j) =>
                  `${j.firstName} ${j.lastName}`
                    .toLowerCase()
                    .includes(search.toLowerCase()),
                )
                .map((j) => (
                  <>
                    <tr key={j._id}>
                      <td className="user-cell">
                        <img
                          src={j?.profileImage?.url || "default-profile.jpg"}
                          className="profile-img-table"
                          alt="profile"
                        />

                        <div>
                          <div className="user-email">
                            {j.firstName} {j.lastName}
                          </div>

                          <div className="small text-muted">
                            <MailIcon fontSize="small" /> {j.email}
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="role-badge">
                          {j.jobType || "Jobseeker"}
                        </span>
                      </td>

                      <td>
                        <span className="auth-badge">{j.location || "-"}</span>
                      </td>

                      <td>
                        <button
                          className="view-btn"
                          onClick={() =>
                            setActiveId(activeId === j._id ? null : j._id)
                          }
                        >
                          {activeId === j._id ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>

                    {activeId === j._id && (
                      <tr>
                        <td colSpan="4">
                          <div className="details-box card p-5 m-3">
                            <div>
                              <b><AddCallIcon fontSize=""/></b> {j.phone || "Null"}
                            </div>
                            <div>
                              <b>Age:</b> {j.age || "Null"}
                            </div>
                            <div>
                              <b>Gender:</b> {j.gender || "Null"}
                            </div>
                            <div>
                              <b>Expected Salary:</b> {j.expectedSalary || "Null"}
                            </div>
                            <div>
                              <b>Experience Type:</b> {j.experienceType || "Null"}
                            </div>

                            <div className="mt-2">
                              <b><VisibilityIcon fontSize=""/></b>

                              <a
                                href={j?.resume?.url  || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-2"
                              >
                                View Resume
                              </a>
                            </div>

                            {/* Skills */}

                            <div className="mt-3">
                              <b>Skills:</b>

                              <ul className="skills-box">
                                {j.skills?.length > 0
                                  ? j.skills.map((s, i) => (
                                      <li key={i} className="skill-pill">
                                        {s  || "Null"}
                                      </li>
                                    ))
                                  : "Null"}
                              </ul>
                            </div>

                            {/* Education */}

                            <div className="mt-3">
                              <b>Education:</b>

                              {j.education?.length > 0
                                ? j.education.map((e) => (
                                    <div key={e._id} className="sub-card p-3 m-3 card page-bg">
                                      <div><strong>Qualification: </strong>{e.qualification  || "Null"}</div>

                                      <div className="small text-muted">
                                        <strong>Institute: </strong>{e.institute  || "Null"}
                                      </div>

                                      <div className="small text-muted">
                                        <strong>Years: </strong>
                                        {new Date(e?.yearStart  || "Null").getFullYear()} -
                                        {new Date(e?.yearEnd  || "Null").getFullYear()}
                                      </div>
                                    </div>
                                  ))
                                : "Null"}
                            </div>

                            {/* Experience */}

                            <div className="mt-3">
                              <b>Experience:</b>

                              {j.experience?.length > 0
                                ? j.experience.map((e) => (
                                    <div key={e._id} className="sub-card card p-3 m-3 page-bg">
                                      <div><strong>Company Name: </strong>{e.company  || "Null"}</div>

                                      <div className="small text-muted">
                                        <strong>Field: </strong>{e.field  || "Null"}
                                      </div>

                                      <div className="small text-muted">
                                        <strong>CTC: </strong> {e?.CTC  || "Null"}
                                      </div>

                                      <div className="small text-muted">
                                        <strong>Work Experience: </strong> {e?.workExperience  || "Null"}
                                      </div>

                                      <div className="small text-muted">
                                        <strong>Years: </strong>
                                        {new Date(e?.yearStart  || "Null").getFullYear()} -
                                        {new Date(e?.yearEnd || "Null").getFullYear()}
                                      </div>
                                    </div>
                                  ))
                                : "Null"}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
            </tbody>
          </table>
        </div>
}

        {/* Mobile Cards */}

        {!AllJobseekers ?   <div className="no-data-wrapper">
            <img
              src="nodata-image.avif"
              className="no-data-img"
              alt="nodata-image"
            />
            <h5>No records found</h5>
          </div> :

        <div className="mobile-users">
          {filteredJobseekers
            ?.filter((j) =>
              `${j.firstName} ${j.lastName}`
                .toLowerCase()
                .includes(search.toLowerCase()),
            )
            .map((j) => (
              <div key={j._id} className="mobile-user-card">
                <div className="mobile-user-header">
                  <img
                    src={j?.profileImage?.url || "default-profile.jpg"}
                    className="profile-img-mobile"
                    alt="profile"
                  />

                  <div>
                    <div className="mobile-user-email">
                      {j.firstName} {j.lastName}
                    </div>

                    <div className="small text-muted">
                      {j.jobType || "Jobseeker"}
                    </div>
                  </div>
                </div>

                <div className="mobile-user-body">
                  <div className="mobile-row">
                    <span>Email</span>
                    <span>{j.email}</span>
                  </div>

                  <div className="mobile-row">
                    <span>Location</span>
                    <span>{j.location || "-"}</span>
                  </div>
                </div>

                <button
                  className="view-btn mt-2"
                  onClick={() => setActiveId(activeId === j._id ? null : j._id)}
                >
                  {activeId === j._id ? "Hide Details" : "View Details"}
                </button>

                    {activeId === j._id && (
                          <div className="details-box card p-3 mt-3">
                            <div>
                              <b>Phone:</b> {j.phone || "Null"}
                            </div>
                            <div>
                              <b>Age:</b> {j.age || "Null"}
                            </div>
                            <div>
                              <b>Gender:</b> {j.gender || "Null"}
                            </div>
                            <div>
                              <b>Expected Salary:</b> {j.expectedSalary || "Null"}
                            </div>
                            <div>
                              <b>Experience Type:</b> {j.experienceType || "Null"}
                            </div>

                            <div className="mt-2">
                              <b>Resume:</b>

                              <a
                                href={j?.resume?.url  || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-2"
                              >
                                View Resume
                              </a>
                            </div>

                            {/* Skills */}

                            <div className="mt-3">
                              <b>Skills:</b>

                              <ul className="skills-box">
                                {j.skills?.length > 0
                                  ? j.skills.map((s, i) => (
                                      <li key={i} className="skill-pill">
                                        {s  || "Null"}
                                      </li>
                                    ))
                                  : "Null"}
                              </ul>
                            </div>

                            {/* Education */}

                            <div className="mt-3">
                              <b>Education:</b>

                              {j.education?.length > 0
                                ? j.education.map((e) => (
                                    <div key={e._id} className="sub-card p-3 mt-2 card page-bg">
                                      <div><strong>Qualification: </strong>{e.qualification  || "Null"}</div>

                                      <div className="small text-muted">
                                        <strong>Institute: </strong>{e.institute  || "Null"}
                                      </div>

                                      <div className="small text-muted">
                                        <strong>Years: </strong>
                                        {new Date(e?.yearStart  || "Null").getFullYear()} -
                                        {new Date(e?.yearEnd  || "Null").getFullYear()}
                                      </div>
                                    </div>
                                  ))
                                : "Null"}
                            </div>

                            {/* Experience */}

                            <div className="mt-3">
                              <b>Experience:</b>

                              {j.experience?.length > 0
                                ? j.experience.map((e) => (
                                    <div key={e._id} className="sub-card card p-3 mt-2 page-bg">
                                      <div><strong>Company Name: </strong>{e.company  || "Null"}</div>

                                      <div className="small text-muted">
                                        <strong>Field: </strong>{e.field  || "Null"}
                                      </div>

                                      <div className="small text-muted">
                                        <strong>CTC: </strong> {e?.CTC  || "Null"}
                                      </div>

                                      <div className="small text-muted">
                                        <strong>Work Experience: </strong> {e?.workExperience  || "Null"}
                                      </div>

                                      <div className="small text-muted">
                                        <strong>Years: </strong>
                                        {new Date(e?.yearStart  || "Null").getFullYear()} -
                                        {new Date(e?.yearEnd || "Null").getFullYear()}
                                      </div>
                                    </div>
                                  ))
                                : "Null"}
                            </div>
                          </div>
                    )}
              </div>
            ))}
        </div>
}
      </div>

      {/* Styles */}

      <style>{`
      .page-bg{
  background: linear-gradient(135deg,#f8fafc,#eef2f7);
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

.profile-img-table{
width:38px;
height:38px;
border-radius:10px;
object-fit:cover;
}

.profile-img-mobile{
width:38px;
height:38px;
border-radius:10px;
object-fit:cover;
}

.details-box{
background:#f9fafb;
padding:10px;
border-radius:10px;
font-size:13px;
line-height:1.7;
}

.table-wrapper{
background:white;
border-radius:16px;
box-shadow:0 10px 40px rgba(0,0,0,0.08);
overflow-x:auto;
}
/* Match dropdown height */

.premium-dropdown{

  height:42px;

  display:flex;
  align-items:center;

}

/* Mobile responsive */

@media(max-width:768px){

  .premium-input{

    width:100%;
    min-width:unset;

  }

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

 .premium-input{

  height:42px;
  min-width:220px;

  padding:0 14px;

  border-radius:10px;
  border:1px solid #e5e7eb;

  background: rgba(255,255,255,0.9);

  font-size:14px;

  outline:none;

  transition: all 0.25s ease;

}

/* Hover */

.premium-input:hover{

  border-color:#6366f1;

}

/* Focus */

.premium-input:focus{

  border-color:#4f46e5;

  box-shadow:
  0 0 0 3px rgba(79,70,229,0.15);

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
width:100%;
}

/* mobile card */

.mobile-user-card{
background:white;
border-radius:14px;
padding:16px;
margin-bottom:14px;
box-shadow:0 8px 25px rgba(0,0,0,0.06);

width:100%;
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

@media(max-width:992px){

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

export default JobseekerLists;
