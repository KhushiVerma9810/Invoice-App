import React from 'react'
import { useState } from 'react'
import ClientContext from './clientContext';
import axios from 'axios';
import { addclientroute, addcompanyroute, addinvoiceRoute, addproductroute, getclientRoute, getcompanyRoute, getproductRoute } from '../../../utils/APIRoutes';


const ClientState = (props) => {
    const valuesInitial = [];
    const [values , setValues] = useState(valuesInitial);
    const[products , setProducts]= useState(valuesInitial);
    const[companies , setCompany]=useState(valuesInitial);
    const[Invoices , setInvoice]=useState(valuesInitial);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedcomp, setSelectedComp] = useState(null);
    const [selectedProd , setSelectedProd] = useState(null);
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
//ADD PRODUCTS
const addproduct = async(name , price , image)=>{
  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('image' , image);
  const token = localStorage.getItem('token');
  try {
  const response = await axios.post(addproductroute ,formData ,{
   headers:{
    'Content-Type': 'multipart/form-data; ,boundary=---XYZ',
    'auth-token': token,
   }
  })
  console.log("response:", response);
  if(response.data.success){
    localStorage.setItem('token', response.data.authToken);
  }
  const product = await response.data;
  setProducts([...products,product]);
  console.log(products);

} catch (error) {
  console.log('Error:', error);
}  
}

//GET CLIENTS
const getProduct = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(getproductRoute, {
      headers: {
        'Content-Type': 'multipart/form-data; ,boundary=---XYZ',
        'auth-token': token,
      },
    });
    if (response.data.success) {
      localStorage.setItem('token', response.data.authToken);
    }
    const product = await response.data;
    console.log(product);
   setProducts(product);
  } catch (error) {
    console.log('Error:', error);
  }
};
 const addCompany = async(comp_name , email , phone_no, address,country, image)=>{

    const formData = new FormData();
    formData.append('comp_name', comp_name);
    formData.append('email', email);
    formData.append('phone_no', phone_no);
    formData.append('address', address);
    formData.append('country', country);
    formData.append('image', image);     
  const token = localStorage.getItem('token');
  try{
  const response = await axios.post(addcompanyroute ,formData,{
    headers:{
      'Content-Type': 'multipart/form-data; ,boundary=---XYZ',
      'auth-token': token,
    }
  })
    if(response.data.success){
      localStorage.setItem('token', response.data.authToken);
    }
    const company = await response.data;
    setCompany([...companies,company]);
    console.log(companies);
  
}
catch(error){
  console.log('Error:', error);
}
 }

 //Add Invoice Details
 const addInvoice = async(InvoiceNo , invoicedate , duedate,compName,itemsArray , subtotal , discount , tax , client_name,email,emailcmp , address , addresscmp , country , phone_no , phone_nocmp , image , total)=>{
  const token = localStorage.getItem('token');
  const itemsArray2 = [...itemsArray];
 const client = {client_name:client_name,email:email,address:address,phone_no:phone_no};
  const company={compName:compName , emailcmp:emailcmp,addresscmp:addresscmp,country:country,phone_nocmp:phone_nocmp};
  try {
    const response = await axios.post(addinvoiceRoute,{InvoiceNo , invoicedate,duedate,items: itemsArray2 ,client , company,subtotal ,tax,discount , image, total},{
      headers:{
        'Content-Type':'application/json',
        'auth-token':token,
      }
    })
    console.log("response",response)
    if(response.data.success){
      localStorage.setitem('token' , response.data.authToken);
    }
    const invoice = await response.data;
    setInvoice(Invoices.concat(invoice));
  } catch (error) {
    console.log('error',error)
  }
 }
 //GET CLIENTS
const getCompany = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(getcompanyRoute, {
      headers: {
        'Content-Type': 'multipart/form-data; ,boundary=---XYZ',
        'auth-token': token,
      },
    });
    if (response.data.success) {
      localStorage.setItem('token', response.data.authToken);
    }
    const company = await response.data;
    console.log(company);
   setCompany(company);
  } catch (error) {
    console.log('Error:', error);
  }
};

  return (
   <ClientContext.Provider value={{addClient,getClient,values,addproduct,products , getProduct , addCompany , companies , getCompany ,selectedUser,setSelectedUser , selectedcomp,setSelectedComp ,selectedProd,setSelectedProd , addInvoice , Invoices}}>
    {props.children}
   </ClientContext.Provider>
  )
}

export default ClientState