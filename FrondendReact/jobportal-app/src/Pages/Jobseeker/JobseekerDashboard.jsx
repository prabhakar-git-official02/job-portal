import MainNav from "../../Navbar/MainNav";
import ReactApexChart from "react-apexcharts";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authThunk } from "../../Thunks/authThunk";
import { applicantThunk } from "../../Thunks/applicantThunk";
import { InterviewsGet_Thunk } from "../../Thunks/InterviewThunk";
import { savedJobsThunk } from "../../Thunks/savedJobsThunk";

function JobseekerDashbboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(authThunk());
    dispatch(applicantThunk());
    dispatch(savedJobsThunk());
    dispatch(InterviewsGet_Thunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  const allAppliedJobs =
    useSelector((state) => state.applicantMemory.applicant)?.populateData || [];

  const SavedJobs =
    useSelector((state) => state.savedJobs.SavedJobs)?.SavedList || [];

  const Interviews =
    useSelector((state) =>
      state.Interviews.interviews?.filter(
        (i) => i.applicantId === user?._id
      )
    ) || [];


  const shortListedJobs =
    allAppliedJobs.filter((job) => job?.status === "shortlisted");

    console.log("shortlisted-count",shortListedJobs?.length);
    
  const rejectedJobs =
    allAppliedJobs.filter((job) => job?.status === "rejected");

    console.log("rejected-count",rejectedJobs?.length);

  const appliedJobs =
    allAppliedJobs.filter((job) => job?.status === "applied");


  const InterviewCallAccepted =
    Interviews.filter((i) => i?.applicantResult === "accepted");

  const InterviewCallRejected =
    Interviews.filter((i) => i?.applicantResult === "rejected");

  const InterviewCallPending =
    Interviews.filter((i) => i?.applicantResult === "pending");

  const RecruiterActions = Number(shortListedJobs?.length || 0) + Number(rejectedJobs?.length || 0)

console.log("Recruiter Action",RecruiterActions)
// donut chart
  const donutOptions = {
    chart: { type: "donut", toolbar: { show: false } },
    labels: ["Shortlisted", "Rejected", "Applied"],
    colors: ["#22c55e", "#ef4444", "#f59e0b"],
    legend: {
      show: true,
      position: "bottom",
      fontSize: "14px",
      fontWeight: 600,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Applications",
              formatter: () => allAppliedJobs.length,
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            pie: {
              donut: { size: "55%" },
            },
          },
        },
      },
    ],
  };

  const donutSeries = [
    shortListedJobs.length,
    rejectedJobs.length,
    appliedJobs.length,
  ];

const barOptions = {
  chart: { type: "bar", toolbar: { show: false } },
  xaxis: {
    categories: [
      "All-Applications",
      "Saved",
      "Interviews",
      "Job-Actions"
    ],
    labels: {
      rotate: 0,
      hideOverlappingLabels: false,
      style: { fontSize: "12px" },
    },
  },
  colors: ["#6366f1"],
  plotOptions: { bar: { borderRadius: 8, columnWidth: "45%" } },
  dataLabels: { enabled: true },
  responsive: [
    {
      breakpoint: 768, 
      options: {
        xaxis: {
          labels: { rotate: -15, style: { fontSize: "10px" } },
        },
        plotOptions: { bar: { columnWidth: "60%" } },
      },
    },
    {
      breakpoint: 375, 
      options: {
        xaxis: {
          categories: ["All", "Saved", "Interv.", "Actions"],
          labels: { rotate: -25, style: { fontSize: "8px" } },
        },
        plotOptions: { bar: { columnWidth: "70%" } },
      },
    },
  ],
};


  const barSeries = [
    {
      name: "Count",
      data: [
        allAppliedJobs?.length,
        SavedJobs?.length,
        Interviews?.length,
        RecruiterActions
      ],
    },
  ];

  return (

    <div className="dashboard-layout">

      <MainNav />

      <br /><br /><br /><br />

      <div className="dashboard-content">

        <h2 className="dashboard-title">
          Jobseeker Analytics Overview
        </h2>

        {/* KPI CARDS */}

        <div className="kpi-grid">

          <div
            className="kpi-card"
            onClick={() => navigate("/appliedJobs")}
          >
            <p>Total Applications</p>
            <h2>{allAppliedJobs.length}</h2>
          </div>

          <div
            className="kpi-card"
            onClick={() => navigate("/savedJobs")}
          >
            <p>Saved Jobs</p>
            <h2>{SavedJobs.length}</h2>
          </div>

          <div className="kpi-card"  onClick={() => navigate("/viewStatusJobs?jobStatus=shortlisted")}>
            <p className="premium-green">Shortlisted Jobs</p>
            <h2 className="premium-green">
              {shortListedJobs.length}
            </h2>
          </div>

          <div className="kpi-card" onClick={() => navigate("/viewStatusJobs?jobStatus=rejected")}>
            <p className="premium-red">Rejected Jobs</p>
            <h2 className="premium-red">
              {rejectedJobs.length}
            </h2>
          </div>

          <div className="kpi-card" onClick={() => navigate("/viewStatusJobs?jobStatus=applied")}>
            <p className="premium-yellow">Pending Jobs</p>
            <h2 className="premium-yellow">
              {appliedJobs.length}
            </h2>
          </div>

         <div
            className="kpi-card"
            onClick={() => navigate("/interviewCalls")}
          >
            <p>Total Interview Calls</p>
            <h2>{Interviews.length}</h2>
          </div>

          <div className="kpi-card" onClick={() => navigate("/viewStatusInterviews?interviewStatus=accepted")}>
            <p className="premium-green">Interview Accepted</p>
            <h2 className="premium-green">
              {InterviewCallAccepted.length}
            </h2>
          </div>

            <div className="kpi-card" onClick={() => navigate("/viewStatusInterviews?interviewStatus=rejected")}>
            <p className="premium-red">Interview Rejected</p>
            <h2 className="premium-red">
              {InterviewCallRejected.length}
            </h2>
          </div>

          <div className="kpi-card" onClick={() => navigate("/viewStatusInterviews?interviewStatus=pending")}>
            <p className="premium-yellow">Interview Pending</p>
            <h2 className="premium-yellow">
              {InterviewCallPending.length}
            </h2>
          </div>

        </div>

        {/* CHARTS */}

        <div className="charts-grid mt-4">

          <div className="chart-card">

            <h4>Application Status Distribution</h4>

            <ReactApexChart
              options={donutOptions}
              series={donutSeries}
              type="donut"
              width="100%"
              height={300}
            />

          </div>

          <div className="chart-card">

            <h4>Job Activity Overview</h4>

            <ReactApexChart
              options={barOptions}
              series={barSeries}
              type="bar"
              height={320}
            />

          </div>

        </div>

      </div>

<style>{`

.dashboard-layout {
  min-height: 100vh;
  background: linear-gradient(135deg,#eef2ff,#f8fafc);
}

.dashboard-content {
  padding: 20px;
}

.premium-green {
  background: linear-gradient(
    90deg,#16a34a,#22c55e
  ) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.premium-red {
  background: linear-gradient(
    90deg,#b91c1c,#ef4444
  ) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.premium-yellow {
  background: linear-gradient(
    90deg,#b45309,#f59e0b
  ) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.dashboard-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(90deg,#4f46e5,#6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
}



.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(240px,1fr));
  gap: 16px;
}

.kpi-card {

  padding: 28px;
  border-radius: 22px;

  background: linear-gradient(
    145deg,
    rgba(255,255,255,0.85),
    rgba(255,255,255,0.65)
  );

  backdrop-filter: blur(18px);

  border: 1px solid rgba(255,255,255,0.4);

  box-shadow:
    0 10px 30px rgba(0,0,0,0.06);

  transition: all 0.35s;
  cursor: pointer;
}

.kpi-card:hover {

  transform: translateY(-8px);

  box-shadow:
    0 20px 45px rgba(0,0,0,0.12);
}

.kpi-card p {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
}

.kpi-card h2 {

  font-size: 36px;
  font-weight: 800;

  background: linear-gradient(
    90deg,#4f46e5,#7c3aed
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.premium-green {
  background: linear-gradient(
    90deg,#16a34a,#22c55e
  ) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.premium-red {
  background: linear-gradient(
    90deg,#b91c1c,#ef4444
  ) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.premium-yellow {
  background: linear-gradient(
    90deg,#b45309,#f59e0b
  ) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
  gap: 25px;
}

.chart-card {

  padding: 15px;
  border-radius: 20px;

  background: white;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.08);
}

`}</style>

    </div>

  );
}

export default JobseekerDashbboard;