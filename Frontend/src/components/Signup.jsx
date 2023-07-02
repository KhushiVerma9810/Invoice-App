import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SignupRoute } from '../utils/APIRoutes';
import { useState } from 'react';

const Signup = () => {

  const [credentials , setCredentials] = useState({name:"" ,email:"" , password: "" , cpassword:""})
  let navigate = useNavigate();
  

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {name , email , password} = credentials;
    
   try{
    const response = await axios.post(SignupRoute , {name , email , password})
    console.log("response:", response);
    
     if (response.data.success){
       // Save the auth token and redirect
      localStorage.setItem('token', response.data.authToken); 
     navigate('/clients');
     console.log('logged in Successfully','success');
    } else {
      console.log('Invalid details', 'error');
    }
  }

catch(err){
  console.log('Error:', err);
}
  }

  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value});
  }


  return (
    <div>
 <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create Your Account</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">start your Journey</a>
      </p>
    </div>
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Name
      </label>
          <input id="Username" name="name" type="name" autoComplete="name" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Username" onChange={onChange} />
        </div>
        
        <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
       Email Address
      </label>
          <input 
          id="email-address" name="email" type="email" 
          autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email Address" onChange={onChange}/>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email" >
          Password
      </label>
          <input id="password" name="password" type="password" 
          pattern=".{6}" autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" minLength={5} onChange={onChange}/>
        </div>
        <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
     Confirm Password
      </label>
          <input id="cpassword" name="cpassword" type="password" 
         minlength="8"
         autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" minLength={5} onChange={onChange}/>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
        </div>
      </div>

      <div>
        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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

export default Signup