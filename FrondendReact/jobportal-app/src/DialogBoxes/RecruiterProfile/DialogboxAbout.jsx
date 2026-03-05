import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { authThunk } from "../../Thunks/authThunk";
import ErrorAlert from "../../Components/ErrorAlert";
import ImageAvatar from "../../Components/ImageAvatar";
import { recruiterProfileThunk, recruiterProfileUpdateThunk } from "../../Thunks/recruiterProfileThunk";

function DialogboxAbout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(recruiterProfileThunk());
  }, [user, dispatch]);

  const RecruiterProfile = useSelector(
    (state) => state.recruiterProfile.profile,
  );

  const [visible, setVisible] = useState(false);
  const [AlertMsg, setAlertMsg] = useState(null);
  const [about, setAbout] = useState( RecruiterProfile?.about);
  const [bio, setBio] = useState( RecruiterProfile?.bio);

 const UpdateDatas = {
    about : about ||   RecruiterProfile?.about,
    bio : bio ||  RecruiterProfile?.bio
 }
  
     const handleSubmit = async() => {
      try{
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
      dispatch(recruiterProfileUpdateThunk(UpdateDatas))
      .then(dispatch(recruiterProfileThunk()))
      setAbout(UpdateDatas?.about)
      setBio(UpdateDatas?.bio)
      setAlertMsg(null)
      setVisible(false)
    }catch(err){
      console.log("RecruiterProfile/DialogboxAbout-handlesubmit-Err",err?.message)
    }
     }
     
  return (
    <>
      <span
        className="mx-2"
        label="Show"
        icon={`pi pi-external-link`}
        onClick={
          () => {
            setVisible(true);
            setAbout(RecruiterProfile?.about)
            setBio(RecruiterProfile?.bio)
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
                          breakpoints={{
    "1400px": "50vw",
    "1024px": "60vw",
    "768px": "80vw",
    "560px": "95vw",
    "480px": "98vw"
  }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          setAbout(RecruiterProfile?.about)
          setBio(RecruiterProfile?.bio)
          setAlertMsg(null)
        }}
      >
        <div>
        <ImageAvatar
         avatarSizeH={`70px`}
         avatarSizeW={`70px`}
         nameClass={`h4 mt-4`}
         nameMsg={RecruiterProfile?.firstName + " " + RecruiterProfile?.lastName}  
         srcLink={RecruiterProfile?.profileImage?.url}/>
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