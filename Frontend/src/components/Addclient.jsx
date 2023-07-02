import React, { useContext } from 'react'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ClientContext from './context/clients/clientContext';
import { useEffect } from 'react';

const Addclient = () => {
  const context = useContext(ClientContext);
  const {addClient,getClient,values} = context;
  const [client,setClient] = useState({name:"" ,email:"" , phoneNo: "" , address:""})

const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log("getit");
      getClient();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  const handleSubmit =(e)=>{
    e.preventDefault();
    addClient(client.name , client.email , client.phoneNo,client.address);
    setClient({name:"", email:"",phoneNo:"",address:""})
   
  }

  const onChange = (e)=>{
    setClient({...client , [e.target.name]: e.target.value})
   }


  return (
    <div>     
<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
  <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Add Client</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        <a href='/' className="font-medium text-indigo-600 hover:text-indigo-500">start your Journey</a>
      </p>
    </div>
    <form action="#" method="POST" >
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
    <input type="text" name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={client.name} onChange={onChange} placeholder="Enter Client Name" required/>
  </div>
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={client.email} placeholder="name@flowbite.com" onChange={onChange} required/>
  </div>
  <div className="mb-6">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
    <input type="number" name='phoneNo' id="phoneNo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={client.phoneNo}  placeholder="Phone Number" onChange={onChange} required/>
  </div>
  <div className="mb-6">
    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
    <input id="address" name='address' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={client.address} placeholder="Address" onChange={onChange} required/>
  </div>
 
  <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

  </div>
  </div>
  <section className="container mx-auto p-6 font-mono">
  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead className='border-b bg-gray-800 font-medium text-white dark:border-neutral-500'>
          <tr className="text-md font-semibold tracking-wide text-left text-gray-100  uppercase">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone-no</th>
            <th className="px-4 py-3">Address</th>
          </tr>
        </thead>
        <tbody className="bg-white">
        {Array.isArray(values) && values.length > 0 ? (
        values.map((client) => (
          <tr  class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700" key={client._id}>
            <td className="whitespace-nowrap px-6 py-4 font-medium">{client.client_name }</td>
            <td className="whitespace-nowrap px-6 py-4 font-medium">{client.email}</td>
            <td className="whitespace-nowrap px-6 py-4 font-medium">{client.phone_no}</td>
            <td className="whitespace-nowrap px-6 py-4 font-medium">{client.address}</td>
          
                    </tr>
                    ))
                    ) : (
                      <tr>
                        <td colSpan={4}>No data available</td>
                      </tr>
                    )}
        </tbody>
      </table>
    </div>
  </div>
</section>
  </div>
  )
}

export default Addclient