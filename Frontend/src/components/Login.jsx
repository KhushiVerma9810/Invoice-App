import React from 'react'
import { loginRoute } from '../utils/APIRoutes'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';



const Login = () => {
  const [credentials , setCredentials] = useState({email:"" , password: ""})

 let navigate = useNavigate();
  // useEffect(() => {
  //   if(localStorage.getItem("chat-app-user")){
  //     navigate("/");
  //   }
     // eslint-disable-next-line
  // }, []);
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const { email , password} = credentials;
    

    const response = await axios.post(loginRoute,{email, password})
    console.log("response:", response);

    if (response.data.success) {
      localStorage.setItem('token', response.data.authToken); 
      navigate('/dashboard');
    }
    else {
     console.log('Invalid details', 'error');
     }
  }

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}

  return (
    <div>
         <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8 bg-lightblue">
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      <p className="mt-2 text-center text-sm text-gray-600">

        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">start your Journey</a>
      </p>
    </div>
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

      <div className="-space-y-px rounded-md shadow-sm"/>
        <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Name
      </label>
          <input id="email-address" name="email" type="email" autoComplete="email" required 
          value={credentials.email}
          onChange={onChange}
          className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"/>
        </div>
        <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
         Password
      </label>
          <input id="password" name="password" type="password" autoComplete="current-password" required 
          value = {credentials.password}
          onChange={onChange}
          className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"/>
        </div>

      <div className="flex items-center justify-between">

        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
        </div>
      </div>

      <div>
        <button  type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>
    </div>
  )
}

export default Login