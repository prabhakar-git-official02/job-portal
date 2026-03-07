import MainNav from "../../Navbar/MainNav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allRecruiters_Get } from "../../Thunks/adminGetReqThunk";
import AddCallIcon from "@mui/icons-material/AddCall";
import MailIcon from "@mui/icons-material/Mail";
import SearchInput from "../../Components/SearchInput";
import DropDown from "../../Components/DropDown";

function RecruiterLists() {

  const dispatch = useDispatch();

  const [activeId, setActiveId] = useState(null);

  const [search,setSearch] = useState("");
  const [industryKey,setIndustryKey] = useState("");
  const [locationKey,setLocationKey] = useState("");
  const [companySizeKey,setCompanySizeKey] = useState("");
  const [designationKey,setDesignationKey] = useState("");

  useEffect(() => {
    dispatch(allRecruiters_Get());
  }, [dispatch]);

  const AllRecruiters = useSelector(
    (state) => state.allRecruiters.AllRecruiters,
  );

console.log(AllRecruiters)

  const industries = [
    "All Industrys",
    "Information Technology",
    "Software Development",
    "Artificial Intelligence",
    "Cybersecurity",
    "Data Science",
    "Healthcare",
    "Finance",
    "Education",
    "Construction",
  ];

  const companySizes = [
    "All Company Sizes",
    "1-10 Employees",
    "11-50 Employees",
    "51-200 Employees",
    "201-500 Employees",
    "1000+ Employees",
  ];

  const recruiterDesignations = [
    "All Designation",
    "HR Intern",
    "HR Executive",
    "HR Manager",
    "Technical Recruiter",
    "Talent Acquisition Manager",
  ];

  /* ---------- Filter Logic ---------- */

  const filteredRecruiters = AllRecruiters?.filter((r) => {

    const industryMatch =
      industryKey && industryKey !== "All Industrys"
        ? r?.industry === industryKey
        : true;

    const companyMatch =
      companySizeKey && companySizeKey !== "All Company Sizes"
        ? r?.companySize === companySizeKey
        : true;

    const designationMatch =
      designationKey && designationKey !== "All Designation"
        ? r?.designation === designationKey
        : true;

    const locationMatch =
      locationKey && locationKey !== ""
        ? r?.location?.trim().toLowerCase().includes(locationKey.trim().toLowerCase())
        : true;

    return (
      industryMatch &&
      companyMatch &&
      designationMatch &&
      locationMatch 
    );

  });


  return (

    <div className="container-fluid page-bg min-vh-100 px-0">

      {/* Navbar */}

      <div className="row m-0">
        <MainNav />
      </div>

      <br /><br /><br />

      {/* Content */}

      <div className="container py-4 px-3 px-md-4 px-lg-5 mt-5">

        {/* Title */}

        <div className="title-wrapper text-center mb-4">

<h2 className="dashboard-title">
Recruiters <span>Profile</span>
</h2>

<p className="dashboard-subtitle">
Discover recruiters and connect with top companies
</p>

</div>

        {/* Search */}

        <div className="d-flex justify-content-center justify-content-md-start mb-3">

          <SearchInput
            search={search}
            setSearch={setSearch}
            placeholder="Search recruiters..."
          />

        </div>


        {/* Filters */}
<div className="filter-container d-flex flex-wrap gap-2 mb-4">
  <DropDown
    datas={companySizes}
    dataName={companySizeKey}
    setDatas={setCompanySizeKey}
    classname="premium-dropdown"
    initialName="Filter Company Size"
  />

  <DropDown
    datas={industries}
    dataName={industryKey}
    setDatas={setIndustryKey}
    classname="premium-dropdown"
    initialName="Filter Industry"
  />

  <DropDown
    datas={recruiterDesignations}
    dataName={designationKey}
    setDatas={setDesignationKey}
    classname="premium-dropdown"
    initialName="Filter Designation"
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
{!AllRecruiters?        <div className="no-data-wrapper">
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
        <th>Recruiter</th>
        <th>Designation</th>
        <th>Company</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {filteredRecruiters
        ?.filter((r) =>
          `${r.firstName} ${r.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .map((r) => (
          <>
          <tr key={r._id}>

            <td className="user-cell">

              <img
                src={r?.profileImage?.url}
                className="profile-img-table"
                alt="profile"
              />

              <div>
                <div className="user-email">
                  {r.firstName} {r.lastName}
                </div>

                <div className="small text-muted">
                  <span><MailIcon fontSize=""/></span><span className="mx-1">{r.email}</span>
                </div>
              </div>

            </td>

            <td>
              <span className="role-badge">{r.designation}</span>
            </td>

            <td>
              <span className="auth-badge">{r.companyName}</span>
            </td>

            <td>
              <button
                className="view-btn"
                onClick={() =>
                  setActiveId(activeId === r._id ? null : r._id)
                }
              >
                {activeId === r._id ? `Hide` : "View"}
              </button>
            </td>
          </tr>
         {activeId === r._id && (
<tr>
<td colSpan="4">
<div className="details-box mt-2 card p-4">
         
            <div><b>Bio: </b>{r?.bio || "Null"}</div>
            <div><b>About: </b>{r?.about || "Null"}</div>
            <div><b><AddCallIcon fontSize=""/></b> {r.phone || "Null"}</div>
            <div><b>Age:</b> {r.age || "Null"}</div>
            <div><b>Gender:</b> {r.gender || "Null"}</div>
            <div><b>City/Town:</b> {r.location || "Null"}</div>
            <div><b>State:</b> {r.state || "Null"}</div>
            <div><b>Country:</b> {r.country || "Null"}</div>
            <div><b>Industry:</b> {r.industry || "Null"}</div>
            <div><b>Company Size:</b> {r.companySize || "Null"}</div>
            <div><b>Company Website:</b> {r.companyWebsite || "Null"}</div>
            <div><b>Company Address:</b> {r.companyAddress || "Null"}</div>
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


{!AllRecruiters ?      
  <div className="no-data-wrapper">
            <img
              src="nodata-image.avif"
              className="no-data-img"
              alt="nodata-image"
            />
            <h5>No records found</h5>
          </div> :
<div className="mobile-users">

  {filteredRecruiters
    ?.filter((r) =>
      `${r.firstName} ${r.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .map((r) => (

      <div key={r._id} className="mobile-user-card">

        <div className="mobile-user-header">

          <img
            src={r?.profileImage?.url}
            className="profile-img-mobile"
            alt="profile"
          />

          <div>

            <div className="mobile-user-email">
              {r.firstName} {r.lastName}
            </div>

            <div className="small text-muted">
              {r.companyName}
            </div>

          </div>

        </div>


        <div className="mobile-user-body">

          <div className="mobile-row">
            <span>Designation</span>
            <span className="role-badge">{r.designation}</span>
          </div>

          <div className="mobile-row">
            <span>Email</span>
            <span><span><MailIcon fontSize=""/></span><span className="mx-1">{r.email}</span></span>
          </div>

        </div>


        <button
          className="view-btn mt-2"
          onClick={() =>
            setActiveId(activeId === r._id ? null : r._id)
          }
        >
          {activeId === r._id ? "Hide Details" : "View Details"}
        </button>
        {activeId === r._id && (
          <div className="details-box mt-3 card">
            <div><b>Bio: </b>{r?.bio || "Null"}</div>
            <div><b>About: </b>{r?.about || "Null"}</div>
            <div><b><AddCallIcon fontSize=""/></b> {r.phone || "Null"}</div>
            <div><b>Age:</b> {r.age || "Null"}</div>
            <div><b>Gender:</b> {r.gender || "Null"}</div>
            <div><b>City/Town:</b> {r.location || "Null"}</div>
            <div><b>State:</b> {r.state || "Null"}</div>
            <div><b>Country:</b> {r.country || "Null"}</div>
            <div><b>Industry:</b> {r.industry || "Null"}</div>
            <div><b>Company Size:</b> {r.companySize || "Null"}</div>
            <div><b>Company Website:</b> {r.companyWebsite || "Null"}</div>
            <div><b>Company Address:</b> {r.companyAddress || "Null"}</div>
          </div>
        )}

      </div>

    ))}

</div>
}
      </div>



      {/* Styles */}

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

export default RecruiterLists;
