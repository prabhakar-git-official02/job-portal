import ProgressLoad from "../Components/ProgressLoad"
import MainNav from "../Navbar/MainNav"

function LoadingPage(){
    return(
        <>
        <div className="container-fluid d-flex align-items-center vh-100  justify-content-center">
        <div>
            <MainNav/>
        </div>
       <ProgressLoad trigger={1} msgClass={`h2`} msg={`Loading..`}/>
       </div>
        </>
    )
}

export default LoadingPage