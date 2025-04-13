import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SummaryAPI, { Axios } from "../utils/Axios";
import { setAllUser } from "../store/allUser";
import DisplayTable from "./DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import DisplayApi from "./DisplayApi";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Dasboard = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state?.user);
  const [display, setDisplay] = useState(false);
  const [displaydata, setDisplayData] = useState();
  const columnHelper = createColumnHelper();

  const dispatch = useDispatch();

  const users = useSelector((state) => state?.user?.referals);

  const getAll = async () => {
    const allUser = await Axios({
      ...SummaryAPI.alluser,
    });

    const filterData = allUser?.data?.data.filter((data) =>
      ["trues", "updated"].includes(data?.request)
    );
    setData(filterData);
    dispatch(setAllUser(allUser?.data?.data));
  };
  useEffect(() => {
    getAll();
  }, []);
  const giveValues = (value) => {
    setDisplayData(value);
    setDisplay(true);
  };

  const column = [
    columnHelper.accessor((row) => `${row.firstname} ${row.lastname}`, {
      id: "fullName",
      header: "Full Name",
    }),
    columnHelper.accessor("clientID", {
      header: "ClientID",
      cell: (value) => (
        <>
          {value.cell.row.original?.clientID?.trim() === undefined ? (
            <div className="w-full text-center">-</div>
          ) : (
            <div className="w-full text-sm text-center rounded-2xl">
              {value.cell.row.original.clientID}
            </div>
          )}
        </>
      ),
    }),
    columnHelper.accessor("request", {
      header: "Request",
      cell: (value) => {
        return (
          <>
            {value.cell.row.original.request === "trues" ? (
              <button
                onClick={() => giveValues(value.cell.row.original)}
                className="px-2 text-sm w-full text-center cursor-pointer text-white  m-0.5"
              >
                <div className="bg-blue-500 rounded-2xl">Accept</div>
              </button>
            ) : (
              <div className="px-2 text-sm w-full text-center cursor-pointer text-white  m-0.5">
                <div className="bg-green-500 rounded-2xl">Accepted</div>
              </div>
            )}
          </>
        );
      },
    }),

    columnHelper.accessor("referals", {
      header: "Referals",
      cell: (value) => {
        return (
          <>
            {value.cell.row.original.referals.length === 0 ? (
              <div className="px-2 text-sm w-full text-center cursor-not-allowed text-white  m-0.5">
                <div className="bg-gray-200 rounded-2xl">0</div>
              </div>
            ) : (
              <Link to={`/dashboard/${value.cell.row.original._id}`} className="px-2 rounded-xl bg-yellow-700 flex flex-row text-sm w-fit text-center cursor-pointer text-white  m-0.5">
                <div className="w-full ">
                  <div className="flex items-center gap-1.5">
                    <div>{value.cell.row.original.referals?.length}</div>
                    <div>
                      <FaAnglesRight />
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </>
        );
      },
    }),

    columnHelper.accessor("mobile", {
      header: "Mobile",
      cell: (value) => (
        <div className="mx-auto text-sm w-fit">
          {value.cell.row.original.mobile}
        </div>
      ),
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
        return `${day}-${month}-${year}`;
      },
    }),
    columnHelper.accessor("ethnicity", {
      header: "Ethnicity",
    }),
    columnHelper.accessor("country", {
      header: "Country",
    }),
    columnHelper.accessor("city", {
      header: "City",
    }),
    
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="w-full pl-2 text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-pink-500">Clients</div>
      {display && (
        <DisplayApi
          data={displaydata}
          fetchData={getAll}
          close={() => setDisplay(false)}
        />
      )}
      <div className="w-screen pt-10 text-3xl font-bold text-center text-white bg-amber-600 md:hidden md:pt-0">
        Admin
      </div>

      <div>
        <DisplayTable data={data} column={column} fetchData={getAll} />
      </div>
    </div>
  );
};

export default Dasboard;

// import * as React from 'react'
// import ReactDOM from 'react-dom/client'

// import './index.css'

// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table'

// type Person = {
//   firstName: string
//   lastName: string
//   age: number
//   visits: number
//   status: string
//   progress: number
// }

// const defaultData: Person[] = [
//   {
//     firstName: 'tanner',
//     lastName: 'linsley',
//     age: 24,
//     visits: 100,
//     status: 'In Relationship',
//     progress: 50,
//   },
//   {
//     firstName: 'tandy',
//     lastName: 'miller',
//     age: 40,
//     visits: 40,
//     status: 'Single',
//     progress: 80,
//   },
//   {
//     firstName: 'joe',
//     lastName: 'dirte',
//     age: 45,
//     visits: 20,
//     status: 'Complicated',
//     progress: 10,
//   },
// ]

// const columnHelper = createColumnHelper<Person>()

// const columns = [
//   columnHelper.accessor('firstName', {
//     cell: info => info.getValue(),
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor(row => row.lastName, {
//     id: 'lastName',
//     cell: info => <i>{info.getValue()}</i>,
//     header: () => <span>Last Name</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('age', {
//     header: () => 'Age',
//     cell: info => info.renderValue(),
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('visits', {
//     header: () => <span>Visits</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('status', {
//     header: 'Status',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('progress', {
//     header: 'Profile Progress',
//     footer: info => info.column.id,
//   }),
// ]

// function App() {
//   const [data, _setData] = React.useState(() => [...defaultData])
//   const rerender = React.useReducer(() => ({}), {})[1]

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   })

//   return (
//     <div className="p-2">
//       <table>
//         <thead>
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map(cell => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           {table.getFooterGroups().map(footerGroup => (
//             <tr key={footerGroup.id}>
//               {footerGroup.headers.map(header => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.footer,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </tfoot>
//       </table>
//       <div className="h-4" />
//       <button onClick={() => rerender()} className="p-2 border">
//         Rerender
//       </button>
//     </div>
//   )
// }

// const rootElement = document.getElementById('root')
// if (!rootElement) throw new Error('Failed to find the root element')

// ReactDOM.createRoot(rootElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
