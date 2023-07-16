import React from 'react'
import { useState } from 'react';
const Table = () => {
  const [rows, setRows] = useState([]);
  const [state,setState]=useState({
    discount: "",
    tax: "",
  })

  const addRow = () => {
    setRows([...rows, { description: '', qty: '', price: '', amount: '' }]);
  };

  const handleInputChange = (index, column, value) => {
    const updatedRows = [...rows];
    updatedRows[index][column] = value;
    setRows(updatedRows);
  };
  // const mul = rows.map((row) => {
  //   const qty = parseFloat(row.qty);
  //   const price = parseFloat(row.price);
  //   return isNaN(qty) || isNaN(price) ? '' : qty * price;
  // });
  const calculateAmount = (qty, price) => {
    const parsedQty = parseFloat(qty);
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedQty) || isNaN(parsedPrice)) {
      return 0;
    }
    return parsedQty * parsedPrice;
  };

  const totalAmount = rows.reduce((acc, row) => {
    const amount = calculateAmount(row.qty, row.price);
    return acc + amount;
  }, 0);
  const handleChange=(evt)=>{
    const { name, value } = evt.target;
  setState((prevState) => ({
    ...prevState,
    [name]: value,
  }));
    
  }
  const TotalSum =rows.reduce((acc, row)=>{
    const { discount, tax } = state;
   const totalsum = Number(discount) + Number(tax) + calculateAmount(row.qty ,row.price);
   return acc + totalsum;
},0);

  // const totalAmount = rows.reduce((acc, row) => {
  //   const amount = parseFloat(row.amount);
  //   return isNaN(amount) ? acc : acc + amount;
  // }, 0);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
 <table className="w-full m-12 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Description</th>
            <th scope="col" class="px-6 py-3">Qty</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Amount</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>        
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
              <td className="px-6 py-4">
                <input  
                  value={row.name}
                  onChange={(e) =>
                    handleInputChange(index, 'description', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  value={row.email}
                  onChange={(e) =>
                    handleInputChange(index, 'qty', e.target.value)
                  }
                />
              </td>
              <td>
                <input  
                  value={row.phone}
                  onChange={(e) =>
                    handleInputChange(index, 'price', e.target.value)
                  }
                />
              </td>
              <td>
              {calculateAmount(row.qty, row.price)}
              {/* {mul[index]} */}
                {/* <input
                  value={row.age}
                  onChange={(e) =>
                    handleInputChange(index, 'age', e.target.value)
                  }
                /> */}
              </td>
              <td class="px-6 py-4">
                    <a href='/'><i class="bi bi-pencil-square p-2"></i></a>

                    <a href='/'><i class="bi bi-trash3-fill"></i></a>
                </td>
            </tr>
      ))}
            <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={addRow}><i class="bi bi-plus-circle pr-4"></i>Add </button>
            <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' ><i class="bi bi-plus-circle pr-4"></i>Existing</button>
            </tbody>
             <tfoot className='m-12'>
             <tr className="py-2 ml-auto mt-20 w-32">
              <th scope="row" colspan="3" class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
               Subtotal
              </th>
              <th scope="row" class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
               Subtotal
              </th>
              <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                {totalAmount.toFixed(2)}
              </td>
             </tr>
             <tr>
              <th scope="row" colspan="3" class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
               Discount
              </th>
              <th scope="row" class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
               Discount
              </th>
              <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
              <input  name='discount'
                 className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-20 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 rounded-lg p-2 mt-1"
                 value={state.discount}
                 onChange={handleChange} />
              </td>
             </tr>
             <tr>
              <th scope="row" colspan="3" class="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
               Tax
              </th>
              <th scope="row" class="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
               Tax
              </th>
              <td class="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
              <input  name='tax'
                 className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-20 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 rounded-lg p-2 mt-1"
                 value={state.tax}
                 onChange={handleChange} />
              </td>
             </tr>
             <tr>
              <th scope="row" colspan="3" class="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
               Total
              </th>
              <th scope="row" class="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden">
               Total
              </th>
              <td class="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
               {TotalSum}
              </td>
            
             </tr>
            </tfoot>
             
      </table>
    </div>
  )
}

export default Table