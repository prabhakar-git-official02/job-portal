import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authThunk } from "../Thunks/authThunk";
import { useSelector } from "react-redux";
import { recruiterProfileThunk } from "../Thunks/recruiterProfileThunk";
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleIcon from '@mui/icons-material/People';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

function DrawerRecruiter({ visible, hide }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDrawer = (newOpen) => () => {
    hide(newOpen);
  };

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.roleData === "recruiter") {
      dispatch(recruiterProfileThunk());
    }
  }, [user, dispatch]);

  const RecruiterProfile = useSelector(
    (state) => state.recruiterProfile.profile,
  );

  const DrawerList = (
    <>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        className="smooth"
        style={{ transition: `0.3s ease` }}
      >
        <div className="d-flex justify-content-center mt-5">
          <img
            src={`${RecruiterProfile?.profileImage?.url ? RecruiterProfile?.profileImage?.url : "default-profile.jpg" }`}
            alt="profile-logo"
            width={`100px`}
            height={`100px`}
            style={{ borderRadius: `100%` }}
          />
        </div>
          <div className="d-flex justify-content-center mt-3">
          <div>
            <h4>{RecruiterProfile ? RecruiterProfile?.firstName+ " "+RecruiterProfile?.lastName : null}</h4>
            <h6 className="text-success fw-bold">{user?.roleData}</h6>
          </div>
        </div>
        <List onClick={() => navigate("/")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={`Home`} />
            </ListItemButton>
          </ListItem>
        </List>

        <List onClick={() => navigate("/postForm")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><PostAddIcon/></ListItemIcon>
              <ListItemText primary={`Post Job`} />
            </ListItemButton>
          </ListItem>
        </List>

        <List onClick={() => navigate("/viewPosts")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><WorkOutlineIcon/></ListItemIcon>
              <ListItemText primary={`My Job Posts`} />
            </ListItemButton>
          </ListItem>
        </List>

        <List onClick={() => navigate("/myApplicants")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><PeopleIcon/></ListItemIcon>
              <ListItemText primary={`All Applicants`} />
            </ListItemButton>
          </ListItem>
        </List>

        <List onClick={() => navigate("/recruiterDashboard")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={`Dashboard`} />
            </ListItemButton>
          </ListItem>
        </List>
        <List onClick={() => navigate("/candidates")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><SwitchAccountIcon/></ListItemIcon>
              <ListItemText primary={`Candidates`} />
            </ListItemButton>
          </ListItem>
        </List>

        <List onClick={() => navigate("/notification")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><CircleNotificationsIcon/></ListItemIcon>
              <ListItemText primary={`Notifications`} />
            </ListItemButton>
          </ListItem>
        </List>

        <List onClick={() => navigate("/sheduleInterview")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><AssignmentAddIcon/></ListItemIcon>
              <ListItemText primary={`Schedule Interview`} />
            </ListItemButton>
          </ListItem>
        </List>

        <List onClick={() => navigate("/sheduledInterviews")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark"><AssignmentTurnedInIcon/></ListItemIcon>
              <ListItemText primary={`Scheduled Interviews`} />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />
        <List onClick={() => navigate("/setting")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <SettingsIcon />
              </ListItemIcon>
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

export default DrawerRecruiter;
