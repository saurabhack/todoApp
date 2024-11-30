import { Router } from "express";
import { Todo } from "../Model/todoModel.js";
const router=Router()

router.get('/',async (req,res)=>{
    try {
        const data=await Todo.find({})
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        return error
    }
})

router.post('/',async (req,res)=>{
    try {
        const todoData={title:req.body.title}
        await Todo.create(todoData)
        console.log("the data which is you was submited !!",todoData)
        return res.status(200).json({message:"data is submited successfully"})
    } catch (error) {
        console.error("something went wrong",error)
        return res.status(500).json({message:error.message})
    }
})

router.delete('/:id',async (req,res)=>{
    try {
        const id=req.params
        console.log("",id)
        await Todo.findByIdAndDelete({_id:id.id})
        return res.status(200).json({message:"todo is deleted successfully ..."})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message:error.message})
        
    }
})

router.put('/:id',async (req,res)=>{
    try {
        const {id}=req.params
        console.log("id is =" , id)
        const data={
            title:req.body.title
        }
        console.log("data is ==",data)
        const result =await Todo.findByIdAndUpdate(id,data)
        if(!result){
            return res.status(500).json({message:"id does not matched !!"})
        }
        console.log(result)
        return res.status(200).json({message:"title is updated successfully"})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message:error.message})
    }
})


export default router