import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { applicantGetAllThunk } from "../../Thunks/applicantThunk";
import { authThunk } from "../../Thunks/authThunk";
import Button from "@mui/material/Button";
import CustomDateTimePicker from "../../Components/CustomDateTimePicker";
import ErrorAlert from "../../Components/ErrorAlert";
import { sheduleInterviewPostThunk } from "../../Thunks/InterviewThunk";
import ProgressLoad from "../../Components/ProgressLoad";

function DialogboxSheduleInterview({ApplicantId,ApplicantEmail,JobDetails,JobId}){

    const dispatch = useDispatch();

    const [interviewDateAndTime,setInterviewDateAndTime] = useState(null)
    const [interviewLocation,setInterviewLocation] = useState("")
    const [interviewMessage,setInterviewMessage] = useState("")
    const [visible,setVisible] = useState(false)
    const [AlertMsg,setAlertMsg] = useState(null)
    const [load,setLoad] = useState(false)

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);


  useEffect(() => {
    dispatch(applicantGetAllThunk());
  }, [dispatch]);


        const InterviewDatas = {
            applicantId : ApplicantId,
            jobId : JobId,
            jobDetails : JobDetails,
            applicantEmail : ApplicantEmail,
            interviewDateAndTime : interviewDateAndTime,
            interviewLocation: interviewLocation,
            interviewMessage:interviewMessage
        }


  const handleSheduleInterview = () => {
    try{
         setLoad(true)
        if(
            !interviewDateAndTime || 
            interviewLocation.trim() === "" || !interviewLocation ||
            interviewMessage.trim() === "" || !interviewMessage
        ){
            setAlertMsg({
                msg: 'Invalid Form Submit!',
                id: Date.now()
            })
            setLoad(false)
            return
        }

        if(!ApplicantId){
            setAlertMsg({
                msg : 'Applicant not found!',
                id : Date.now()
            })
            setLoad(false)
            return
        }

        if(!JobId){
            setAlertMsg({
                msg : 'Job not found!',
                id : Date.now()
            })
            setLoad(false)
            return
        }

        if(!JobDetails){
                      setAlertMsg({
                msg : 'Job Title not found!',
                id : Date.now()
            })
            setLoad(false)
            return
        }

        if(!ApplicantEmail){
            setAlertMsg({
                msg : 'Applicant Email not found!',
                id : Date.now()
            })
            setLoad(false)
            return
        }
        dispatch(sheduleInterviewPostThunk(InterviewDatas))
        .then(() => setLoad(false))
        .then(() => setAlertMsg(null))
        .then(() => setInterviewDateAndTime(null))
        .then(() => setInterviewLocation(""))
        .then(() => setInterviewMessage(""))
        .then(() => setVisible(false))
      }catch(err){
        console.log("RecruiterPost/DialogboxSheduleInterview-handleSheduleInterview-Err",err?.message)
      }
  }

    return(
       <>
       <Button
       variant="contained"
        label="Show"
        icon={`pi pi-external-link`}
        onClick={() => {
            setVisible(true)
        }}
       >
        Shedule Interview
       </Button>
                     <Dialog
                       header={`Find Dreams`}
                       visible={visible}
                       style={{ width: "50vw" }}
                                         breakpoints={{
    "1400px": "50vw",
    "1024px": "60vw",
    "768px": "80vw",
    "560px": "95vw",
    "480px": "98vw"
  }}
                       onHide={() => {
                         if (!visible) return;
                         setVisible(false)
                         setInterviewDateAndTime(null)
                         setInterviewLocation("")
                         setInterviewMessage("")
                         setLoad(false)
                         setAlertMsg(null);
                       }}
                     >

                    <div className="mt-3">
                    <CustomDateTimePicker value={interviewDateAndTime} setValue={setInterviewDateAndTime}/>
                    </div>
                    <Box
                        component="form"
                        className="mt-4"
                        sx={{ "& > :not(style)": { width: `100%` } }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          type="text"
                          value={interviewLocation}
                          onChange={(e) => setInterviewLocation(e.target.value)}
                          id="outlined-basic"
                          label="Shedule your location"
                          variant="outlined"
                        />
                      </Box>
                      <br/>

                        <Box
                        component="form"
                        sx={{ "& > :not(style)": { width: `100%` } }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          type="text"
                          multiline
                          value={interviewMessage}
                          onChange={(e) => setInterviewMessage(e.target.value)}
                          id="outlined-basic"
                          label="Enter your message"
                          variant="outlined"
                        />
                      </Box>
                      <br/>
                      {load ? <ProgressLoad trigger={1} setSize={`20px`} msg={`Loading`}/> : null}
                      <ErrorAlert
                      alertMsg={AlertMsg}
                      buttonName={`Shedule Interview`}
                       buttonClass={`mt-4`}
                      buttonVariant={`contained`}
                      colorbg={`teal`}
                      handlefn={handleSheduleInterview}
                      />
                     </Dialog>
       </>
    )
}

export default DialogboxSheduleInterview

