import MainNav from "../Navbar/MainNav"

function NetworkError(){
    return(
        <div className="container-fluid ">
            <MainNav/>
            <div className="row  vh-100 vw-100 d-flex justify-content-center align-items-center">
                <div>
                <h6 className="text-center">Network Issue | Something Went Wrong!</h6>
                 <p className="m-0 p-0 text-danger text-center fw-bold">Server can't connect!</p>
                 </div>
            </div>
        </div>
    )
}

export default NetworkError