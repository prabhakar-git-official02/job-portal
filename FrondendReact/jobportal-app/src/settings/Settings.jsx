import MainNav from "../Navbar/MainNav";
import { useDispatch} from "react-redux";
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
    {
      id: "account",
      label: "Account",
      icon: <PersonOutlineIcon />
    },
    {
      id: "profile",
      label: "Profile",
      icon: <SettingsIcon />
    },
    {
      id: "security",
      label: "Security",
      icon: <SecurityIcon />
    }
  ];

  return (
    <>
      <MainNav />
      <div className="container-fluid m-0 p-0">

<div
  className={`settings-wrapper`}
>

        <div className="settings-container m-0 p-0">

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
          <div className="settings-content d-flex align-items-center">
        
            {route === "account" && <Account /> }

            {route === "profile" &&<ProfileSetting />}

            {route === "security" && <Security/>}
          
          </div>

        </div>

      </div>


      {/* STYLE */}
      <style>{`
*{
  box-sizing:border-box;
}
.settings-wrapper{
  padding:100px 20px 40px;
  background:#f1f5f9;
  min-height:100vh;
  transition:0.3s ease;

  display:flex;
  justify-content:center;
}

/* LAYOUT */
.settings-container{
  display:grid;
  grid-template-columns:260px 1fr;
  gap:30px;
  width:100%;
  max-width:1200px;   /* 👈 THIS makes whole layout center */
}

/* SIDEBAR */
.settings-sidebar{
  background:#fff;
  padding:25px;
  border-radius:18px;
  box-shadow:0 10px 40px rgba(0,0,0,0.06);
  height:fit-content;
  position:sticky;
  top:110px;
  transition:0.3s;
}

.sidebar-title{
  font-weight:700;
  margin-bottom:20px;
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
  margin-bottom:8px;
  transition:all 0.25s ease;
  font-weight:500;
  color:#444;
}

.sidebar-item:hover{
  background:#f1f3f9;
  transform:translateX(3px);
}

.sidebar-item.active{
  background:linear-gradient(135deg,#111,#333);
  color:#fff;
}

.sidebar-divider{
  height:1px;
  background:#eee;
  margin:20px 0;
}

.toggle-group label{
  display:flex;
  justify-content:space-between;
  font-size:14px;
  margin-bottom:12px;
  cursor:pointer;
}

.security-card,
.security-card *{
  box-sizing:border-box;
}

/* CONTENT */
.settings-content{
  background:#fff;
  padding:40px;
  border-radius:18px;
  box-shadow:0 10px 40px rgba(0,0,0,0.06);
  min-height:600px;
  transition:0.3s;
}

/* DARK MODE */
.dark-mode{
  background:#111;
}

.dark-mode .settings-sidebar,
.dark-mode .settings-content{
  background:#1c1c1c;
 
}

.dark-mode .sidebar-item{
  color:#ccc;
}

.dark-mode .sidebar-item:hover{
  background:#2a2a2a;
}

.dark-mode .sidebar-item.active{
  background:#333;
}

/* COMPACT MODE */
.compact{
  font-size:14px;
}

.compact .settings-content{
  padding:25px;
}


/* Tablet */


@media(max-width:1024px){

  .settings-container{
    grid-template-columns:1fr;
    gap:25px;
  }

  .settings-sidebar{
    position:relative;
    top:0;
  }

}
.settings-content > *{
  width:100%;
}

  .security-card{
  margin:0 auto;
}

/* Mobile res */


@media(max-width:768px){

  .settings-wrapper{
    padding:90px 15px 30px;
  }

  .settings-container{
    grid-template-columns:1fr;
    gap:20px;
  }

  .settings-sidebar{
    display:flex;
    flex-direction:row;
    align-items:center;
    width:100%;
    overflow-x:auto;
    gap:10px;
    padding:15px;
    border-radius:14px;
    position:static;
    height:auto;
  }

  /* Hide scrollbar */
  .settings-sidebar::-webkit-scrollbar{
    display:none;
  }

  .settings-sidebar{
    scrollbar-width:none;
  }



  .sidebar-title,
  .sidebar-divider,
  .toggle-group{
    display:none;
  }

  .menu-list{
    flex-direction:row;
    gap:10px;
    width:100%;
  }

  .sidebar-item{
    flex:1;
    flex-direction:column;
    justify-content:center;
    text-align:center;
    min-width:100px;
    font-size:12px;
    margin-bottom:0;
    padding:12px;
  }

  .sidebar-item:hover{
    transform:none;
  }

  .settings-content{
    padding:20px 12px;
    display:flex;
    justify-content:center;   
  }

  .settings-content > *{
    width:100%;
    max-width:420px;          
    margin:0 auto;           
  }

}

@media (max-width:360px){

  .settings-content{
    padding:15px 10px;
    display:flex !important;
    justify-content:center !important;
  }

  .security-card{
    width:100% !important;
    max-width:100% !important;
    margin:0 auto !important;
    box-sizing:border-box;
  }

}



}

      `}</style>
</div>
    </>
  );
}

export default Settings;