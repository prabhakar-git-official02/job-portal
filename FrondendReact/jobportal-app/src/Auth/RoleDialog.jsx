import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { EmailExistAction } from "../Redux/authSlice";
import { useDispatch } from "react-redux";
import { GoogleApiCallThunk } from "../Thunks/EmailExistThunk";
import ErrorAlert from "../Components/ErrorAlert";
import ProgressLoad from "../Components/ProgressLoad";
import { showAlert } from "../Scripts/Alert";

function RoleDialog({ visibleRes, tokenRes }) {

  const navigate = useNavigate()

  const [visible, setVisible] = useState(false);
  const [role, setRole] = useState("");
  const [Alertmsg,setAlertmsg] = useState(null)
  const [load,setLoad] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!visibleRes) {
      setVisible(true);
    }
  }, [visibleRes]);

 const handleSubmit = (e) => {
    e.preventDefault()

    setLoad(true)

    if(!tokenRes){
    setLoad(false)
     setAlertmsg({
        msg: "Token Missing!",
        id: Date.now(),
      });
      return
    }

    if(role.trim() === ""){
    setLoad(false)
    setAlertmsg({
        msg: "Role Required!",
        id: Date.now(),
      });
      return
    }

if(tokenRes && role.trim()!==""){
dispatch(GoogleApiCallThunk(tokenRes, role))
.then(() => dispatch(EmailExistAction(null)))
.then(() => setRole(""))
.then(() => setLoad(false))
.then(() => setAlertmsg(null))
.then(() => setVisible(false))
 .then(() => { navigate("/");})
 .catch((err) => showAlert("Error",err.message,"err"))
    }
 }

  return (
    <>
      {/* <Button className='btn btn-outline-primary' label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)}>Add Skills</Button> */}
      <Dialog
        header={"FIND DREAMS"}
        visible={visible}
        breakpoints={{
          "1400px": "50vw",
          "1024px": "60vw",
          "768px": "80vw",
          "560px": "95vw",
          "480px": "98vw",
        }}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          dispatch(EmailExistAction(null))
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="card p-5">
              <h3 className="text-center">
                <span className="mx-2">Login with</span>
                <span style={{ color: "#0d6efd" }}>G</span>
                <span className="text-danger">o</span>
                <span className="text-warning">o</span>
                <span style={{ color: "#0d6efd" }}>g</span>
                <span className="text-success">l</span>
                <span className="text-danger">e</span>
              </h3>
              <h5 className="text-center mt-3">Select Your Role</h5>
              <div className=" d-flex justify-content-center gap-3">
                <Button
                  variant="contained"
                  color={`${role.includes("recruiter") ? "success" : "primary"}`}
                  className={`mt-3`}
                  onClick={() => setRole("recruiter")}
                >
                  Recruiter
                </Button>
                <Button
                  variant="contained"
                  color={`${role.includes("user") ? "success" : "primary"}`}
                  className={`  mt-3`}
                  onClick={() => setRole("user")}
                >
                  Jobseeker
                </Button>
              </div>
              <hr />
              {load?
              <div>
                <ProgressLoad  trigger={1} setSize={`20px`} msg={`Loading`}/>
              </div>:null
               }
              <div>
              <ErrorAlert
              alertMsg={Alertmsg}
              buttonName={`Submit`}
              buttonClass={`mt-3`}
              buttonVariant={`contained`}
              colorbg={`teal`}
              handlefn={handleSubmit}
              
              />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default RoleDialog;
