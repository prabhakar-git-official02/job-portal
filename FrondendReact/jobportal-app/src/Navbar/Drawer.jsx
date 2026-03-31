import * as React from "react";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LoginIcon from '@mui/icons-material/Login';
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { authThunk } from "../Thunks/authThunk";
function Drawer({ visible, hide }){
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authThunk())
  },[dispatch])

  const user = useSelector((state) => state.auth.user)

  const AuthStatus = useSelector((state) => state.auth.status)

  const toggleDrawer = (newOpen ) => () => {
    hide(newOpen);
  };

      const DrawerList = (
    <>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        className="smooth"
        style={{ transition: `0.3s ease` }}
      >
        <div className="d-flex justify-content-center mt-4">
          <div>
          <div
           style={{
            width:"100px",
            height : "100px",
            background:"#396f80",
            color : "white",
            borderRadius : "50%",
            }} 
            className="d-flex justify-content-center  align-items-center"
            ><h1>{"User"?.charAt(0).toUpperCase()}</h1></div>
          <h5 className="mt-3 text-center">{"User"}</h5>
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

        {!user && AuthStatus!==500 ? 
        <List onClick={() => navigate("/login")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <LoginIcon/>
              </ListItemIcon>
              <ListItemText primary={`Login`} />
            </ListItemButton>
          </ListItem>
        </List> : null
        }

        <Divider/>
        <List onClick={() => navigate("/setting")}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-dark">
                <ManageAccountsIcon/>
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
      <MuiDrawer open={visible} onClose={toggleDrawer(false)}>
        {DrawerList}
      </MuiDrawer>


    </div>
  );
}

export default Drawer