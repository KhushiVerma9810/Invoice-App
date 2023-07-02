import React from 'react'
import { useState } from 'react'
import ClientContext from './clientContext';
import axios from 'axios';
import { addclientroute, getclientRoute } from '../../../utils/APIRoutes';


const ClientState = (props) => {
    const valuesInitial = [];
    const [values , setValues] = useState(valuesInitial);

// ADD CLIENT 
    const addClient = async(client_name , email , phone_no , address)=>{
      const token = localStorage.getItem('token');
        try{
        const response = await axios.post(addclientroute , {client_name , email , phone_no , address},{
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        })
        console.log("response:", response);
     if (response.data.success){
       // Save the auth token and redirect
       localStorage.setItem('token', response.data.authToken);
     }
     const client = await response.data;
    setValues(values.concat(client));
    console.log(values);
  }

catch(err){
  console.log('Error:', err);
}
    }

//GET CLIENTS
const getClient = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(getclientRoute, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });
    if (response.data.success) {
      localStorage.setItem('token', response.data.authToken);
    }
    const client = await response.data;
    console.log(client);
    setValues(client);
  } catch (error) {
    console.log('Error:', error);
  }
};

  return (
   <ClientContext.Provider value={{addClient,getClient,values}}>
    {props.children}
   </ClientContext.Provider>
  )
}

export default ClientState