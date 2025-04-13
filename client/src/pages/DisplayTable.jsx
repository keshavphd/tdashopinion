import React from 'react'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";


const DisplayTable=({data,column,fetchData})=> {
  
    const table = useReactTable({
        data,
        columns: column,
        getCoreRowModel: getCoreRowModel(),
      });
  return (
    <div> <div className="w-full p-2 overflow-auto">
      
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
   
  </div></div>
  )
}

export default DisplayTable