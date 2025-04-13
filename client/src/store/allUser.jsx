import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    allUser:[]
}

const allUSer = createSlice({
    name:"allUser",
    initialState:initialValue,
    reducers:{
        setAllUser:(state,action)=>{
            state.allUser= [...action.payload];
        }
    }
})
 
export const {setAllUser} = allUSer.actions;

export default allUSer.reducer;