import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import axios from "axios";


const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const navigate = useNavigate();

  const handleLogout=()=> {
    const logoutUrl = `https://dev.k8s.testgold.dev/interceptor/admin/v1/logout`
    const quikly_UIAccessToken = 'quikly.UIaccessToken'
    const quikly_UIAdminToken = 'quikly.UIadminToken'
    
    const accessToken = localStorage.getItem(quikly_UIAccessToken);
    const adminToken = localStorage.getItem(quikly_UIAdminToken);

    
    let requestOptions = {
      headers: {
        "Authorization": `Bearer ${accessToken}` ,
        "X-Wal-Admin-Token": adminToken,
        
      },
    }
      axios.post(logoutUrl,{}, requestOptions).then(
        response => {
          if (
            response.data.status === 'success'
          ) {
              navigate("/");
              console.log("Logout Sucess!")
              return ;
          }
        },
       
      )
    }

    const handleList=()=> {
      const listUrl = `https://dev.k8s.testgold.dev/interceptor/admin/v1/users`
      const quikly_UIAccessToken = 'quikly.UIaccessToken'
      const quikly_UIAdminToken = 'quikly.UIadminToken'
      
      const accessToken = localStorage.getItem(quikly_UIAccessToken);
      const adminToken = localStorage.getItem(quikly_UIAdminToken);
    
      
      const requestOptions = {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Wal-Admin-Token': adminToken,
          
        },
      }
        axios.get(listUrl, requestOptions).then(
          response => {
            if (
              response.data.status === 'success'
            ) {
                console.log("Listed Sucess!")
                return ;
            }
          },
         
        )
      }
    


  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
          <Link to="/home" style={{ textDecoration: "none" }}>
          <DashboardIcon className="icon" />
            <span>Dashboard</span>
        </Link>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <p className="title">SERVICE</p>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span
            onClick={handleList}>Profile</span>
          </li>
          <li 
            onClick={handleLogout}
          >
            <ExitToAppIcon className="icon" />
            <span
            
            >Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
