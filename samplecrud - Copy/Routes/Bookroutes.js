import express from "express";
import { Book } from "../Models/bookmodels.js";


const router = express.Router()

//send the data to database newbook

router.post('/',async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message:'error'
            })
        }
        const newBook = {
            title : req.body.title,
            author: req.body.author,
            publishYear : req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send("done")
    }catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }   
})

//get data from database using id

router.get('/:id',async (req,res)=>{
    try{
        const {id} = req.params
        const book = await Book.findById(id)
        return res.status(200).json(
            // count:books.length,
            // data:books
            book
        )
    }catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
})

//update the data in database

router.put('/:id',async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message:'error'
            })
        }
        const {id} = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)
        if(!result){
        return res.status(404).send({message:'value incorrect'})
        }
        return res.status(200).send({message:'updated'})
    }catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
})

//delete by id from the database

router.delete('/:id', async (req,res)=>{
    try{
        const {id} = req.params
        const result = await Book.findByIdAndDelete(id)
        if(!result){
        return res.status(404).send({message:"not deleted"})
        }
        return res.status(200).send({message:"deleted"})
    }catch(err){
        console.log(err.message)
    }
})


//get all from the database

router.get('/',async (req,res)=>{
    try{
        const book = await Book.find({})
        return res.status(200).json(
            // count:books.length,
            // data:books
            book
        )
    }catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
})

export default router;