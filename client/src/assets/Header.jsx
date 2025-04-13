import React, { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import { IoClose } from "react-icons/io5";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import Login from "../pages/Login";
import Si from "../pages/Si";
import { useDispatch, useSelector } from "react-redux";
import SideMenu from "../pages/SideMenu";
import { setSideMennu } from "../store/SideBar";
import { TbLogout } from "react-icons/tb";
import { logout } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [hideValue, setHideValue] = useState(false);
  const [dashboardSideMenu, setDashboardSideMenu] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [sideMenu,setSideMenu] = useState(false)
  const user = useSelector((state) => state?.user);

  const menuRef = useRef(null);
  const openMenu = () => {
    setHideValue(!hideValue);
  };

  const dashMenu = () => {
    setHideValue(!hideValue);
    setDashboardSideMenu(!dashboardSideMenu);
  };


  const handleSideMenu = ()=>{
    const p = !sideMenu;
    setSideMenu(p);
    dispatch(setSideMennu({sidemenu:p}))
  }

  const handleLogout = ()=>{
    localStorage.removeItem("token")
    dispatch(logout([]));
    navigate("/")
  }

  const handleSignUp = () => {
    setOpenLogin(false);
    setOpenSignUp(true);
  };
  const handleLogin = () => {
    setOpenSignUp(false);
    setOpenLogin(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setHideValue(false);
      }
    };
    const handleScroll = () => {
      !user?.email && setHideValue(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [user?.email]);
// Log the viewport width (browser window size)
// console.log("Viewport Width:", window.innerWidth);

// Log the physical screen width
// console.log("Screen Width:", window.screen.width);


  return (
    <div>
      {openLogin && (
        <Login
          close={() => setOpenLogin(false)}
          open={() => {
            setOpenSignUp(false);
            setOpenLogin(true);
          }}
          opensignup={() => {
            setOpenLogin(false);
            setOpenSignUp(true);
          }}
        />
      )}
      {openSignUp && (
        <Si
          close={() => setOpenSignUp(false)}
          opens={() => {
            setOpenLogin(false);
            setOpenSignUp(true);
          }}
          openlogin={() => {
            setOpenSignUp(false);
            setOpenLogin(true);
          }}
        />
      )}


      <div className="fixed top-0 z-20 flex justify-between w-full h-16 px-4 text-center lg:h-20 bg-gradient-to-r from-yellow-100 to-blue-800">
        <div className={`items-center content-center justify-center block h-full ${user?.email ? ('lg:hidden'):('lg:hidden')}`}>
          <div className="relative flex items-center justify-center h-full ">
            
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="w-56">
          <img src="https://turn2opinion.com/images/logo.png" alt="image" />
          </div>

<div className="font-bold hidden md:block -ml-28 text-3xl text-white">
  {user?.email && 'Admin Dashboard'}
</div>
          
        
        <div className="text-white">
        {user?.email ? (
          <div onClick={handleLogout} className="flex items-center content-center justify-center h-full"><TbLogout size={30}/></div>
        ) : (
          <div className="hidden h-full lg:block md:block">
            <div className="flex h-full">
              <div className="hidden text-xl font-semibold lg:block">
                <div className="flex items-center content-center justify-center h-full">
                  <button className="pl-4 cursor-pointer hover:underline decoration-blue-600">
                    About
                  </button>
                  <ScrollLink
                    to="scrollhere"
                    smooth={true}
                    duration={500}
                    offset={-50}
                    className="pl-4 cursor-pointer hover:underline decoration-blue-600"
                  >
                    Steps to join
                  </ScrollLink>
                  <button className="pl-4 cursor-pointer hover:underline decoration-blue-600">
                    Contact Us
                  </button>
                </div>
              </div>

              <div className="flex items-center ml-3">
                <div className="hidden md:block lg:block">
                  <div className="flex font-semibold border-4 rounded-3xl border-b-amber-700">
                    <button
                      onClick={handleLogin}
                      className="px-3 py-1.5 border-r-2 hover:rounded-2xl hover:bg-gradient-to-b from-red-500 to-blue-500  hover:text-white border-amber-950"
                    >
                      SIGN IN
                    </button>

                    <button
                      onClick={handleSignUp}
                      className="px-3 py-1.5 border-l-2 hover:rounded-2xl hover:bg-gradient-to-b from-red-500 to-blue-500 hover:text-white border-amber-950"
                    >
                      SIGN UP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
