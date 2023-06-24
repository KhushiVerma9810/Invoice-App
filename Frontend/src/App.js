import React from 'react'
import {BrowserRouter,
  Routes , 
  Route
} from "react-router-dom"
import Invoice from './components/Invoice';
import Dashboard from './components/Dashboard';
import Maindash from './components/Maindash';

const App = () => {
  return (
    <>
 <BrowserRouter>
 <div>
   <div className=" w-1/4 h-screen overflow-hidden flex fixed">
       <Maindash/>
        </div>
        <div className=" w-3/4 ml-auto p-8 flex-1 p-10 text-2xl font-bold h-screen overflow-x-auto">
 <Routes>
 <Route path="/invoice" element={<Invoice/>}/>
 <Route path="/dashboard" element={<Dashboard/>}/>
 </Routes>
 </div>
 </div>
 </BrowserRouter>
 </>
  )
}

export default App