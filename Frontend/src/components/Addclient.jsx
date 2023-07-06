import React, { useContext } from 'react'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ClientContext from './context/clients/clientContext';
import { useEffect } from 'react';

const Addclient = () => {
  const context = useContext(ClientContext);
  const {addClient,getClient,values} = context;
  const [client,setClient] = useState({name:"" ,email:"" , phoneNo: "" , address:"" , image:null})
  const [selectedImage, setSelectedImage] = useState(null);


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
    addClient(client.name , client.email , client.phoneNo,client.address ,  client.image);
    setClient({name:"", email:"",phoneNo:"",address:"", image:null})
   
  }
  const onChange = (e) => {
    // if (e.target.type === 'file') {
    //   handleImageUpload(e);
    //   setClient({ ...client, [e.target.name]: e.target.value });
    // } else {
      setClient({ ...client, [e.target.name]: e.target.value });
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setClient({ ...client, image: file });
    // setSelectedImage(file);
    setSelectedImage(URL.createObjectURL(file));
  };
  // const onChange = (e)=>{
  //   setClient({...client , [e.target.name]: e.target.value})
  //  }
  

  return (
    <div>     
<div className="flex w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  {/* <div className="w-full max-w-md space-y-8"> */}
  {/* <div class="min-h-screen bg-gray-100 flex items-center"> */}
  <div class="container mx-auto p-9 bg-white max-w-45 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 ">

    <div class="flex justify-center items-center">
    <div className="w-[35rem] justify-center ">
    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Add Client</h2>
    <form action="#" method="POST" enctype="multipart/form-data" >
    <div
      className=""
      onClick={() => document.getElementById('imageUpload').click()}
    >
    {selectedImage ? (
        <img src={selectedImage}  alt="Uploaded" className="h-[16rem] w-[20rem] rounded-full mx-auto " />
      ) : (
        <div className="h-[16rem] w-[20rem] rounded-full mx-auto bg-gray-500"></div>
      )}
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        name='image'
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </div>
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
  <button onClick={handleSubmit} type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
  {/* <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 item-center">Submit</button> */}
 
</form>
</div>
</div>
</div>
{/* </div> */}
  {/* </div> */}
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
            <td className="whitespace-nowrap px-6 py-4 font-medium">
            <div class="flex items-center text-sm">
            <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
            {client.image && <img className="rounded-full" src={`images/${client.image}`} width="40" height="40" alt=""/>}</div>
            {client.client_name }
            </div>
            </td>
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