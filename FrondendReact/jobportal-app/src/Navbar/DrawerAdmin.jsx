import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authThunk } from "../Thunks/authThunk";
import { useSelector } from "react-redux";
import { adminProfileThunk } from "../Thunks/adminProfileThunk";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkIcon from '@mui/icons-material/Work';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function DrawerAdmin({ visible, hide }){
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
      if (user?.roleData === "admin") {
        dispatch(adminProfileThunk());
      }
    }, [user, dispatch]);
  
    const AdminProfile = useSelector(
      (state) => state.adminProfile.profile,
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
            src={`${AdminProfile?.profileImage?.url ? AdminProfile?.profileImage?.url : "default-profile.jpg"}`}
            alt="profile-logo"
            width={`100px`}
            height={`100px`}
            style={{ borderRadius: `100%` }}
          />
        </div>
          <div className="d-flex justify-content-center mt-3">
          <div>
            <h4>{AdminProfile ? AdminProfile?.firstName+ " "+AdminProfile?.lastName : null}</h4>
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

             <List onClick={() => navigate("/userLists")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <PeopleAltIcon/>
              </ListItemIcon>
              <ListItemText primary={`All Users`} />
            </ListItemButton>
          </ListItem>
        </List>

                <List onClick={() => navigate("/recruiterLists")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <AccountBoxIcon/>
              </ListItemIcon>
              <ListItemText primary={`Recruiters Profile`} />
            </ListItemButton>
          </ListItem>
        </List>

                        <List onClick={() => navigate("/jobseekerLists")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
               <AccountBoxIcon/>
              </ListItemIcon>
              <ListItemText primary={`Jobseekers Profile`} />
            </ListItemButton>
          </ListItem>
        </List>

        <List onClick={() => navigate("/recruiterPosts")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <WorkIcon/>
              </ListItemIcon>
              <ListItemText primary={`Recruiter Posts`} />
            </ListItemButton>
          </ListItem>
        </List>




                    <List onClick={() => navigate("/adminDashboard")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <DashboardIcon/>
              </ListItemIcon>
              <ListItemText primary={`Dashboard`} />
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

export default DrawerAdmin