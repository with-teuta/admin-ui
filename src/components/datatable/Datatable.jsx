import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";

function Datatable() {
  const [data, setData] = useState(userRows);
  const [list, setList] = useState('');
  const [del, setDel] = useState('');

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  


useEffect(()=> {

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
      axios.get(listUrl, requestOptions)
      .then(
        response => {
          if (
            response.data.status === 'success'
          ) {
              setList(response.data);
          }
          else{
            console.log("Not authenticated!")
          }
        },
       
      )
      
    
    } ,[]
    )

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const deleteUser = (delet) => {
    setDel(delet)
    const listUrl = `https://dev.k8s.testgold.dev/interceptor/admin/v1/users?userId=${delet}`
    const quikly_UIAccessToken = 'quikly.UIaccessToken'
    const quikly_UIAdminToken = 'quikly.UIadminToken'
    
    const accessToken = localStorage.getItem(quikly_UIAccessToken);
    const adminToken = localStorage.getItem(quikly_UIAdminToken);
    console.log("System ID: "+del);
  
    
    const requestOptions = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Wal-Admin-Token': adminToken,
        
      },
    }
      axios.delete(listUrl, requestOptions)
      .then(
        response => {
          if (
            response.data.status === 'success'
          ) {
              setList(response.data);
          }
          else{
            console.log("Not authenticated!")
          }
        },
       
      )
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  console.log(list);
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      {
        list && (
      <div>
        
          {list.response.map(el => (
            <table>
              <tr>
                <td>{el.full_name}</td>
                <td>{el.email}</td>
                <td>{el.product_tier}</td>
                <td>{el.extra_info.type} </td>
                <i 
               onClick={() => deleteUser(el.system_id)}

                >🗑️</i>
              </tr>

            </table>
          ))}
        
      </div>)
}
    </div>
  );
};

export default Datatable;
