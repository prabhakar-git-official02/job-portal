import MainNav from "../../Navbar/MainNav";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  allRecruiters_Get,
  allJobseekers_Get,
} from "../../Thunks/adminGetReqThunk";
import { allPostsThunk } from "../../Thunks/allPostsThunk";
import { useNavigate } from "react-router-dom";
import { allUsers_Get } from "../../Thunks/adminGetReqThunk";

function AdminDashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(allRecruiters_Get());
    dispatch(allJobseekers_Get());
    dispatch(allPostsThunk());
  }, [dispatch]);

   useEffect(() => {
      dispatch(allUsers_Get());
    }, [dispatch]);
  
    const AllUsers = useSelector((state) => state.allUsers.Users) || [];

  const AllRecruiters = AllUsers?.filter((r) => r?.role === "recruiter")
  
  const AllJobseekers = AllUsers?.filter((j) => j?.role === "user")

  const AllAdmin = AllUsers?.filter((a) => a?.role === "admin")

  const Posts =
    useSelector((state) => state.allPosts.Posts) || [];

  const ApprovedPosts = Posts.filter(
    (p) => p?.status?.toLowerCase() === "approved"
  );

  const RejectedPosts = Posts.filter(
    (p) => p?.status?.toLowerCase() === "rejected"
  );

  const PendingPosts = Posts.filter(
    (p) => p?.status?.toLowerCase() === "pending"
  );

// donut

  const donutOptions = {
    chart: {
      type: "donut",
    },

    labels: ["Approved", "Rejected", "Pending"],

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
              label: "Total Posts",
              formatter: () => Posts.length,
            },
          },
        },
      },
    },
  };

  const donutSeries = [
    ApprovedPosts.length,
    RejectedPosts.length,
    PendingPosts.length,
  ];

// bar

const barOptions = {
  chart: { type: "bar", toolbar: { show: false } },
  xaxis: {
    categories: ["Total Users","Recruiters", "Jobseekers","Admin"],
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
        AllUsers?.length,
        AllRecruiters?.length,
        AllJobseekers?.length,
        AllAdmin?.length
      ],
    },
  ];

  return (

    <div className="dashboard-layout">

      <MainNav />

      <br /><br /><br /><br />

      <div className="dashboard-content">

        <h2 className="dashboard-title">
          Admin Analytics Overview
        </h2>

        {/* KPI CARDS */}

        <div className="kpi-grid">

            <div onClick={() => navigate('/userLists')} className="kpi-card">
            <p>Total Users</p>
            <h2>{AllUsers?.length}</h2>
          </div>

          <div onClick={() => navigate('/allRecruiters')} className="kpi-card">
            <p>Total Recruiters</p>
            <h2>{AllRecruiters?.length}</h2>
          </div>

          <div className="kpi-card" onClick={() => navigate('/allJobseekers')}>
            <p>Total Jobseekers</p>
            <h2>{AllJobseekers?.length}</h2>
          </div>

            <div className="kpi-card" onClick={() => navigate('/allAdmins')}>
            <p>Total Admin</p>
            <h2>{AllAdmin?.length}</h2>
          </div>

          <div className="kpi-card" onClick={() => navigate('/recruiterPosts')}>
            <p>Total Posts</p>
            <h2>{Posts?.length}</h2>
          </div>

          <div className="kpi-card" onClick={() => navigate(`/jobListPreview?postStatus=approved`) }>
            <p className="premium-green" >Approved Posts</p>
            <h2 className="premium-green">{ApprovedPosts?.length}</h2>
          </div>

        <div className="kpi-card" onClick={() => navigate(`/jobListPreview?postStatus=rejected`) }>
            <p className="premium-red" >Rejected Posts</p>
            <h2 className="premium-red">{RejectedPosts?.length}</h2>
          </div>

              <div className="kpi-card" onClick={() => navigate(`/jobListPreview?postStatus=pending`) }>
            <p className="premium-yellow">Pending Posts</p>
            <h2 className="premium-yellow">{PendingPosts?.length}</h2>
          </div>

        </div>


        {/* CHARTS */}

        <div className="charts-grid">

          <div className="chart-card">
            <h4>Post Status Distribution</h4>

            <ReactApexChart
              options={donutOptions}
              series={donutSeries}
              type="donut"
              height={320}
            />

          </div>

          <div className="chart-card">

            <h4>Platform Statistics</h4>

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
  margin-left: 0;
  width: 100%;
  box-sizing: border-box;
}


@media (max-width: 768px) {

  .dashboard-content {

    padding: 15px;

    margin-left: 0 !important;

  }

  .kpi-grid {

    grid-template-columns: 1fr;

  }

}


/* TITLE */

.dashboard-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(90deg,#4f46e5,#6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
}


/* KPI GRID FIXED */

.kpi-grid {

  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

  gap: 16px;

  width: 100%;

}

/* KPI CARD */
.kpi-card {
  position: relative;
  padding: 28px;
  border-radius: 22px;

  background: linear-gradient(145deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65));
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  border: 1px solid rgba(255,255,255,0.4);

  box-shadow: 
    0 10px 30px rgba(0,0,0,0.06),
    inset 0 1px 0 rgba(255,255,255,0.6);

  transition: all 0.35s cubic-bezier(.17,.67,.38,1.15);
  cursor: pointer;
}

/* Smooth premium hover */
.kpi-card:hover {
  transform: translateY(-8px) scale(1.02);

  box-shadow:
    0 20px 45px rgba(0,0,0,0.12),
    inset 0 1px 0 rgba(255,255,255,0.8);
}

/* Soft glow effect */
.kpi-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 22px;
  background: linear-gradient(120deg, rgba(99,102,241,0.15), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.kpi-card:hover::before {
  opacity: 1;
}


.kpi-card p {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  letter-spacing: 0.3px;
  margin-bottom: 12px;
}

.kpi-card h2 {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(90deg,#4f46e5,#7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.premium-red {
  background: linear-gradient(90deg, #b91c1c, #ef4444) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.premium-green {
  background: linear-gradient(90deg, #16a34a, #22c55e) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.premium-yellow {
  background: linear-gradient(90deg, #b45309, #f59e0b) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.charts-grid {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}


.chart-card{

  padding:25px;

  border-radius:20px;

  background:white;

  box-shadow:0 10px 30px rgba(0,0,0,0.08);

}


`}</style>

    </div>
  );
}

export default AdminDashboard;
