import { useEffect, useState } from "react";
import { applicantGetAllThunk } from "../../Thunks/applicantThunk";
import { useDispatch, useSelector } from "react-redux";
import { authThunk } from "../../Thunks/authThunk";
import MainNav from "../../Navbar/MainNav";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../Components/SearchInput";

function Candidates() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [key, setKey] = useState("shortlisted");
    const [search,setSearch] = useState("");


  useEffect(() => {
    dispatch(authThunk());
    dispatch(applicantGetAllThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
  const applicants = useSelector((state) => state.allApplicants.All_Applicants);

  const userJobs = applicants?.flatMap(applicant =>
    applicant?.appliedJobs?.filter(
      job => job?.jobId?.recruiterId?._id === user?._id
    )
  );

  const filteredJobs = userJobs?.filter(job => {
    if (key === "shortlisted") return job?.status === "shortlisted";
    if (key === "rejected") return job?.status === "rejected";
    if (key === "pending") return job?.status === "applied";
    return false;
  });

  return (
<>
  <MainNav Navbg={"#385e82"} Iconbg={``} />
  <br /><br /><br />
<div className="container-fluid m-0 p-0">
  <div className="dashboard-wrapper  w-100">
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <h4 className="sidebar-title">Candidates</h4>

        {["shortlisted", "rejected", "pending"].map(status => (
          <div
            key={status}
            onClick={() => setKey(status)}
            className={`sidebar-item ${key === status ? "active" : ""}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">

        {/* Search aligned properly */}
        <div className="d-flex justify-content-center">
          <SearchInput search={search} setSearch={setSearch} placeholder={`Search your Candidates here..`}/>
        </div>

        {!filteredJobs?.length ? (
<div className="no-data-wrapper">
  <img
    src="nodata-image.avif"
    alt="No applied jobs"
    className="no-data-img"
  />
  <h5 className="no-data-title">No records found</h5>
  <p className="no-data-text">
   Currently, there are no records available.
  </p>
</div>
        ) : (
<div className="row g-4 mt-2">
  {filteredJobs
    ?.filter(job =>
      job?.jobId?.jobTitle
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
    .map(job => (
      <div   className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" key={job?._id}>
        <div
          onClick={() => navigate(`/candidate/${job?._id}`)}
          className="candidate-card"
        >
          <div >
            <img
              src={job?.jobId?.profileImage?.url}
              alt="company-logo"
              className="candidate-logo"
            />
          </div>

          <h5>{job?.jobId?.jobTitle}</h5>
          <p className="company-name">
            {job?.jobId?.companyName}
          </p>

          <div className="candidate-info">
            <p><strong>Name:</strong> {job?.userDatas?.firstName} {job?.userDatas?.lastName}</p>
            <p><strong>Email:</strong> {job?.userDatas?.email}</p>
            <p><strong>Phone:</strong> {job?.userDatas?.phone}</p>
          </div>

          <div className={`status-badge ${key}`}>
            {key}
          </div>
        </div>
      </div>
    ))}
</div>
        )}

      </div>
    </div>
  </div>
  </div>
<style>
{`
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


/* ===== Dashboard Layout ===== */
.dashboard-wrapper {
  min-height: 100vh;
  background: #f4f7fb;
}

.dashboard-container {
  display: flex;
  min-height: 100vh;
}

/* ===== Sidebar ===== */
.dashboard-sidebar {
  width: 250px;
  background: #1f2f46;
  color: #fff;
  padding: 25px 20px;
  transition: all 0.3s ease;
}

.sidebar-title {
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 1px;
}

.sidebar-item {
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: 0.3s ease;
  font-size: 15px;
}

.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-item.active {
  background: #385e82;
  font-weight: 600;
}

/* ===== Main Content ===== */
.dashboard-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

/* ===== Search ===== */
.search-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

/* ===== Candidate Card ===== */
.candidate-card {
  background: #ffffff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.05);
  transition: 0.3s ease;
  position: relative;
  cursor: pointer;
  height: 100%;
}

.candidate-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.1);
}

.candidate-logo {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

.candidate-card h5 {
  font-weight: 600;
  margin-bottom: 5px;
}

.company-name {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.candidate-info p {
  font-size: 14px;
  margin-bottom: 5px;
  color: #444;
}

/* ===== Status Badge ===== */
.status-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

/* Status Colors */
.status-badge.shortlisted {
  background: #e6f7ee;
  color: #1a8f4b;
}

.status-badge.rejected {
  background: #fdeaea;
  color: #d93025;
}

.status-badge.pending {
  background: #fff4e5;
  color: #f57c00;
}

/* ===== Responsive ===== */
@media (max-width: 992px) {
  .dashboard-sidebar {
    width: 200px;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }

  .dashboard-sidebar {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 15px;
  }

  .sidebar-title {
    display: none;
  }

  .sidebar-item {
    margin: 0;
    font-size: 13px;
  }

  .dashboard-content {
    padding: 20px;
  }

  .search-wrapper {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .candidate-card {
    padding: 15px;
  }

  .candidate-info p {
    font-size: 13px;
  }

  .status-badge {
    font-size: 11px;
  }
}
`}
</style>
    </>
  );
}

export default Candidates;