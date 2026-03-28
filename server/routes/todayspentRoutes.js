import express from "express";
import { TodaySpent } from "../models/todayspent.model.js";

const todayspentrouter = express.Router();

// get today's spending
todayspentrouter.get('/todayspent', async (req, res) => {
    try{
    const spent = await TodaySpent.find({});
    res.send({data: spent});
    }catch(err){
        console.log(err)
        res.status(400).send({
            message: "something went wrong!",
            error: err.message
        });
    }
});

// delete an element in spending list 
todayspentrouter.delete('/todayspent/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const response = await TodaySpent.findByIdAndDelete(id);
        console.log(response);
        res.send("success!");
    }catch(err){
        console.log(err);
        res.status(400).send({message: "something went wrong!"});
    }
});

// Save an element in spending list
todayspentrouter.post('/todayspent', async (req,res) => {
    try{
        const data = req.body;
        const spent = new TodaySpent(data)
        const response = await spent.save();
        console.log(response);
        res.send(response);
    }catch(err){
        console.error("Mongoose Error:", err);
        res.status(400).send({
            message: "something went wrong!",
            error: err.message
        });
    }
});

export default todayspentrouter;