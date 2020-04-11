const express = require("express")

const carsRouter = express.Router()

const db = require("../data/db-config.js")


carsRouter.get("/", (req,res) => {


    db("cars")
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err => res.status(500).json({errorMessage: "Unable to retrieve cars"}))


})


carsRouter.post("/", (req,res) => {
    const carsInfo = req.body;


    if("vin" in carsInfo && "make" in carsInfo && "model" in carsInfo && "mileage" in carsInfo){

        db("cars")
            .insert(carsInfo)
            .then(count => {
                res.status(201).json(count)
            })
            .catch(err => res.status(500).json({errorMessage: "Unable to add car"}))

    } else {
        res.status(400).json({message: "Please include vin, make, model and mileage"})
    }

    
})

carsRouter.put("/:id", (req,res)=>{

    const {id} = req.params;

    const carUpdate = req.body;

    

    db("cars").where({id}).update(carUpdate)
        .then(car => {
            if(car){
                res.status(200).json({updateCount: car})
            } else {
                res.status(500).json({errorMessage: "No car was found with id"})
            }
        })
})

carsRouter.delete("/:id", (req,res) => {
    const {id} = req.params;


    db("cars").where({id}).del()
        .then(count => {
            res.status(200).json({deleteCount: count})
        })
        .catch(err => res.status(500).json({errorMessage: "Unable to delete"}))
})


module.exports = carsRouter;