import React, { useContext, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from './Table';
import ClientContext from './context/clients/clientContext';
import { useRef , useEffect} from 'react';
import ClientShow from './ClientShow';
import ShowCompany from './ShowCompany';

const Invoice = () => {
  const currentDate = new Date();
  const context = useContext(ClientContext);
  const {selectedUser , selectedcomp , addInvoice } = context;
  const [dates , setdates] = useState({invoicedate:'' , duedate:''});
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(currentDate);
  const [invoiceDueDate, setInvoiceDueDate] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  // const [billing, setBilling] = useState({ name: '', address: '', extra: '' });
  // const [from, setFrom] = useState({ name: '', address: '', extra: '' });
  const [items, setItems] = useState({prod_name:'',price:'',quantity:'',amount:'' ,image:null});
  // const [serialNumber, setSerialNumber] = useState(100);
 const [Total , setTotal]=useState({discount:'' , tax:'' , subtotal:'' , total:''})
  
   useEffect(() => {
     generateInvoiceNumber();
  
   }, [])
   


  const handleSubmit =(e)=>{
    e.preventDefault();
    addInvoice(invoiceNumber, dates.invoicedate , dates.duedate ,companyValues.name,items, Total.subtotal ,Total.discount , Total.tax ,formValues.client_name,formValues.email,companyValues.emailcmp , formValues.address , companyValues.addresscmp , companyValues.country , formValues.phoneNo , companyValues.phone_nocmp , companyValues.image , Total.total);
  }
  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.openModal();
    }
  };
  const modalRef2 = useRef(null);

  const openModal2 = () => {
    if (modalRef2.current) {
      modalRef2.current.openModal();
    }
  };
  const formatDatefunc = (date) => {
    if (date instanceof Date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${year}/${month}/${day}`;
    }
    return '';
  };
  
  const handleDateChange = (selectedDate) => {
    const formatdueDate = formatDatefunc(selectedDate);
    setInvoiceDueDate(selectedDate);
    const formatdate = formatDatefunc(currentDate);
    setdates((prevValues) => ({
      ...prevValues,
     duedate: formatdueDate,
     invoicedate: formatdate,
    }));
     
  };


  const generateInvoiceNumber = () => {
    const min = 10; 
    const max = 9999; 
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setInvoiceNumber(`#INV-${randomNum}`);
  };
  // const openModal = () => {
  //   if (modalRef.current) {
  //     modalRef.current.classList.add('show');
  //     modalRef.current.click();
  //   }
  // };
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const openModal = () => {
  //   if (modalRef.current) {
  //     modalRef.current.openModal();
  //   }
  // };
  // const addInvoiceItem = (item) => {
  //   setItems([...items, item]);
  //   setOpenModal(false);
  // };

  // const deleteItem = (itemId) => {
  //   setItems(items.filter((item) => item.id !== itemId));
  // };


  const printInvoice = () => {
    // Handle print functionality
  };
  const [formValues, setFormValues] = useState({ client_name: '',email: '',address:'',phoneNo:"" });
  const [companyValues, setCompanyValues] = useState({ name: '',emailcmp: '',addresscmp:'',phone_nocmp:"",country:'' ,image:null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  
  };
  const handleInputChangeComp = (e) => {
    const { name, value } = e.target;
   setCompanyValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  
  };


  useEffect(() => {
    if (selectedUser) {
      setFormValues({
        client_name: selectedUser.client_name,
        email: selectedUser.email,
        address:selectedUser.address,
        phoneNo:selectedUser.phone_no
      });
    }
  }, [selectedUser]);
  


  useEffect(() => {
    if (selectedcomp) {
      setCompanyValues({
        name: selectedcomp.comp_name,
        emailcmp: selectedcomp.email,
        addresscmp:selectedcomp.address,
        phone_nocmp:selectedcomp.phone_no,
        country:selectedcomp.country,
        image:selectedcomp.image
      });
      
    }
  }, [selectedcomp]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    console.log(file);
    // setCompanyValues((prevValues) => ({
    //   ...prevValues,
    //   image: file,
      
    // }));
    setCompanyValues({ ...companyValues, image: file });
    };

    const itemsfunc =(value)=>{
      setItems(value);
      // console.log(items.name)
    }
    const totalfunc=(value)=>{
      setTotal(value)
      // console.log(Total);
    }

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
                                id="inline-full-name" placeholder="eg. #INV-100001"  value={invoiceNumber} readOnly/>
                                {/* onChange={(e) => setInvoiceNumber(e.target.value)} */}
              </div>
              <div className="mb-2 md:mb-1 md:flex items-center mt-4">
                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice Date</label>
                    <DatePicker selected={invoiceDate} onChange={(e) => setInvoiceDate( )}  dateFormat='dd/MM/yyyy' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 block  bg-gray-100 rounded-lg p-2 mt-1"/> 
              </div>
              <div className="mb-2 md:mb-1 md:flex items-center mt-4">
                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Due Date</label>
                <DatePicker selected={invoiceDueDate} onChange={(date) => handleDateChange(date, setInvoiceDueDate)}
               dateFormat='dd/MM/yyyy' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 block  bg-gray-100 rounded-lg p-2 mt-1"/>
              </div>
            </div>
            </div>
            <div className="flex items-center flex-wrap justify-between mb-8">
              <div className="w-full md:w-1/3 mb-2 md:mb-0">
                <div className='flex items-center' >
                <label className="block mb-1 text-gray-800 font-bold text-sm uppercase tracking-wide mr-3">Billing Address</label>
          
                <button  data-te-toggle="modal"
    data-te-target="#exampleModalCenteredScrollable"
    data-te-ripple-init
    data-te-ripple-color="light" type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"  onClick={openModal2} >existing add.</button>
    <ShowCompany ref={modalRef2}></ShowCompany>
                </div>
                <input type="text" className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" placeholder="Billing company name" x-model="billing.name"  name='name' value={companyValues.name}
        onChange={handleInputChangeComp}  />
                {/* value={billing.address} onChange={(e) => setBilling({ ...billing, address: e.target.value })} */}

              <input
                        class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inline-full-name" type="text" placeholder="Billing company address"
                        x-model="billing.address" name='addresscmp' value={companyValues.addresscmp}
                        onChange={handleInputChangeComp}/>
                         <input
                        class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inline-full-name" name='country' type="text" placeholder="Billing company address"
                        x-model="billing.address"  value={companyValues.country}
                        onChange={handleInputChangeComp}/>
                    <input
                        class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inline-full-name" type="email" placeholder="Additional info" x-model="billing.extra" name='emailcmp' value={companyValues.emailcmp}
                        onChange={handleInputChangeComp}/>
                         <input
                        class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inline-full-name" type="number" placeholder="Billing company address"
                        x-model="billing.address" name='phoneNo' value={companyValues.phone_nocmp}
                        onChange={handleInputChangeComp}/>
                        </div>
              <div className="w-full md:w-1/3">
              <div className='flex items-center' >
                <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide mr-3">Shipping Address  To:</label>
                <button  onClick={openModal}  type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                <i className="bi bi-person-add mr-1"></i>existing</button>
                <ClientShow  ref={modalRef}/>
                </div>
                <input type="text" className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 rounded-lg p-2 mt-1" value={formValues.client_name}
        onChange={handleInputChange} name='client_name' id="inline-full-name" placeholder="Name" x-model="from.name"/>
                <input
                        className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inline-full-name" name='address' type="text" placeholder="Shipping Address" x-model="from.address" value={formValues.address}
                        onChange={handleInputChange}/>

                    <input name='email'
                        className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inline-full-name" type="email" placeholder="Email" x-model="from.extra" value={formValues.email}
                        onChange={handleInputChange}/>
                          <input
                        className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inline-full-name" name='phoneNo' type="number" placeholder="Contact No." x-model="from.extra" value={formValues.phoneNo}
                        onChange={handleInputChange}/>
            </div>
</div>
          {/* Image */}
          {/* <div
      className="mt-4"
      onClick={() => document.getElementById('imageUpload').click()}
    >
    {selectedImage ? (
        <img src={`images/${companyValues.image}`}  alt="Uploaded" className="h-[9rem] w-[10rem] rounded-full mx-auto " />
      ) : (
        <div className="h-[9rem] w-[10rem] flex items-center justify-center rounded-full mx-auto border-dashed border-2 border-black">
        <i class="bi bi-image" style={{ fontSize: '60px' }} ></i>
      </div>
      )}
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        name='image'
        src={selectedImage}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
    </div> */}
    <div className="mt-4" onClick={() => document.getElementById('imageUpload').click()}>
      
  {selectedImage ? (
    <img src={selectedImage} alt="Uploaded" className="h-[9rem] w-[10rem] rounded-full mx-auto" />
  ) : (
    <>
      {companyValues.image ? (
        <img src={`/images/${companyValues.image}`} alt="Uploaded" className="h-[9rem] w-[10rem] rounded-full mx-auto" />
      ) : (
        <div className="h-[9rem] w-[10rem] flex items-center justify-center rounded-full mx-auto border-dashed border-2 border-black">
          <i className="bi bi-image" style={{ fontSize: '60px' }}></i>
        </div>
      )}
    </>
  )}
  <input
    id="imageUpload"
    type="file"
    accept="image/*"
    name="image"
    onChange={handleFileInputChange}
    style={{ display: 'none' }}
  />
</div>
          {/* <div className="flex items-center justify-center mb-8">
            <img src="placeholder.png" id="image" alt="Invoice" className="w-32 h-32 object-contain rounded-md" />
          </div>
          <div className="flex justify-center">
            <label className="text-sm text-gray-500 cursor-pointer bg-gray-500">
             
              <input type="file" className="hidden" accept="image/*" onChange={handleFileInputChange} />
            </label>
          </div> */}

          {/* Invoice items */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">
              <h3 className="text-xl font-bold mb-2">Invoice Items</h3>
              </div>
                <div>
                    <div class="flex-1 px-1">
            <Table itemsfunc={itemsfunc } totalfunc={totalfunc}/>  
            </div>
            </div>
          </div>
            </div>

          {/* Totals */}
         

          {/* Action buttons */}
          <div className="flex justify-between">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={handleSubmit}>Save Invoice</button>
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
