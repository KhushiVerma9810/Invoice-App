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
import Addclient from './components/Addclient';
import ClientState from './components/context/clients/ClientState';
import Addproduct from './components/Addproduct';
// import ShowClients from './components/ShowClients';
import AddCompany from './components/AddCompany';
import ClientShow from './components/ClientShow';
import ShowCompany from './components/ShowCompany';


const App = () => {
  return (
    <>
    <ClientState>
 <BrowserRouter>
 <div>
 <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white h-screen ">
       <Maindash/>
        <div className="h-full overflow-y-auto ml-14 mt-14 mb-10 md:ml-64">
 <Routes>
 <Route path="/invoice" element={<Invoice/>}/>
 <Route path="/dashboard" element={<Dashboard/>}/>
 <Route path="/signup" element={<Signup/>}/>
 <Route path="/login" element={<Login/>}/>
 <Route path='/clients' element={<Addclient/>}/>
 <Route path="/products" element={<Addproduct/>}></Route>
 <Route path='/showclients' element={<ClientShow/>}></Route>
 <Route path='/companies' element={<AddCompany/>}></Route>
 <Route path='/showcompany' element={<ShowCompany/>}></Route>
 </Routes>
 </div>
 </div>
 </div>
 </BrowserRouter>
 </ClientState>
 </>
  )
}

export default App