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
import { adminProfileThunk, adminProfileUpdateThunk } from "../../Thunks/adminProfileThunk";

function DialogboxAbout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(adminProfileThunk());
  }, [user, dispatch]);

  const AdminProfile = useSelector((state) => state.adminProfile.profile);

  console.log(AdminProfile);
  

  const [visible, setVisible] = useState(false);
  const [AlertMsg, setAlertMsg] = useState(null);
  const [about, setAbout] = useState(AdminProfile?.about);
  const [bio, setBio] = useState(AdminProfile?.bio);

  const UpdateDatas = {
    about: about || AdminProfile?.about,
    bio: bio || AdminProfile?.bio,
  };

  const handleSubmit = async () => {
    if (about.trim() === "" || bio.trim() === "" || !about || !bio) {
      return setAlertMsg({
        msg: "Invalid Update",
        id: Date.now(),
      });
    }
    dispatch(adminProfileUpdateThunk(UpdateDatas)).then(
      dispatch(adminProfileThunk()),
    );
    setAbout(UpdateDatas?.about);
    setBio(UpdateDatas?.bio);
    setAlertMsg(null);
    setVisible(false);
  };
  return (
    <>
      <button
        className="add-btn"
        style={{ background: `linear-gradient(90deg, #8b5cf6, #7c3aed)` }}
        label="Show"
        icon={faPenToSquare}
        breakpoints={{
          "1400px": "50vw",
          "1024px": "60vw",
          "768px": "80vw",
          "560px": "95vw",
          "480px": "98vw",
        }}
        onClick={() => {
          setVisible(true);
          setAbout(AdminProfile?.about);
          setBio(AdminProfile?.bio);
        }}
      >
        Edit <FontAwesomeIcon icon={faPenToSquare} />
      </button>

      <Dialog
        header={`Find Dreams`}
        visible={visible}
        style={{ width: "50vw" }}
        breakpoints={{
          "1400px": "50vw",
          "1024px": "60vw",
          "768px": "80vw",
          "560px": "95vw",
          "480px": "98vw",
        }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          setAbout(AdminProfile?.about);
          setBio(AdminProfile?.bio);
          setAlertMsg(null);
        }}
      >
        <div>
          <ImageAvatar
            avatarSizeH={`70px`}
            avatarSizeW={`70px`}
            nameClass={`h4 mt-4`}
            nameMsg={AdminProfile?.firstName + " " + AdminProfile?.lastName}
            srcLink={AdminProfile?.profileImage?.url}
          />
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
            label={"Edit your Bio"}
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
            label={"Edit your About"}
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
      <style>{`
    .add-btn{
border:none;
color:white;
padding:6px 16px;
font-size:14px;
border-radius:8px;
transition:.2s;
}

.add-btn:hover{
opacity:.9;
}
    `}</style>
    </>
  );
}

export default DialogboxAbout;
