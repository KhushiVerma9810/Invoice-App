import React from 'react'
import { useState } from 'react'
import ClientContext from './clientContext';
import axios from 'axios';
import { addclientroute, getclientRoute } from '../../../utils/APIRoutes';


const ClientState = (props) => {
    const valuesInitial = [];
    const [values , setValues] = useState(valuesInitial);

// ADD CLIENT 
    const addClient = async(client_name , email , phone_no , address , image)=>{
      const formData = new FormData();
          formData.append('client_name', client_name);
          formData.append('email', email);
          formData.append('phone_no', phone_no);
          formData.append('address', address);
          formData.append('image', image);             
      const token = localStorage.getItem('token');
        try{
          console.log("multi");
          const response = await axios.post(addclientroute, formData, {
            headers: {
              // 'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,

              'Content-Type': 'multipart/form-data; ,boundary=---XYZ'
              ,
              'auth-token': token,
            },
          });
        console.log("response:", response);
        console.log(image);
        console.log("multi");
     if (response.data.success){
       // Save the auth token and redirect
       console.log(response.data);
       localStorage.setItem('token', response.data.authToken);
     }
     const client = await response.data;
    setValues([...values,client]);
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
        'Content-Type': 'multipart/form-data; ,boundary=---XYZ',
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