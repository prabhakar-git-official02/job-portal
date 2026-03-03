import MainNav from "../../Navbar/MainNav";
import ReactApexChart from "react-apexcharts";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { recruiterPostsThunk } from "../../Thunks/recruiterPostsThunk";
import { applicantGetAllThunk } from "../../Thunks/applicantThunk";
import { authThunk } from "../../Thunks/authThunk";

function RecruiterDashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* LOAD DATA */

  useEffect(() => {
    dispatch(authThunk());
    dispatch(recruiterPostsThunk());
    dispatch(applicantGetAllThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  const MyPosts =
    useSelector((state) => state.recruiterPosts.Posts) || [];

  const applicants =
    useSelector((state) => state.allApplicants.All_Applicants) || [];

  /* POST STATUS */

  const ApprovedPosts = MyPosts.filter(
    (post) => post?.status?.toLowerCase() === "approved"
  );

  const RejectedPosts = MyPosts.filter(
    (post) => post?.status?.toLowerCase() === "rejected"
  );

  const PendingPosts = MyPosts.filter(
    (post) => post?.status?.toLowerCase() === "pending"
  );

  /* MY JOB APPLICANTS */

  const userJobs = applicants.flatMap((applicant) =>
    applicant?.appliedJobs?.filter(
      (job) => job?.jobId?.recruiterId?._id === user?._id
    ) || []
  );

  const shortlistedJobs = userJobs.filter(
    (job) => job?.status === "shortlisted"
  );

  const rejectedJobs = userJobs.filter(
    (job) => job?.status === "rejected"
  );

  const AppliedJobs = userJobs.filter(
    (job) => job?.status === "applied"
  );

  /* DONUT CHART */

const donutOptions = {
  chart: { type: "donut", toolbar: { show: false } },
  labels: ["Approved", "Rejected", "Pending"],
  colors: ["#22c55e", "#ef4444", "#f59e0b"],
  legend: { show: true, position: "bottom", fontSize: "14px", fontWeight: 600 },
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
          total: { show: true, label: "My Posts", formatter: () => MyPosts.length },
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 768, // mobile
      options: {
        chart: { width: "100%" },
        legend: { position: "bottom" },
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
    ApprovedPosts.length,
    RejectedPosts.length,
    PendingPosts.length,
  ];


  
const barOptions = {
  chart: { type: "bar", toolbar: { show: false } },
  xaxis: {
    categories: ["Applicants", "Shortlisted", "Rejected", "Applied"],
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
     
      breakpoint: 375,
      options: {
        plotOptions: { bar: { columnWidth: "70%" } },
        xaxis: {
          labels: {
            rotate: -15,          
            hideOverlappingLabels: false, 
            style: { fontSize: "8px"},
          },
        },
      },
    },
  ],
};


  const barSeries = [
    {
      name: "Count",
      data: [
        userJobs.length,
        shortlistedJobs.length,
        rejectedJobs.length,
        AppliedJobs.length,
      ],
    },
  ];

  return (

    <div className="dashboard-layout">

      <MainNav />

      <br /><br /><br /><br />

      <div className="dashboard-content">

        <h2 className="dashboard-title">
          Recruiter Analytics Overview
        </h2>

        {/* KPI CARDS */}

        <div className="kpi-grid">

          <div
            className="kpi-card"
            onClick={() => navigate("/viewPosts")}
          >
            <p>Total My Posts</p>
            <h2>{MyPosts?.length}</h2>
          </div>

          <div
            className="kpi-card"
            onClick={() => navigate("/viewStatusPosts?postStatus=approved")}
          >
            <p className="premium-green">Approved Posts</p>
            <h2 className="premium-green">
              {ApprovedPosts?.length}
            </h2>
          </div>

          <div
            className="kpi-card"
            onClick={() => navigate("/viewStatusPosts?postStatus=rejected")}
          >
            <p className="premium-red">Rejected Posts</p>
            <h2 className="premium-red">
              {RejectedPosts?.length}
            </h2>
          </div>

          <div
            className="kpi-card"
            onClick={() => navigate("/viewStatusPosts?postStatus=pending")}
          >
            <p className="premium-yellow">Pending Posts</p>
            <h2 className="premium-yellow">
              {PendingPosts?.length}
            </h2>
          </div>

          <div
            className="kpi-card"
            onClick={() => navigate("/myApplicants")}
          >
            <p>Total Applicants</p>
            <h2>{userJobs?.length}</h2>
          </div>

          <div className="kpi-card" onClick={() => navigate('/viewStatusApplicants?applicantStatus=shortlisted')}>
            <p className="premium-green">Shortlisted Applicants</p>
            <h2 className="premium-green">
              {shortlistedJobs?.length}
            </h2>
          </div>

          <div className="kpi-card" onClick={() => navigate('/viewStatusApplicants?applicantStatus=rejected')}>
            <p className="premium-red">Rejected Applicants</p>
            <h2 className="premium-red">
              {rejectedJobs?.length}
            </h2>
          </div>

          <div className="kpi-card" onClick={() => navigate('/viewStatusApplicants?applicantStatus=applied')}>
            <p className="premium-yellow" >Applied Applicants</p>
            <h2 className="premium-yellow">
              {AppliedJobs?.length}
            </h2>
          </div>

        </div>

        {/* CHARTS */}

        <div className="charts-grid mt-4">

          <div className="chart-card">

            <h4>My Post Status Distribution</h4>

<ReactApexChart
  options={donutOptions}
  series={donutSeries}
  type="donut"
  width="100%"
  height={300}
/>

          </div>

          <div className="chart-card">

            <h4>Applicant Statistics</h4>

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

body, html {
  overflow-x: hidden;
}

.dashboard-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
}

.dashboard-content {
  padding: 20px;
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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.kpi-card {

  position: relative;
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
    0 10px 30px rgba(0,0,0,0.06),
    inset 0 1px 0 rgba(255,255,255,0.6);

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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.chart-card {
  padding: 15px; /* reduced for mobile */
  border-radius: 20px;
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  width: 100%; /* make sure it does not overflow */
}
`}</style>

    </div>
  );
}

export default RecruiterDashboard;