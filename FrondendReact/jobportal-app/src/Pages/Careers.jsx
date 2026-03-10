import { useNavigate } from "react-router-dom";
import MainNav from "../Navbar/MainNav";

function CareersSection() {
  const navigate = useNavigate();

  return (
    <section className="career-premium">
      <MainNav Navbg={`#1e293b`}/>
      <br />
      <br />
      <br />
      <div className="career-wrapper container">
        <div className="row align-items-center g-5">
          {/* Left Content */}

          <div className="col-lg-6 col-md-12">
            <span className="career-badge">WE ARE HIRING</span>

            <h1 className="career-heading">
              Build Your Future <br />
              With Our Team
            </h1>

            <p className="career-desc">
              We are building a modern job platform that connects talented
              people with the best companies. Join our passionate team of
              developers, designers and innovators to create impactful products.
            </p>

            <div className="career-points">
              <div>🚀 Fast Growing Startup</div>
              <div>🌍 Remote Friendly Culture</div>
              <div>📈 Career Growth Opportunities</div>
            </div>

            <button className="career-btn" onClick={() => navigate("/allJobs")}>
              Explore Careers →
            </button>
          </div>

          {/* Right Image */}

          <div className="col-lg-6 col-md-12 text-center">
            <div className="career-img-card">
              <img
                src="/career image.jpg"
                alt="startup team"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`

.career-premium{
background: linear-gradient(120deg,#0f172a,#1e293b);
color:white;
min-height:100vh;
display:flex;
flex-direction:column;
}


.career-wrapper{
flex:1;
display:flex;
align-items:center;
}


.career-badge{
background:#2563eb;
padding:6px 14px;
border-radius:20px;
font-size:12px;
letter-spacing:1px;
display:inline-block;
margin-bottom:15px;
}


.career-heading{
font-size:42px;
font-weight:700;
margin-bottom:20px;
}


.career-desc{
color:#cbd5e1;
font-size:16px;
margin-bottom:25px;
}


.career-points div{
margin-bottom:10px;
font-size:15px;
}


.career-btn{
margin-top:20px;
background:linear-gradient(135deg,#3b82f6,#6366f1);
border:none;
padding:14px 32px;
border-radius:30px;
font-weight:600;
color:white;
transition:0.3s;
}


.career-btn:hover{
transform:translateY(-3px);
box-shadow:0 10px 25px rgba(0,0,0,0.3);
}


.career-img-card{
border-radius:20px;
overflow:hidden;
box-shadow:0 25px 50px rgba(0,0,0,0.4);
}


/* Mobile */

@media (max-width:768px){

.career-heading{
font-size:28px;
}

.career-wrapper{
padding-top:40px;
padding-bottom:40px;
text-align:center;
}

}

`}</style>
    </section>
  );
}

export default CareersSection;
