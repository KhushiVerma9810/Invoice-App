import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import ClientContext from './context/clients/clientContext';

const ShowClients = () => {
    const context = useContext(ClientContext);
    const {values} = context;
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (rowId) => {
      setSelectedRow(rowId);
    };
  return (
    <div>
         <div className="min-w-full m-4 mb-8 overflow-hidden justify-center rounded-lg shadow-lg">
    <div className="min-w-full overflow-x-auto overflow-y-auto justify-center">
      <table className="min-w-full">
        {/* <div class="flex flex-col"> */}
  {/* <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8"> */}
      {/* <div class="overflow-hidden"> */}
        {/* <table class="min-w-full text-left text-sm font-light"> */}
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
          onClick={() => handleRowClick(client._id)}>
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
  </div>
// </div>
//     </div>
  )
}

export default ShowClients