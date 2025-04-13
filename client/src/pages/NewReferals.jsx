import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const NewReferals = () => {
  const params = useParams()
  const [data,setData] = useState([])
  const users = useSelector((state) => state?.alluser?.allUser);
const columnHelper = createColumnHelper();

const user = users?.filter((data)=>data._id == params?.userIds)
const news = ()=>{
  const value = user[0];
  setData(value.referals);
}

useEffect(()=>{
  news()
},[])
const column = [
  columnHelper.accessor((row) => `${row?.firstname} ${row?.lastname}`, {
    id: "fullName",
    header: "Full Name",
  }),
  
  columnHelper.accessor("mobile", {
    header: "Mobile",
    cell: (value) => (
      <div className="mx-auto text-sm w-fit">
        {value.cell.row.original.mobile}
      </div>
    ),
  }),
  columnHelper.accessor((row) => {
    if(total === 5){
      return "Completed"
    }else{
      return "Incomplete"
    }
  }, {
    id: "status",
    header: "Status",
    cell:({cell})=>{
      console.log(cell);
      
      return (<div className='w-full text-[11px] text-center'> {cell.row.original?.formdill1 + cell.row.original?.formdill2 + cell.row.original?.formdill3 + cell.row.original?.formdill4 + cell.row.original?.formdill5 === 5 ? <div className='px-2 text-white py-0.5 font-semibold bg-green-600 rounded-2xl '>Completed</div> : <div className='px-2 py-0.5 font-semibold bg-red-600 rounded-2xl text-white'>Incomplete</div>}</div>)
      
    }
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (value) => (
      <div className="mx-auto text-sm w-fit">
        {value.cell.row.original.email}
      </div>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: "CreatedAt",
    cell: (value) => (
      <div className="mx-auto text-sm w-fit">
        {value.cell.row.original.createdAt}
      </div>
    ),
  }),
  columnHelper.accessor("dateOfBirth", {
    header: "DOB",
    cell: (value) => {
      const dateOBirth = new Date(value.row.original.dateOfBirth);
      const year = dateOBirth.getFullYear();
      const month = (dateOBirth.getMonth() + 1).toString().padStart(2, "0");
      const day = dateOBirth.getDate().toString().padStart(2, "0");
      return <div className="mx-auto text-sm w-fit">
      {day}-{month}-{year}
    </div>;
    },
  }),

  columnHelper.accessor("country", {
    header: "Country",
  }),
  columnHelper.accessor("city", {
    header: "City",
  }),
  columnHelper.accessor("workemail", {
    header: "Workemail",
  }),
  columnHelper.accessor("educationlevel", {
    header: "Education",
  }),
  columnHelper.accessor("incom", {
    header: "Income",
  }),
];

const table = useReactTable({
  data,
  columns: column,
  getCoreRowModel: getCoreRowModel(),
});

  return (
    <div className='mt-10 md:-mt-0 '>
      <div className='pl-2 text-4xl font-semibold text-transparent iw-full bg-clip-text bg-gradient-to-b from-blue-500 to-pink-500'>Referals</div>
     <div className="w-full p-2 overflow-auto bg-gradient-to-bl from-yellow-200 to-blue-50">
           
           <table className="w-full">
             <thead className="py-3 text-white bg-black">
               {table.getHeaderGroups().map((headerGroup) => (
                 <tr key={headerGroup.id}>
                   <th>Serial No.</th>
                   {headerGroup.headers.map((header) => (
                     <th key={header.id} className="border">
                       {header.isPlaceholder
                         ? null
                         : flexRender(
                             header.column.columnDef.header,
                             header.getContext()
                           )}
                     </th>
                   ))}
                 
                 </tr>
               ))}
             </thead>
             <tbody>
               {table.getRowModel().rows.map((row, index) => (
                 <tr key={row.id}>
                   <td className="px-2 text-center border">{index + 1}</td>
                   {row.getVisibleCells().map((cell) => (
                     <td key={cell.id} className="items-center px-2 border-b bg-a">
                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
                     </td>
                   ))}
                 
                 </tr>
               ))}
             </tbody>
           </table>
          
         </div>
    </div>
  )
}

export default NewReferals
