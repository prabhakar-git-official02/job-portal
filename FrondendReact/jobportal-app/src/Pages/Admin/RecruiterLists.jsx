import MainNav from "../../Navbar/MainNav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allRecruiters_Get } from "../../Thunks/adminGetReqThunk";
import AddCallIcon from "@mui/icons-material/AddCall";
import MailIcon from "@mui/icons-material/Mail";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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

        <div className="modern-title-container text-center mb-3">

          <h3 className="modern-title">
            Recruiters Directory
          </h3>

          <p className="modern-subtitle">
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

        <div className="row g-3 g-md-4">

          {filteredRecruiters
            ?.filter((r)=>
              `${r.firstName} ${r.lastName}`
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((r)=>(
              
              <div key={r._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">

                <div className="card card-saas border-0 shadow-sm h-100 p-3">

                  <div className="d-flex gap-3">

                    <img
                      src={r?.profileImage?.url}
                      className="profile-img"
                      alt="profile"
                    />

                    <div>

                      <h6 className="fw-bold mb-1">
                        {r.firstName} {r.lastName}
                      </h6>

                      <p className="text-muted small mb-1">
                        {r.designation}
                      </p>

                      <div className="small text-muted">
                        {r.companyName}
                      </div>

                    </div>

                  </div>


                  {/* Contact */}

                  <div className="mt-3 small">

                    <div>
                      <MailIcon fontSize="small"/> {r.email}
                    </div>

                    <div>
                      <AddCallIcon fontSize="small"/> {r.phone}
                    </div>

                  </div>


                  {/* Button */}
                  <div>
                  <button
                    className="btn apply-btn mt-3"
                    onClick={()=>
                      setActiveId(
                        activeId===r._id?null:r._id
                      )
                    }
                  >

                    {activeId===r._id ?
                      <>Hide Details <KeyboardArrowUpIcon fontSize="small"/></>
                      :
                      <>View Details <KeyboardArrowDownIcon fontSize="small"/></>
                    }

                  </button>
                  </div>


                  {/* Details */}

                  {activeId===r._id &&

                    <div className="details-box mt-3">

                      <div><b>Industry:</b> {r.industry}</div>
                      <div><b>Location:</b> {r.location}</div>
                      <div><b>State:</b> {r.state}</div>
                      <div><b>Country:</b> {r.country}</div>
                      <div><b>Company Size:</b> {r.companySize}</div>

                    </div>

                  }

                </div>

              </div>

            ))}

        </div>

      </div>



      {/* Styles */}

      <style>{`

.page-bg{
  background: linear-gradient(135deg,#f8fafc,#eef2f7);
}

.modern-title{
  font-size:26px;
  font-weight:700;
  background: linear-gradient(135deg,#4f46e5,#6366f1);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.modern-subtitle{
  color:#6b7280;
  font-size:14px;
}

.card-saas{
  border-radius:16px;
  transition:0.3s;
}

.card-saas:hover{
  transform:translateY(-6px);
  box-shadow:0 20px 40px rgba(0,0,0,0.08);
}

.profile-img{
  width:60px;
  height:60px;
  border-radius:12px;
  object-fit:cover;
}

.apply-btn{
  background: linear-gradient(135deg,#6366f1,#4f46e5);
  color:white;
  border:none;
  border-radius:10px;
  font-size:13px;
}

.details-box{
  background:#f8fafc;
  padding:10px;
  border-radius:10px;
  font-size:13px;
}

.premium-dropdown{
  height:42px;
  display:flex;
  align-items:center;
}

@media(max-width:768px){

  .profile-img{
    width:50px;
    height:50px;
  }

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



`}</style>

    </div>

  );

}

export default RecruiterLists;
