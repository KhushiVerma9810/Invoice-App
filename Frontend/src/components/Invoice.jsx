import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from './Table';
import { Link  } from 'react-router-dom';

const Invoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(null);
  const [invoiceDueDate, setInvoiceDueDate] = useState('');
  const [billing, setBilling] = useState({ name: '', address: '', extra: '' });
  const [from, setFrom] = useState({ name: '', address: '', extra: '' });
  const [items, setItems] = useState([]);
  // const [openModal, setOpenModal] = useState(false);
  // const modalRef = useRef(null);
  // const refClose = useRef(null)
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const generateInvoiceNumber = (min, max) => {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setInvoiceNumber(`#INV-${randomNum}`);
  };
  // const openModal = () => {
  //   if (modalRef.current) {
  //     modalRef.current.classList.add('show');
  //   }
  // };
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const addInvoiceItem = (item) => {
  //   setItems([...items, item]);
  //   setOpenModal(false);
  // };

  const deleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const numberFormat = (value) => {
    // Format number as per your requirement
    return value;
  };

  const netTotal = () => {
    // Calculate net total
    return 0;
  };

  const totalGST = () => {
    // Calculate total GST
    return 0;
  };

  const printInvoice = () => {
    // Handle print functionality
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      // Update image source
      document.getElementById('image').src = e.target.result;
      document.getElementById('image2').src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  return (
  <>
    <div>
      <div className="border-t-8 border-gray-700 h-2"></div>
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">Invoice</h2>
          <div>
            <div className="relative mr-4 inline-block">
              <div className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center"
                onClick={printInvoice}
              >
               <i class="bi bi-printer"></i>
              </div>
            </div>
            <div className="relative inline-block">
              <div className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center"
                onClick={() => window.location.reload()}
              >
                <i class="bi bi-arrow-clockwise"></i>
              </div>
              {/* Tooltip */}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-8 shadow-md">
          {/* Invoice details */}
          <div className="flex justify-between mb-8">
            <div className="w-2/4">
              <div  className="mb-2 md:mb-1 md:flex items-center">
                <label className=" w-32 text-gray-800 block font-bold text-sm uppercase ">Invoice No :</label>
                <input type="text" className ="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                id="inline-full-name" placeholder="eg. #INV-100001"  value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
              </div>
              <div className="mb-2 md:mb-1 md:flex items-center mt-4">
                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice Date</label>
                    <DatePicker selected={invoiceDate} onChange={(e) => setInvoiceDate(e)}  dateFormat='dd/MM/yyyy' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 block  bg-gray-100 rounded-lg p-2 mt-1"/> 
              </div>
              <div className="mb-2 md:mb-1 md:flex items-center mt-4">
                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Due Date</label>
                <DatePicker selected={invoiceDueDate} onChange={(e) => setInvoiceDueDate(e)}  dateFormat='dd/MM/yyyy' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 block  bg-gray-100 rounded-lg p-2 mt-1"/>
              </div>
            </div>
            </div>
            <div className="flex items-center flex-wrap justify-between mb-8">
              <div className="w-full md:w-1/3 mb-2 md:mb-0">
                <div className='flex items-center' >
                <label className="block mb-1 text-gray-800 font-bold text-sm uppercase tracking-wide mr-3">Billing Address</label>
                <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">existing add.</button>
                </div>
                <input type="text" className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" placeholder="Billing company name" x-model="billing.name" value={billing.address} onChange={(e) => setBilling({ ...billing, address: e.target.value })} />
              <input
                        class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inline-full-name" type="text" placeholder="Billing company address"
                        x-model="billing.address"/>
                    <input
                        class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inline-full-name" type="text" placeholder="Additional info" x-model="billing.extra"/>
                        </div>
              <div className="w-full md:w-1/3">
              <div className='flex items-center' >
                <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide mr-3">Shipping Address  To:</label>
                <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                <i className="bi bi-person-add mr-1"></i>existing</button>
                </div>
                <input type="text" className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 rounded-lg p-2 mt-1" value={from.address} onChange={(e) => setFrom({ ...from, address: e.target.value })}  id="inline-full-name" placeholder="Your company name" x-model="from.name"/>
                <input
                        className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inline-full-name" type="text" placeholder="Your company address" x-model="from.address"/>

                    <input
                        className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inline-full-name" type="text" placeholder="Additional info" x-model="from.extra"/>
            </div>
</div>
          {/* Image */}
          <div className="flex items-center justify-center mb-8">
            <img src="placeholder.png" id="image" alt="Invoice" className="w-32 h-32 object-contain rounded-md" />
          </div>
          <div className="flex justify-center">
            <label className="text-sm text-gray-500 cursor-pointer">
              Upload Custom Image
              <input type="file" className="hidden" accept="image/*" onChange={handleFileInputChange} />
            </label>
          </div>

          {/* Invoice items */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">
              <h3 className="text-xl font-bold mb-2">Invoice Items</h3>
              </div>
                <div>
                    <div class="flex-1 px-1">
            <Table/>  
            </div>
            </div>
          </div>
            </div>

          {/* Totals */}
         

          {/* Action buttons */}
          <div className="flex justify-between">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Save Invoice</button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancel</button>
          </div>
  
      </div>

      {/* Modal */}
    
        {/* <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add Invoice Item</h3>
            {/* Add invoice item form */}
           
          {/* </div>
        </div>  */}
    </div>
    </>
  );
};

export default Invoice;
