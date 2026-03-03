import MainNav from "../../Navbar/MainNav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allJobseekers_Get } from "../../Thunks/adminGetReqThunk";

import AddCallIcon from "@mui/icons-material/AddCall";
import MailIcon from "@mui/icons-material/Mail";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchInput from "../../Components/SearchInput";
import DropDown from "../../Components/DropDown";

function JobseekerLists() {
  const dispatch = useDispatch();

  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");

  const [locationKey,setLocationKey] = useState("")
  const [qualificationKey,setQualificationKey] = useState("")

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
            .includes(qualificationKey.trim().toLowerCase())
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

        <div className="modern-title-container text-center mb-3">
          <h3 className="modern-title pb-2">Jobseekers Directory</h3>

          <p className="modern-subtitle">
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

        <div className="row g-3 g-md-4">
          {filteredJobseekers?.filter((j) =>
            `${j.firstName} ${j.lastName}`
              .toLowerCase()
              .includes(search.toLowerCase()),
          )?.map((j) => (
            <div key={j._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div className="card card-saas border-0 shadow-sm h-100 p-3">
                {/* Top */}

                <div className="d-flex gap-3">
                  <img
                    src={j?.profileImage?.url}
                    alt="profile"
                    className="profile-img"
                  />

                  <div>
                    <h6 className="fw-bold mb-1">
                      {j.firstName} {j.lastName}
                    </h6>

                    <p className="text-muted small mb-1">
                      {j.jobType || "Jobseeker"}
                    </p>

                    <div className="small text-muted">
                      📍 {j.location || "-"}
                    </div>
                  </div>
                </div>

                {/* Contact */}

                <div className="mt-3 small">
                  <div>
                    <MailIcon fontSize="small" /> {j.email}
                  </div>

                  <div>
                    <AddCallIcon fontSize="small" /> {j.phone}
                  </div>
                  <div>
                    <VisibilityIcon fontSize="small" />
                    <a
                    className="mx-2"
                      href={j?.resume?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "blue" }}
                    >
                      View Resume
                    </a>
                  </div>
                </div>

                {/* Button */}

                <div>
                <button
                  className="btn apply-btn mt-3"
                  onClick={() => setActiveId(activeId === j._id ? null : j._id)}
                >
                  {activeId === j._id ? (
                    <>
                      Hide Details <KeyboardArrowUpIcon fontSize="small" />
                    </>
                  ) : (
                    <>
                      View Details <KeyboardArrowDownIcon fontSize="small" />
                    </>
                  )}
                </button>
                </div>

                {/* Details */}

                {activeId === j._id && (
                  <div className="details-box mt-3">
                    <div>
                      <b>About:</b> {j.about || "-"}
                    </div>

                    <div>
                      <b>Age:</b> {j.age || "-"}
                    </div>

                    <div>
                      <b>Gender:</b> {j.gender || "-"}
                    </div>

                    <div>
                      <b>Expected Salary:</b> {j.expectedSalary || "-"}
                    </div>

                    <div>
                      <b>Experience Type:</b> {j.experienceType || "-"}
                    </div>

                    {/* Skills */}

                    <div className="mt-2">
                      <b>Skills:</b>

                      <div className="skills-box">
                        {j.skills?.length > 0
                          ? j.skills.map((s, i) => (
                              <span key={i} className="skill-pill">
                                {s}
                              </span>
                            ))
                          : "-"}
                      </div>
                    </div>

                    {/* Education */}

                    <div className="mt-2">
                      <b>Education:</b>

                      {j.education?.length > 0
                        ? j.education.map((e) => (
                            <div key={e._id} className="sub-card p-3">
                              <div>{e.qualification}</div>

                              <div className="small text-muted">
                                {e.institute}
                              </div>
                              <div className="small text-muted">
                                {new Date(e?.yearStart).getFullYear()} -{" "}
                                {new Date(e?.yearEnd).getFullYear()}
                              </div>
                            </div>
                          ))
                        : "-"}
                    </div>

                    {/* Experience */}

                    <div className="mt-2">
                      <b>Experience:</b>

                      {j.experience?.length > 0
                        ? j.experience.map((e) => (
                            <div key={e._id} className="sub-card p-3">
                              <div>{e.company}</div>

                              <div className="small text-muted">{e.field}</div>
                              <div className="small text-muted">
                                CTC: {e?.CTC}
                              </div>
                              <div className="small text-muted">
                                Work Experience: {e?.workExperience}
                              </div>
                              <div className="small text-muted">
                                {new Date(e?.yearStart).getFullYear()} -{" "}
                                {new Date(e?.yearEnd).getFullYear()}
                              </div>
                            </div>
                          ))
                        : "-"}
                    </div>
                  </div>
                )}
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

/* Title */

.modern-title{
  font-size:26px;
  font-weight:700;
  background: linear-gradient(135deg,#4f46e5,#6366f1);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.modern-subtitle{
  font-size:14px;
  color:#6b7280;
}


/* Card */

.card-saas{
  border-radius:16px;
  transition:0.3s;
}

.card-saas:hover{
  transform:translateY(-6px);
  box-shadow:0 20px 40px rgba(0,0,0,0.08);
}


/* Image */

.profile-img{
  width:60px;
  height:60px;
  border-radius:12px;
  object-fit:cover;
}


/* Button */

.apply-btn{
  background: linear-gradient(135deg,#6366f1,#4f46e5);
  color:white;
  border:none;
  border-radius:10px;
  font-size:13px;
}


/* Details */

.details-box{
  background:#f8fafc;
  padding:10px;
  border-radius:10px;
  font-size:13px;
}


/* Skills */

.skills-box{
  display:flex;
  flex-wrap:wrap;
  gap:6px;
  margin-top:5px;
}

.skill-pill{
  background:#eef2ff;
  color:#4f46e5;
  padding:3px 8px;
  border-radius:6px;
  font-size:12px;
}


/* Sub cards */

.sub-card{
  background:white;
  padding:6px;
  border-radius:6px;
  margin-top:5px;
  border:1px solid #eee;
}


/* Mobile */

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

export default JobseekerLists;
