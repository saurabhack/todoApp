import { useState } from "react"
import axios from "axios"
function AddTask(){

    const [title,setTitle]=useState('')
    function addTask(e){
        e.preventDefault();
        const data={
            title,
        }
        axios.post(`http://localhost:3000/todo`,data).then(()=>{
            console.log("successfully created")
        }).catch((error)=>{
            console.error(error.message)
        })

    }

    return(
        <>
        <div className="w-[100%] ">
            <form className=" w-[100%] flex justify-center items-center">
                <input type="text"  placeholder="Add Your Note Here" onChange={(e)=>setTitle(e.target.value)} className="w-[50%] p-2 border border-gray-700 focus:outline-none"/>
                <button onClick={addTask} className="w-[10%] bg-red-700 px-4 py-2 text-white">Add</button>
            </form>
        </div>
        </>
    )
}
export default AddTask