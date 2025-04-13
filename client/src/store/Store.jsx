import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import sidemenuReducer from "./SideBar"
import allUsers from "./allUser"

const store = configureStore({
  reducer: {
    user: userReducer,
    sidemenu:sidemenuReducer,
    alluser:allUsers
  },
});
export default store;