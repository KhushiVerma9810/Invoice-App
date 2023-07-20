import React from 'react'
import { useContext } from 'react';
import { useRef ,useState,useEffect, forwardRef } from 'react';
import ClientContext from './context/clients/clientContext';
import { useNavigate } from 'react-router-dom';

const ShowProducts = forwardRef((props, ref) => {
    const context = useContext(ClientContext);
    const {products ,setSelectedProd,getProduct} = context;
    const [selectedRow, setSelectedRow] = useState(null);
   
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
    const handleRowClick = (rowId) => {
      setSelectedProd(rowId);
      closeModal();
    };
    const modalRef3 = useRef(null);

    const openModal = () => {
      if (modalRef3.current) {
        modalRef3.current.style.display = 'block';
      }
    };
  
    const closeModal = () => {
      if (modalRef3.current) {
        modalRef3.current.style.display = 'none';
      }
    };
  
    React.useImperativeHandle(ref, () => ({
      openModal,
      closeModal
    }));
  return (
    <div>
         <div ref={modalRef3} style={{ display: 'none' }}  data-te-modal-init
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
              <th scope="col" class="px-6 py-4">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white">
        {Array.isArray(products) && products.length > 0 ? (
        products.map((prod) => (
            <tr  key={prod._id}  className={`${
                selectedRow === prod._id ? 'bg-gray-500' : 'bg-gray-100'
            } hover:bg-gray-400 cursor-pointer`}
              onClick={() => handleRowClick(prod)}>
            <td className="whitespace-nowrap px-6 py-4 font-medium">
            <div class="flex items-center text-sm">
            <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
            {prod.image && <img className="rounded-full" src={`images/${prod.image}`} width="40" height="40" alt=""/>}</div>
            {prod.name}
            </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4 font-medium">{prod.price}</td>
                    </tr>
                    ))
                    ) : (
                      <tr>
                        <td colSpan={5}>No data available</td>
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

export default ShowProducts