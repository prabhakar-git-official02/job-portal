import MainNav from "../Navbar/MainNav"
import GoogleAuthLogin from "./GoogleAuthLogin"

function GoogleLoginPage(){

  return(

    <>
      <div className="container-fluid m-0 p-0">
        <MainNav Navbg={`#1e293b`}/>
        <div className="row m-0">
    <div className="google-container">

        <div className="google-wrapper">

          {/* LEFT SLOGAN */}
          <div className="google-left">

            <div className="google-brand">

              <h1>
                Continue with
                <br/>
                <span>Google Account</span>
              </h1>

              <p>
                Fast. Secure. Seamless.
                <br/>
                Access your account instantly using Google authentication.
              </p>

            </div>

          </div>


          {/* RIGHT LOGIN */}
          <div className="google-right">

            <div className="google-card">

              <div className="google-title">
                Google Sign In
              </div>

              <div className="google-sub">
                Use your Google account to continue
              </div>


              <div className="google-btn-wrapper">

                <GoogleAuthLogin/>

              </div>

            </div>

          </div>


        </div>

      </div>
        </div>
        <style>{`
        /* CONTAINER */
.google-container {

  min-height: 100vh;

  background:
    radial-gradient(circle at 15% 25%, rgba(99,102,241,0.15), transparent),
    radial-gradient(circle at 85% 75%, rgba(0,212,255,0.12), transparent),
    #020617;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

}


/* WRAPPER */
.google-wrapper {

  width: 100%;
  max-width: 1100px;

  display: flex;

  background: rgba(17,24,39,0.65);

  backdrop-filter: blur(25px);

  border-radius: 20px;

  overflow: hidden;

  border: 1px solid rgba(255,255,255,0.06);

  box-shadow:
    0 20px 60px rgba(0,0,0,0.7);

}


/* LEFT SIDE */
.google-left {

  flex: 1;

  background:
    radial-gradient(circle at 20% 30%, rgba(99,102,241,0.25), transparent),
    radial-gradient(circle at 80% 70%, rgba(0,212,255,0.15), transparent);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 60px;

}


.google-brand h1 {

  color: white;

  font-size: 40px;

  font-weight: 700;

  line-height: 1.2;

}


.google-brand span {

  background: linear-gradient(135deg,#6366f1,#00d4ff);

  -webkit-background-clip: text;

  -webkit-text-fill-color: transparent;

}


.google-brand p {

  color: #94a3b8;

  margin-top: 15px;

  font-size: 16px;

}


/* RIGHT SIDE */
.google-right {

  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 50px;

}


.google-card {

  width: 100%;
  max-width: 380px;

}


/* TITLE */
.google-title {

  color: white;

  font-size: 26px;

  font-weight: 600;

}


.google-sub {

  color: #94a3b8;

  font-size: 14px;

  margin-top: 5px;

}


/* GOOGLE BUTTON WRAPPER */
.google-btn-wrapper {

  margin-top: 30px;

  display: flex;
  justify-content: center;

}


/* MOBILE */
@media(max-width:992px){

  .google-left {
    display: none;
  }

  .google-wrapper {
    flex-direction: column;
  }

}
        `}</style>
      </div>
    </>
  )

}

export default GoogleLoginPage