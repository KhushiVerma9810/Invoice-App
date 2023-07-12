import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import ClientContext from './context/clients/clientContext';
import { useRef ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const ClientShow = React.forwardRef((props, ref) => {
    const context = useContext(ClientContext);
    const {values ,setSelectedUser , getClient} = context;
    const [selectedRow, setSelectedRow] = useState(null);
   
    const handleRowClick = (rowId) => {
      setSelectedUser(rowId);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const closeModal = () => {
    //   if (refClose.current) {
    //     // modalRef.current.classList.remove('show');
    //    refClose.current.click();
    //   }
    // };
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

  
    const modalRef = useRef(null);

    const openModal = () => {
      if (modalRef.current) {
        modalRef.current.style.display = 'block';
      }
    };
  
    const closeModal = () => {
      if (modalRef.current) {
        modalRef.current.style.display = 'none';
      }
    };
  
    React.useImperativeHandle(ref, () => ({
      openModal,
      closeModal
    }));
  return (
    <div>
      
       {/* <button  data-modal-target="staticModal" data-modal-toggle="staticModal"
        class="block text-white hidden bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Toggle modal
      </button> */}

      {/* <!-- Main modal --> */}

      <div ref={modalRef} style={{ display: 'none' }}  data-te-modal-init
  class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
  id="exampleModalCenteredScrollable"
  tabindex="-1"
  aria-labelledby="exampleModalCenteredScrollable"
  aria-modal="true"
  role="dialog">
     
     <div
    data-te-modal-dialog-ref
    class="pointer-events-none w-full relative flex min-h-[calc(100%-1rem)] translate-y-[-50px] items-center min-[576px]:min-h-[calc(100%-3.5rem)] w-full ">
    <div
      class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600 m-20">
      <div
        class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        {/* <!--Modal title--> */}
        <h5
          class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
          id="exampleModalCenteredScrollableLabel">
          Modal title
        </h5>
        {/* <!--Close button--> */}
        <button onClick={closeModal}
          type="button"
          class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          data-te-modal-dismiss
          aria-label="Close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* <!--Modal body--> */}
      <div class="relative p-4">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8"> 
      <div class="overflow-hidden"> 
      <table class="min-w-full text-left text-sm font-light"> 
        <thead class="border-b border-neutral-700 bg-neutral-800 text-neutral-50 dark:border-neutral-600 dark:bg-neutral-700">
            <tr>
              <th scope="col" class="px-6 py-4">Name</th>
              <th scope="col" class="px-6 py-4">Email</th>
              <th scope="col" class="px-6 py-4">Phone-No</th>
              <th scope="col" class="px-6 py-4">Address</th>
            </tr>
          </thead>
          <tbody className="bg-white">
        {Array.isArray(values) && values.length > 0 ? (
        values.map((client) => (
          <tr  key={client._id}  className={`${
            selectedRow === client._id ? 'bg-gray-500' : 'bg-gray-100'
        } hover:bg-gray-400 cursor-pointer`}
          onClick={() => handleRowClick(client)}>
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

      {/* <!--Modal footer--> */}
      <div
        class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        <button
          type="button" 
          class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
          data-te-modal-dismiss
          data-te-ripple-init
          data-te-ripple-color="light">
          Close
        </button>
        <button
          type="button"
          class="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light">
          Save changes
        </button>
      </div>
    </div>
  </div>
</div>
      </div>
      </div>
  )
})

export default ClientShow