import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../Scripts/Alert";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { authThunk } from "../../Thunks/authThunk";
import { jobseekerProfileThunk } from "../../Thunks/jobseekerProfileThunk";
import ErrorAlert from "../../Components/ErrorAlert";
import { jobseekerProfileUpdateThunk } from "../../Thunks/jobseekerProfileThunk";
import ImageAvatar from "../../Components/ImageAvatar";

function DialogboxAbout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(jobseekerProfileThunk());
  }, [user, dispatch]);

  const JobseekerProfile = useSelector(
    (state) => state.jobseekerProfile.profile,
  );

  const [visible, setVisible] = useState(false);
  const [AlertMsg, setAlertMsg] = useState(null);
  const [about, setAbout] = useState(JobseekerProfile?.about);
  const [bio, setBio] = useState(JobseekerProfile?.bio);

 const UpdateDatas = {
    about : about ||  JobseekerProfile?.about,
    bio : bio || JobseekerProfile?.bio
 }
  
     const handleSubmit = async() => {
          if(
          about.trim() === "" ||
          bio.trim() === "" ||
          !about || 
          !bio
      ){
          return setAlertMsg({
            msg : 'Invalid Update',
            id : Date.now()
          })
      }
      dispatch(jobseekerProfileUpdateThunk(UpdateDatas))
      .then(dispatch(jobseekerProfileThunk()))
      setAbout(UpdateDatas?.about)
      setBio(UpdateDatas?.bio)
      setAlertMsg(null)
      setVisible(false)
     }
  return (
    <>
      <span
        className="mx-2"
        label="Show"
          breakpoints={{
    "1400px": "50vw",
    "1024px": "60vw",
    "768px": "80vw",
    "560px": "95vw",
    "480px": "98vw"
  }}
        icon={`pi pi-external-link`}
        onClick={
          () => {
            setVisible(true);
            setAbout(JobseekerProfile?.about)
            setBio(JobseekerProfile?.bio)
          }
          
        }
      >
        <span>{`Edit`}</span>
        <FontAwesomeIcon
          className="mx-1"
          icon={faPenToSquare}
        ></FontAwesomeIcon>
      </span>
      <Dialog
      
        header={`Find Dreams`}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          setAbout(JobseekerProfile?.about)
          setBio(JobseekerProfile?.bio)
          setAlertMsg(null)
        }}
      >
        <div>
        <ImageAvatar
         avatarSizeH={`70px`}
         avatarSizeW={`70px`}
         nameClass={`h4 mt-4`}
         nameMsg={JobseekerProfile?.firstName + " " + JobseekerProfile?.lastName}  
         srcLink={JobseekerProfile?.profileImage?.url}/>
        </div>

                <Box
          component="form"
          sx={{ "& > :not(style)": { width: `100%` } }}
          noValidate
          autoComplete="off"
          className="mt-3"
        >
          <TextField
            type="text"
            value={bio}
            label={ "Edit your Bio"}
            multiline
            onChange={(e) => setBio(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </Box>

        
        <Box
          component="form"
          sx={{ "& > :not(style)": { width: `100%` } }}
          noValidate
          autoComplete="off"
          className="mt-3"
        >
          <TextField
            type="text"
            value={about}
            multiline
            onChange={(e) => setAbout(e.target.value)}
            id="outlined-basic"
            variant="outlined"
            label={ "Edit your About"}
          />
        </Box>


        <ErrorAlert
        alertMsg={AlertMsg}
        buttonName={`Update`}
        buttonVariant={`contained`}
        buttonClass={`mt-4`}
        handlefn={handleSubmit}
        />
      </Dialog>
      
    </>
  );
}

export default DialogboxAbout;
