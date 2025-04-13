// import { Outlet } from "react-router-dom";
// import SideMenu from "./SideMenu";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const Dashboard = () => {
//   const sideselector = useSelector((state) => !!state?.sidemenu.sidemenu);
//   useEffect(() => {
//     console.log("hi", sideselector);
//   }, [sideselector]);

//   return (
//     <div className={`flex flex-col overflow-hidden md:flex-row`}>
//       <div
//         className={`${
//           sideselector ? "hidden w-0" : "lg:block md:w-[40%] fixed top-20 z-0  w-full"
//         } transition-all duration-500 h-full hidden z-0 md:w-[40%] max-w-[260px] min-w-[260px] max-h-[80vh] md:mr-2 rounded shadow-lg bg-blue-50 `}
//       >
//         <SideMenu />
//       </div>
//       <div className={`${sideselector ? ('w-full '):('lg:w-[] lg:pl-[21%] mx-1 w-full')} h-full lg:pt-20  bg-white md:ml-1`}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };
// export default Dashboard;


import { Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className={``}>
      
      
      <div className={`h-full bg-white overflow-auto lg:pt-20 md:pt-16`}>
        
        <Outlet />
      </div>
    </div>
  );
};
export default Dashboard;
// {`${
//   sideselector ? "w-full" : "w-full"
// } h-full bg-white overflow-auto`}

