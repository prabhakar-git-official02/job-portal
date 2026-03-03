import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import HomeIcon from '@mui/icons-material/Home';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authThunk } from "../Thunks/authThunk";
import { useSelector } from "react-redux";
import { jobseekerProfileThunk } from "../Thunks/jobseekerProfileThunk";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function DrawerJobseeker({ visible, hide }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toggleDrawer = (newOpen) => () => {
    hide(newOpen);
  };

  
  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

    useEffect(() => {
    if (user?.roleData === "user") {
      dispatch(jobseekerProfileThunk());
    }
  }, [user, dispatch]);

  const JobseekerProfile = useSelector(
    (state) => state.jobseekerProfile.profile,
  );
  
  const DrawerList = (
    <>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        className="smooth"
        style={{transition : `0.3s ease`}}
      >
        <div className="d-flex justify-content-center mt-5">
          <img
          src={`${JobseekerProfile?.profileImage?.url ? JobseekerProfile?.profileImage?.url : "default-profile.jpg" }`}
          alt="profile-logo"
          width={`100px`}
          height={`100px`}
          style={{borderRadius : `100%`}}
          />
        </div>

        <div className="d-flex justify-content-center mt-3">
          <h4>{JobseekerProfile ?  JobseekerProfile?.firstName+ " "+JobseekerProfile?.lastName : null}</h4>
        </div>

           <List onClick={() => navigate('/')}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><HomeIcon/></ListItemIcon>
              <ListItemText primary={`Home`} />
            </ListItemButton>
          </ListItem>
        </List>

        <List onClick={() => {navigate('/allJobs')}}>
          <ListItem disablePadding>
            <ListItemButton >
              <ListItemIcon className="text-dark"><TravelExploreIcon/></ListItemIcon>
              <ListItemText primary={`Browse Jobs`} />
            </ListItemButton>
          </ListItem>
        </List>

        <List onClick={() => navigate('/appliedJobs')}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><CheckBoxIcon/></ListItemIcon>
              <ListItemText primary={`Applied Jobs`} />
            </ListItemButton>
          </ListItem>
        </List>

        <List onClick={() => navigate('/savedJobs')}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><BookmarkIcon/></ListItemIcon>
              <ListItemText primary={`Saved Jobs`} />
            </ListItemButton>
          </ListItem>
        </List>

        <List onClick={() => navigate('/interviewCalls')}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><DraftsIcon/></ListItemIcon>
              <ListItemText primary={`Interview Calls`} />
            </ListItemButton>
          </ListItem>
        </List>

        <List onClick={() => navigate('/notification')}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><AddAlertIcon/></ListItemIcon>
              <ListItemText primary={`Notifications`} />
            </ListItemButton>
          </ListItem>
        </List>


          <List onClick={() => navigate('/jobseekerDashboard')}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><DashboardIcon/></ListItemIcon>
              <ListItemText primary={`Dashboard`} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
         <List  onClick={() => navigate('/setting')}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><SettingsIcon/></ListItemIcon>
              <ListItemText primary={`Settings`} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );

  return (
    <div>
      <Drawer open={visible} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
