
import React, { useState } from 'react'
import {useNavigate  } from "react-router-dom";
import axios from "axios";
import "./login.css"


function Login() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

    const setStorageItem = (key, value) => {
      return localStorage && localStorage.setItem(key, value)
    }
    

    const handleSubmit= e => {
      e.preventDefault();
  
      console.log("The form was submitted with the following data:");
      console.log(this.state);
    }
  
    const handleLogin=()=> {
    const loginUrl = `https://dev.k8s.testgold.dev/interceptor/admin/v1/login`
    const quikly_UIAccessToken = 'quikly.UIaccessToken'
    const quikly_UIAdminToken = 'quikly.UIadminToken'
     
    const user = {
      "email": email,
      "password": password,
    }
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
      axios.post(loginUrl, user, requestOptions).then(
        response => {
          if (
            response.data.status === 'success' &&
            response.data.response.access_token
          ) {
            // auth.login();
            navigate("/home");
            setStorageItem(
              quikly_UIAccessToken,
              response.data.response.access_token
            )
            setStorageItem('isAuthenticate', true)
            setStorageItem(
              quikly_UIAdminToken,
              response.data.response.admin_token
            )
              console.log("Login Sucess!")
              
          }
          else {
              setStorageItem('isAuthenticate', false)
          }
        },
       
      )
    }
      




    return (
        <>
  
  <div className="App">
      <div className="appAside" />
      <div className="appForm">
        <div className="pageSwitcher">
      Sign In
          
        </div>

        <div className="formTitle">
         Sign In
        </div>

        <div className="formCenter">
        <form className="formFields" onSubmit={handleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              onChange={e => {
                setEmail(e.target.value)
              }}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              onChange={e => {
                setPassword(e.target.value)
              }}
            />
          </div>

          <div className="formField">
          <button 
            className="formFieldButton"
            onClick={handleLogin}
            >Sign In</button>
          </div>

        </form>
        
      </div>
        
      </div>
    </div>
        </>
    )
}
  
export default Login