import { useNavigate } from "react-router-dom";
import MainNav from "../Navbar/MainNav";
import { FaUserTie, FaBuilding, FaUserShield } from "react-icons/fa";

function LearnMore(){
const navigate = useNavigate()


return(

<div className="learn-page">

<MainNav Navbg={`#1e293b`}/>
<br />


<section className="hero-section">

<div className="container text-center">

<h1 className="hero-title">A Smarter Way To Hire & Get Hired</h1>

<p className="hero-desc">
FindDreams is a powerful role-based job portal that connects
job seekers and recruiters through a secure and efficient
platform designed for modern hiring.
</p>

<button
className="hero-btn"
onClick={()=>navigate("/allJobs")}
>
Explore Jobs
</button>

</div>

</section>




<section className="features-section">

<div className="container">

<div className="row g-4">

{/* Jobseeker */}

<div className="col-lg-4 col-md-6">

<div className="feature-card">

<div className="feature-icon">
<FaUserTie/>
</div>

<h3>Job Seeker</h3>

<p>
Discover opportunities, apply for jobs instantly,
track your applications, and receive interview
notifications through a personalized dashboard.
</p>

<ul>
<li>Browse thousands of jobs</li>
<li>Save jobs for later</li>
<li>Apply instantly</li>
<li>Track applications</li>
<li>Interview alerts</li>
</ul>

</div>

</div>


{/* Recruiter */}

<div className="col-lg-4 col-md-6">

<div className="feature-card">

<div className="feature-icon">
<FaBuilding/>
</div>

<h3>Recruiter</h3>

<p>
Recruiters can manage the hiring workflow by
posting jobs, reviewing candidates and scheduling
interviews directly from the platform.
</p>

<ul>
<li>Post and manage jobs</li>
<li>Edit job listings</li>
<li>View applicants</li>
<li>Schedule interviews</li>
<li>Recruitment dashboard</li>
</ul>

</div>

</div>


{/* Admin */}

<div className="col-lg-4 col-md-12">

<div className="feature-card">

<div className="feature-icon">
<FaUserShield/>
</div>

<h3>Admin</h3>

<p>
Administrators maintain platform integrity by
monitoring users, approving recruiter job posts
and ensuring smooth system operations.
</p>

<ul>
<li>Manage all jobs</li>
<li>View all users</li>
<li>Approve recruiter posts</li>
<li>Monitor activity</li>
<li>Admin dashboard</li>
</ul>

</div>

</div>

</div>

</div>

</section>





<style>{`

.learn-page{
background:#0f172a;
color:white;
min-height:100vh;
}


/* HERO */

.hero-section{
padding:110px 20px 90px;
background:linear-gradient(135deg,#1e293b,#020617);
}

.hero-title{
font-size:48px;
font-weight:700;
margin-bottom:15px;
}

.hero-desc{
max-width:700px;
margin:auto;
color:#cbd5f5;
}

.hero-btn{
margin-top:25px;
background:linear-gradient(135deg,#6366f1,#2563eb);
border:none;
padding:14px 36px;
border-radius:40px;
color:white;
font-weight:600;
transition:0.3s;
}

.hero-btn:hover{
transform:translateY(-3px);
box-shadow:0 15px 35px rgba(0,0,0,0.4);
}


/* FEATURES */

.features-section{
padding:80px 0;
}

.feature-card{
background:rgba(255,255,255,0.05);
backdrop-filter:blur(10px);
padding:35px;
border-radius:20px;
border:1px solid rgba(255,255,255,0.08);
transition:0.3s;
height:100%;
}

.feature-card:hover{
transform:translateY(-10px);
box-shadow:0 25px 50px rgba(0,0,0,0.4);
}

.feature-icon{
font-size:32px;
margin-bottom:15px;
color:#60a5fa;
}

.feature-card h3{
margin-bottom:10px;
}

.feature-card p{
color:#cbd5e1;
}

.feature-card ul{
margin-top:10px;
padding-left:18px;
}

.feature-card li{
margin-bottom:6px;
color:#cbd5e1;
}


/* STATS */

.stats-section{
padding:60px 0;
background:#020617;
}

.stats-section h2{
font-size:36px;
font-weight:700;
color:#60a5fa;
}

.stats-section p{
color:#94a3b8;
}


/* MOBILE */

@media(max-width:768px){

.hero-title{
font-size:30px;
}

.hero-section{
padding:80px 15px;
}

}

`}</style>

</div>

)

}

export default LearnMore