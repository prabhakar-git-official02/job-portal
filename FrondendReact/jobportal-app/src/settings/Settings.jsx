import MainNav from "../Navbar/MainNav";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Account from "../settings/Account";
import ProfileSetting from "./ProfileSetting";
import Security from "./Security";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SecurityIcon from "@mui/icons-material/Security";
import { authThunk } from "../Thunks/authThunk";

function Settings() {
  const dispatch = useDispatch();
  const [route, setRoute] = useState("account");

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const menuItems = [
    { id: "account", label: "Account", icon: <PersonOutlineIcon /> },
    { id: "profile", label: "Profile", icon: <SettingsIcon /> },
    { id: "security", label: "Security", icon: <SecurityIcon /> }
  ];

  return (
    <>
      <MainNav />

      <div className="settings-wrapper">
        <div className="settings-container">

          {/* SIDEBAR */}
          <div className="settings-sidebar">
            <h4 className="sidebar-title">
              <SettingsIcon />
              Settings
            </h4>

            <div className="menu-list">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setRoute(item.id)}
                  className={`sidebar-item ${route === item.id ? "active" : ""}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CONTENT */}
          <div className="settings-content">
            {route === "account" && <Account />}
            {route === "profile" && <ProfileSetting />}
            {route === "security" && <Security />}
          </div>

        </div>
      </div>

      <style>{`

*{
  box-sizing:border-box;
}

/* ===== Wrapper ===== */
.settings-wrapper{
  padding:110px 20px 40px;
  min-height:100vh;
  background:linear-gradient(135deg,#f8fafc,#eef2f7);
  display:flex;
  justify-content:center;
}

/* ===== Layout ===== */
.settings-container{
  display:grid;
  grid-template-columns:260px 1fr;
  gap:30px;
  width:100%;
  max-width:1200px;
}

/* ===== Sidebar ===== */
.settings-sidebar{
  background:#ffffff;
  border-radius:18px;
  padding:25px 20px;
  box-shadow:0 10px 35px rgba(0,0,0,0.05);
  height:fit-content;
  position:sticky;
  top:100px;
}

.sidebar-title{
  font-weight:700;
  margin-bottom:25px;
  display:flex;
  align-items:center;
  gap:8px;
  font-size:18px;
}

.menu-list{
  display:flex;
  flex-direction:column;
}

.sidebar-item{
  display:flex;
  align-items:center;
  gap:10px;
  padding:12px 15px;
  border-radius:12px;
  cursor:pointer;
  margin-bottom:10px;
  transition:0.25s ease;
  font-weight:500;
  color:#444;
}

.sidebar-item:hover{
  background:#f2f4f8;
}

.sidebar-item.active{
  background:#385e82;
  color:#fff;
}

/* ===== Content ===== */
.settings-content{
  background:#ffffff;
  padding:40px;
  border-radius:18px;
  box-shadow:0 10px 35px rgba(0,0,0,0.05);
  min-height:600px;
  transition:0.3s ease;
}

/* ===== Tablet ===== */
@media(max-width:1024px){

  .settings-container{
    grid-template-columns:1fr;
  }

  .settings-sidebar{
    position:relative;
    top:0;
  }
}

/* ===== Mobile ===== */
@media(max-width:768px){

  .settings-wrapper{
    padding:100px 15px 30px;
  }

  .settings-container{
    grid-template-columns:1fr;
    gap:20px;
  }

  .settings-sidebar{
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:15px;
    border-radius:14px;
    position:relative;
  }

  .sidebar-title{
    display:none;
  }

  .menu-list{
    flex-direction:row;
    justify-content:space-between;
    width:100%;
    gap:10px;
  }

  .sidebar-item{
    flex:1;
    flex-direction:column;
    justify-content:center;
    text-align:center;
    font-size:12px;
    margin:0;
    padding:10px;
  }

  .settings-content{
    padding:20px 15px;
  }
}

/* ===== Small Mobile ===== */
@media(max-width:400px){
  .sidebar-item span{
    font-size:11px;
  }
}

      `}</style>
    </>
  );
}

export default Settings;