import React from 'react'
import { useState } from 'react';
import { useContext , useEffect } from 'react';
import ClientContext from './context/clients/clientContext';
import { useNavigate } from 'react-router-dom';

const Addproduct = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const context = useContext(ClientContext);
  const {addproduct , products , getProduct} = context;
  const [product,setProduct] = useState({name:"" ,price:"" , image:null})
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log("getit");
      getProduct();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  const handleSubmit =(e)=>{
    e.preventDefault();
    addproduct(product.name ,product.price ,product.image);
    setProduct({name:"", price:"", image:null})
   
  }
  const onChange = (e)=>{
    setProduct({...product , [e.target.name]:e.target.value})
  }
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProduct({ ...product, image: file });
    setSelectedImage(URL.createObjectURL(file));
  };
  return (
    <div>
      <div className="flex w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
{/* <div class="min-h-screen bg-gray-100 flex items-center"> */}
  <div class="container mx-auto p-9 bg-white max-w-30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 ">
    <div class="flex justify-center items-center">
    <div className="w-[35rem] justify-center ">
    <h2 className="mt-4 text-3xl font-bold text-center tracking-tight text-gray-900">Add Product</h2>
       <form class="space-y-6 mt-4" action="#" method="POST" enctype="multipart/form-data">
       <div
      className=""
      onClick={() => document.getElementById('imageUpload').click()}
    >
    {selectedImage ? (
        <img src={selectedImage}  alt="Uploaded" className="h-[16rem] w-[20rem] rounded-full mx-auto " />
      ) : (
        <div className="h-[16rem] w-[20rem] flex items-center justify-center rounded-full mx-auto border-dashed border-2 border-black">
          <i class="bi bi-image" style={{ fontSize: '95px' }} ></i>
        </div>
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
       <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
            <input type="text" name="name" value={product.name}  onChange={onChange} id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="T-shirts" required/>         </div>
        <div>
           <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type="number" value={product.price} name="price" id="price" placeholder="Rs" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={onChange} required/>
        </div>
         <button  onClick={handleSubmit} type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">ADD</button>
    </form>
     </div>
  </div>
</div>
</div>
<section className="container mx-auto p-6 font-mono">
  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead className='border-b bg-gray-800 font-medium text-white dark:border-neutral-500'>
          <tr className="text-md font-semibold tracking-wide text-left text-gray-100  uppercase">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">price</th>
          </tr>
        </thead>
        <tbody className="bg-white">
        {Array.isArray(products) && products.length > 0 ? (
        products.map((prd) => (
          <tr  class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700" key={prd._id}>
            <td className="whitespace-nowrap px-6 py-4 font-medium">
            <div class="flex items-center text-sm">
            <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
            {prd.image && <img className="rounded-full" src={`images/${prd.image}`} width="40" height="40" alt=""/>}</div>
            {prd.name }
            </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4 font-medium">{prd.price}</td>
          
                    </tr>
                    ))
                    ) : (
                      <tr>
                        <td colSpan={2}>No data available</td>
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

export default Addproduct













// import React from 'react'

// const Addproduct = () => {
//   return (
//     <div>
//         <div className='flex flex-col w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 justify-center items-center'>
//   <div className="w-64 h-24 rounded-xl shadow-lg mx-4 mt-4 overflow-hidden  mx-auto container">
//     <img
//       src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
//       class="h-full w-full object-cover"
//     />
//   </div>
 
//     <form class="space-y-6" action="#">
//         <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
//         <div>
//             <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//             <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required/>
//         </div>
//         <div>
//             <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
//             <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
//         </div>
//         <div class="flex items-start">
//             <div class="flex items-start">
//                 <div class="flex items-center h-5">
//                     <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
//                 </div>
//                 <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
//             </div>
//             <a href="#" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
//         </div>
//         <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
//         <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
//             Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
//         </div>
//     </form>
// </div>
//  </div>
//   )
// }

// export default Addproduct