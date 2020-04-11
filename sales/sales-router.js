const express = require("express")

const salesRouter = express.Router()

const db = require("../data/db-config.js")


salesRouter.get("/", (req,res) => {
    db("sales")
        .then(sales => {
            res.status(200).json(sales)
        })
        .catch(err => res.status(500).json({errorMessage: "Unable to get sales"}))
})


salesRouter.post("/", (req,res) => {
    
    const salesInfo = req.body;

    if("car_id" in salesInfo && "sold_price" in salesInfo && "price" in salesInfo && "buyer_name" in salesInfo){
        db("sales").insert(salesInfo)
            .then(count => res.status(201).json({count}))
            .catch(err => res.status(500).json({errorMessage: "Unable to post sale."}))
    } else {
        res.status(400).json({message: "car_id, sold_price, price, and buyer_name are required"})
    }
    
})


module.exports= salesRouter;