import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "../../Navbar/MainNav";
import {
  InterviewsGet_Thunk,
  Interview_Status_Thunk,
} from "../../Thunks/InterviewThunk";
import { authThunk } from "../../Thunks/authThunk";
import SearchInput from "../../Components/SearchInput";
import ErrorAlert from "../../Components/ErrorAlert";
import { useNavigate } from "react-router-dom";
import ProgressLoad from "../../Components/ProgressLoad";
import CloseIcon from '@mui/icons-material/Close';

function SheduledInterviews() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [key, setKey] = useState("accepted");
  const [search, setSearch] = useState("");
  const [cancelInterview, setCancelInterview] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [caughtId, setCaughtId] = useState(null);
  const [Alertmsg, setAlertmsg] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    dispatch(authThunk());
    dispatch(InterviewsGet_Thunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
  const Interviews = useSelector((state) => state.Interviews.interviews);

  console.log(Interviews);

  /* Recruiter interviews */

  const recruiterInterviews = useMemo(
    () => Interviews?.filter((i) => i?.recruiterId === user?._id),
    [Interviews, user],
  );

  /* Status + Search */

  const filteredInterviews = useMemo(() => {
    const statusFilter = recruiterInterviews?.filter(
      (i) => i?.applicantResult === key,
    );

    return statusFilter?.filter((i) =>
      i?.jobDetails?.jobTitle?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [recruiterInterviews, key, search]);

  /* Cancel */

  const handleCancel = (id, applicantId, jobId) => {
    try {
      setCancelLoading(true);
      if (cancelReason.trim() === "") {
        setCancelLoading(false);
        setAlertmsg({
          msg: "Cancel reason required",
          id: Date.now(),
        });
        return;
      }

      dispatch(
        Interview_Status_Thunk(
          id,
          "cancelled",
          cancelReason,
          applicantId,
          jobId,
        ),
      ).then(() => setCancelLoading(false));
      setCancelInterview(false);
      setCancelReason("");
    } catch (err) {
      setCancelLoading(false);
      console.log("Pages/Recruiter/SheduledInterviews-Err", err?.message);
    }
  };

  return (
    <>
      <MainNav Navbg={"#385e82"} />
      <br />
      <br />
      <br />
      <div className="container-fluid m-0 p-0">
        <div className="dashboard-wrapper w-100">
          <div className="dashboard-container ">
            {/* Sidebar */}

            <div className="dashboard-sidebar">
              <h4 className="sidebar-title mt-5">Interviews</h4>

              {["accepted", "pending", "rejected"].map((status) => (
                <div
                  key={status}
                  onClick={() => setKey(status)}
                  className={`sidebar-item mt-2 ${key === status ? "active" : ""}`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              ))}
            </div>

            {/* Content */}

            <div className="dashboard-content">
              <div className="d-flex justify-content-center">
                <SearchInput
                  search={search}
                  setSearch={setSearch}
                  placeholder="Search interviews..."
                />
              </div>

              {!filteredInterviews?.length ? (
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
                  {filteredInterviews.map((interview) => (
                    <div
                      className="col-12 col-sm-12 col-md-12 col-xl-6"
                      key={interview?._id}
                    >
                      <div className="candidate-card">
                        <img
                          src={interview?.jobDetails?.profileImage?.url}
                          style={{
                            width: `100px`,
                            height: `100px`,
                            borderRadius: `100%`,
                          }}
                          alt="company-logo"
                        />
                        <h5 className="mt-5 text-light">
                          {interview?.jobDetails?.jobTitle}
                        </h5>

                        <p className="company-name">{interview?.companyName}</p>

                        <div className="candidate-info">
                          <p>
                            <strong>Email: </strong>
                            {interview?.applicantEmail}
                          </p>

                          <p>
                            <strong>Date: </strong>
                            {new Date(
                              interview?.interviewDateAndTime,
                            ).toLocaleString()}
                          </p>

                          <p>
                            <strong>Location: </strong>
                            {interview?.interviewLocation}
                          </p>

                          <p>
                            <strong>Status: </strong>
                            {interview?.interviewStatus}
                          </p>
                        </div>

                        <div className={`status-badge ${key}`}>{key}</div>

                        <button
                          onClick={() =>
                            navigate(
                              `/interviewCallDescription/${interview?.applicantId}/${interview?.jobId}`,
                            )
                          }
                          className="btn btn-primary mt-2"
                        >
                          View Details
                        </button>

                        {!interview?.interviewCancelledReason && (
                          <div className="mt-3">
                            <p
                              className="text-danger fw-bold"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setCancelInterview(true);
                                setCaughtId(interview?._id);
                              }}
                            >
                              Cancel Interview? 
                            </p>
                            

                            {cancelInterview && caughtId === interview?._id && (
                              <>
                                <textarea
                                  className="form-control mb-2"
                                  placeholder="Cancel reason"
                                  value={cancelReason}
                                  onChange={(e) =>
                                    setCancelReason(e.target.value)
                                  }
                                />

                                {cancelLoading ? (
                                  <div className="mt-4">
                                    <ProgressLoad
                                      trigger={1}
                                      msg={`Interview Cancelling..`}
                                      setSize={`20px`}
                                    />
                                  </div>
                                ) : null}

                                <ErrorAlert
                                  alertMsg={Alertmsg}
                                  buttonName="Confirm Cancel"
                                  buttonVariant="contained"
                                  buttonClass={`mt-3`}
                                  colorbg="red"
                                  handlefn={() =>
                                    handleCancel(
                                      interview?._id,
                                      interview?.applicantId,
                                      interview?.jobId,
                                    )
                                  }
                                />
                                {cancelInterview && caughtId === interview?._id ? 
                                <div className="mt-4">
                                   <span style={{cursor : "pointer"}} onClick={() => {setCancelInterview(false);setCaughtId(null)}}>Close<CloseIcon/></span>
                                   </div>:null}
                             
                              </>
                            )}
                          </div>
                        )}
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
  height: 100vh;
  overflow: hidden;
}

/* Sidebar fixed */
.dashboard-sidebar {
  width: 250px;
  background: #1f2f46;
  color: #fff;
  padding: 25px 20px;
  position: fixed;
  top: 0;
  margin-top : 80px;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;
}

@media(max-width : 768px){
.dashboard-sidebar{
margin-top : 0px;
}
}

@media (max-width: 768px) {

  .dashboard-container {
    flex-direction: column;
  }

  .dashboard-sidebar {
    position: sticky;
    top: 0;
    z-index: 1000;

    width: 100%;
    height: auto;

    display: flex;
    justify-content: space-around;
    align-items: center;

    padding: 10px;
    background: #1f2f46;
  }

  .sidebar-item {
    flex: 1;
    text-align: center;
    padding: 10px 5px;
    font-size: 13px;
    margin: 0 5px;
    border-radius: 6px;
  }

  .dashboard-content {
    margin-left: 0;
    width: 100%;
    height: auto;
    padding: 15px;
  }
}

/* Content adjust panna */
.dashboard-content {
  margin-left: 250px;
  width: calc(100% - 250px);
  padding: 30px;
  overflow-y: auto;
  height: 100vh;
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


/* ===== Search ===== */
.search-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
@media (max-width: 768px) {
  .dashboard-sidebar {
    position: relative;
    width: 100%;
    height: auto;
  }

  .dashboard-content {
    margin-left: 0;
    width: 100%;
  }
}
  
/* ===== Candidate Card ===== */
.candidate-card {
  background: #ffffff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.05);
  transition: 0.3s ease;
  position: relative;
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
.status-badge.accepted {
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

export default SheduledInterviews;
