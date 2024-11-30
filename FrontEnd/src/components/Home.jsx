import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import List from "./List";
import axios from "axios"

function Home(){
    const [data,setData]=useState([])

    useEffect(()=>{
        axios.get(`http://localhost:3000/todo`).then((res)=>{
            setData(res.data)
            console.log("data is fetched successfully")
        }).catch((error)=>{
            console.error(error.message)
        })
    },[])
    return(
        <>
        <h1 className="text-center text-3xl font-bold p-3">TODO APP</h1>
        <div className="w-[100vw] p-3">
            <AddTask/>
            <div className="flex flex-col gap-2 w-[100%] pt-10">
                {
                    data.map((data,i)=>{
                        return <List  key={i} title={data.title} id={data._id}/>
                    })
                }
                
            </div>
        </div>
        </>
    )
}
export default Home