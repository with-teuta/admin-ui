import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [productType, setProd] = useState("");
  const [password, setPass] = useState("");

  const sendData=()=>{

    const listUrl = `https://dev.k8s.testgold.dev/interceptor/admin/v1/users`
    const quikly_UIAccessToken = 'quikly.UIaccessToken'
    const quikly_UIAdminToken = 'quikly.UIadminToken'
    
    const accessToken = localStorage.getItem(quikly_UIAccessToken);
    const adminToken = localStorage.getItem(quikly_UIAdminToken);

    console.log(fullName);
  
    const data = {
      "fullName": fullName,
       "email": email, 
       "productType": productType,
        "password": password,
        "systemId": null,
        "isVerified": true
    }
    
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Wal-Admin-Token': adminToken,
        
        
      },
    }
      axios.post(listUrl, data, requestOptions)
      .then(
        response => {
          if (
            response.data.status === 'success'
          ) {
              console.log("created User succes!");
          }
          else{
            console.log("Not authenticated!")
          }
        },
       
      )

  }

  const updateInputValue=(evt)=>{
    const val = evt.target.value;

  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                  <label>FullName</label>
                  <input 
                  type={"text"} 
                  placeholder={"john_doe"} 
                  onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="formInput" >
                  <label>{"Password"}</label>
                  <input 
                  type={"password"}
                   placeholder={"Password"}
                   onChange={e => setPass(e.target.value)}
                   />
                </div>
                <div className="formInput" >
                  <label>{"Email"}</label>
                  <input 
                  type={"mail"} 
                  placeholder={"john_doe@gmail.com"}
                  onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="formInput" >
                  <label>{"Product Type"}</label>
                  <input 
                  type={"text"}
                   placeholder={"the product type"} 
                   onChange={e => setProd(e.target.value)}
                   />
                </div>
                <div className="formInput" >
                  <label>{"is-Verified"}</label>
                  <input type={"text"} placeholder="True/False" />
                </div>
                <div className="formInput" >
                  <label>{"System-Id"}</label>
                  <input type={"text"} placeholder="True/False" />
                </div>
    
              

              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))} */}
            </form>
            
          </div>
          <button onClick={sendData}>send</button>
    
        </div>
      </div>
    </div>
  );
};

export default New;
