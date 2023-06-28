import React from 'react'
import {BrowserRouter,
  Routes , 
  Route
} from "react-router-dom"
import Invoice from './components/Invoice';
import Dashboard from './components/Dashboard';
import Maindash from './components/Maindash';
import Signup from './components/Signup';
import Login from './components/Login' 
import Navbar from './components/Navbar';


const App = () => {
  return (
    <>
 <BrowserRouter>
 <div>
{/*  
 <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white"> */}
 <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white h-screen ">
       <Maindash/>
        {/* <div className="w-full md:w-3/4 p-8 overflow-y-auto ml-0 md:ml-64 mt-14 mb-10 h-full "> */}
        <div className="h-full overflow-y-auto ml-14 mt-14 mb-10 md:ml-64">
 <Routes>
 <Route path="/invoice" element={<Invoice/>}/>
 <Route path="/dashboard" element={<Dashboard/>}/>
 <Route path="/signup" element={<Signup/>}/>
 <Route path="/login" element={<Login/>}/>
 </Routes>
 </div>
 </div>
 </div>
 </BrowserRouter>
 </>
  )
}

export default App