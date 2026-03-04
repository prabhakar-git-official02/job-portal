import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authThunk } from '../Thunks/authThunk';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import DrawerRecruiter from './DrawerRecruiter';
import DrawerAdmin from './DrawerAdmin';
import DrawerJobseeker from './DrawerJobseeker';
import { adminProfileThunk } from '../Thunks/adminProfileThunk';
import { recruiterProfileThunk } from '../Thunks/recruiterProfileThunk';
import { jobseekerProfileThunk } from '../Thunks/jobseekerProfileThunk';


export default function MainNav({Navbg,Iconbg,textColor}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  console.log(user);


  useEffect(() => {
    if (user?.roleData === "admin") {
      dispatch(adminProfileThunk());
    } else if (user?.roleData === "recruiter") {
      dispatch(recruiterProfileThunk());
    } else if (user?.roleData === "user") {
      dispatch(jobseekerProfileThunk());
    }
  }, [user, dispatch, navigate]);

  const JobseekerProfile = useSelector(
    (state) => state.jobseekerProfile.profile,
  );

  const RecruiterProfile = useSelector(
    (state) => state.recruiterProfile.profile,
  );

  const AdminProfile = useSelector((state) => state.adminProfile.profile);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sidebarOpen,setSidebarOpen] = useState(false)


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null)

    if(!user && !sessionStorage.getItem("AuthProvider")){
     return navigate('/login')
    }
    if(user?.roleData === "admin"){
      return AdminProfile ? navigate("/adminProfile") : navigate('/adminProfileForm')
    }
    else if(user?.roleData === "recruiter"){
      return RecruiterProfile ? navigate('/recruiterProfile') : navigate('/recruiterProfileForm')
    }
    else if(user?.roleData === "user"){
      return JobseekerProfile ? navigate('/jobseekerProfile') : navigate('/jobseekerProfileForm')
    }
    else {
      return null
    }
  }

    const handleLogin = () => {
    setAnchorEl(null)
    navigate('/login')
  }

  const handleSettings = () => {
    setAnchorEl(null)
    navigate('/setting')
  }

  const handleSidebar = () => {
    setSidebarOpen(true)
  }

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed"  style={{background : `${Navbg}`,color : `${textColor}`}} className={`m-0 p-2`}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Find Dreams
          </Typography>

            <div>
            
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
                <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
                 {!user ? <MenuItem  onClick={handleLogin}>Login</MenuItem> : null}
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleSettings}>Settings</MenuItem>
              </Menu>
            </div>
          
        </Toolbar>
      </AppBar>
    </Box>
    {
    user?.roleData === "user"?<DrawerJobseeker visible={sidebarOpen} hide={setSidebarOpen}/>:
    user?.roleData === "recruiter" ? <DrawerRecruiter  visible={sidebarOpen} hide={setSidebarOpen}/> :
    user?.roleData === "admin" ? <DrawerAdmin visible={sidebarOpen} hide={setSidebarOpen}/> :
     null
    }
    <style>{`
    .premium-btn {
  background: linear-gradient(135deg, #0A1F44, #1E5BBF);
  color: #ffffff;
  padding: 12px 28px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(30, 91, 191, 0.4);
}

.premium-btn:hover {
  background: linear-gradient(135deg, #123C7A, #2970FF);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(41, 112, 255, 0.5);
}

.premium-btn:active {
  transform: scale(0.98);
}
    `}</style>
    </>
  );
}
