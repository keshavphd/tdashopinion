import React from 'react'
import { IoMdClose } from "react-icons/io";
import {useForm} from "react-hook-form"
import SummaryAPI, { Axios } from '../utils/Axios';
import toast from 'react-hot-toast';
const DisplayApi = ({close,data,fetchData}) => {
    const value = data;
    const pqr = "https://topinion.netlify.app/"
    const {register,handleSubmit} = useForm({defaultValues:{
        api:pqr+(value?.clientID || '')
    }})
    
const onSubmit = async(formData)=>{
    try {
        const url = formData.api;        
        const id = url.toString().split('/').pop();
        console.log("this",id);
        const data = {userId:value?._id,clientID:id,request:"updated"}
        console.log(data);
        if(id !== (null || undefined || "")){
            const res = await Axios({
                ...SummaryAPI.updateClient,
                data:data
            })
            console.log(res);
            fetchData();
            toast.success("Id added to client")
            close()
        }else{
            toast.error("Please add id")
        }
    } catch (error) {
        console.log((error));
    }
}

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0'>

 <div className='flex flex-col items-center justify-center w-full h-full'>
    <div className='p-4 bg-gradient-to-b from-amber-300 to-blue-500 rounded-2xl bg-neutral-50'>
    <div className='flex justify-between w-full max-w-md'>
            <div className='font-semibold'>Attach a random id to this client</div>

<button className='-mr-2' onClick={close}><IoMdClose size={28}/></button>

        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" autoFocus className='px-4 py-3 mt-4 text-3xl border outline-none min-w-md focus-within:border-amber-300 rounded-xs' {...register("api")} />
        <div className='text-right'>
        <button type='submit' className='font-semibold text-white bg-green-400 mt-2 py-1.5 px-2 rounded'>Submit</button>

        </div>
        </form>
    </div>
        
    
    </div>
    </div>
   
  )
}

export default DisplayApi
