import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { jobseeker_Profile_skill_Add_Thunk } from '../../Thunks/jobseekerProfileThunk';
import { jobseeker_Profile_skill_Delete_Thunk } from '../../Thunks/jobseekerProfileThunk';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { authThunk } from '../../Thunks/authThunk';
import { jobseekerProfileThunk } from '../../Thunks/jobseekerProfileThunk';
import ErrorAlert from '../../Components/ErrorAlert';
import ProgressLoad from '../../Components/ProgressLoad';


function DialogboxSkillAdd(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authThunk())
    },[dispatch])

    const user = useSelector((state) => state.auth.user)

    useEffect(() => {
        dispatch(jobseekerProfileThunk())
    },[user,dispatch])

    const JobseekerProfile = useSelector((state) => state.jobseekerProfile.profile)

    const [visible,setVisible] = useState(false)
    const [AddSkill,setAddSkill] = useState("")
    const [AlertMsg,setAlertMsg] = useState(null)
    const [addLoading,setAddLoading] = useState(false)
    const [deleteLoading,setDeleteLoading] = useState(false)

  // handle skill add
   const handleSkillAdd = () => {
    try{
    setAddLoading(true)
    if(AddSkill.trim() ===""){
      setAddLoading(false)
         setAlertMsg({
            msg : 'Invalid Skill Add!',
            id: Date.now()
        })
        return
    }
    dispatch(jobseeker_Profile_skill_Add_Thunk(AddSkill))
    .then(() => setAddLoading(false))
    setAlertMsg(null)
    setAddSkill("")
  }catch(err){
    setAddLoading(false)
    console.log("JobseekerProfile/DialogboxSkill/handleSkillAdd-Err",err?.message)
  }
   }

   // handle skill delete
     const handleFieldDelete = (caughtSkill) => {
      try{
        setDeleteLoading(true)
       dispatch(jobseeker_Profile_skill_Delete_Thunk(caughtSkill))
       .then(() => setDeleteLoading(false))
      }catch(err){
        setDeleteLoading(false)
        console.log("JobseekerProfile/DialogboxSkill/handleSkillDelete-Err",err?.message)
      }
     }
     
    return(
        <>
        <button
        className='add-btn'
        style={{background : ` linear-gradient(90deg, #8b5cf6, #22d3ee)`}}
         label="Show" icon="pi pi-external-link" 
 onClick={() => setVisible(true)}
        >Update Skills</button>
<Dialog   breakpoints={{
    "1400px": "50vw",
    "1024px": "60vw",
    "768px": "80vw",
    "560px": "95vw",
    "480px": "98vw"
  }} header={JobseekerProfile?.firstName} visible={visible} style={{ width: '50vw' }} 
  onHide={() => {if (!visible) return; setVisible(false); setAddLoading(false) ; setDeleteLoading(false)}}>
    <div>
        <h5>Update Skills</h5>
        <br/>
        {JobseekerProfile?.skills.length === 0 ? <span>No more Skills!</span> : null}
            <div className='gap-3 row m-3'>
        {JobseekerProfile?.skills?.map((skill) => (
            <span
            className='text-light fw-bold p-2 rounded skill'
            style={{
            width : `max-content`
            }}
            >{skill}
            <span 
            className='mx-2'
            style={{cursor : `pointer`}}
            onClick={() => handleFieldDelete(skill)}
            ><FontAwesomeIcon icon={faDeleteLeft}/></span>
            </span>
        ))}
                    {deleteLoading ? 
                    <div className="mt-4">
                      <ProgressLoad trigger={1} msg={`Deleting Skill..`} setSize={`20px`}/>
                    </div> : null
                    }
                    </div>
                    <br/>


                      <Box
                        component="form"
                        sx={{ "& > :not(style)": { width: `100%` } }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          type="text"
                          value={AddSkill}
                          multiline
                          onChange={(e) => setAddSkill(e.target.value)}
                          id="outlined-basic"
                          label="Add your skills here.."
                          variant="outlined"
                        />
                      </Box>
    </div>
                    {addLoading ? 
                    <div className="mt-4">
                      <ProgressLoad trigger={1} msg={`Adding Skill..`} setSize={`20px`}/>
                    </div> : null
                    }
    <ErrorAlert
    alertMsg={AlertMsg}
    buttonName={`Add Skill`}
    buttonVariant={`contained`}
    colorbg={`green`}
    buttonClass={`mt-4`}
    handlefn={handleSkillAdd}
    />
</Dialog>
<style>{`
.skill-container{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
}

.skill{
  background:linear-gradient(90deg,#00c6ff,#0072ff);
  color:white;
  padding:5px 12px;
  border-radius:20px;
  font-size:12px;
}
`}</style>
        </>
    )
}

export default DialogboxSkillAdd