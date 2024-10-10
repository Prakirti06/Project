const express = require("express");
const mongoose = require("mongoose");
const Product = require("./Product");
const bodyParser = require("body-parser");
const cors = require("cors");

const constr = "mongodb+srv://prakirti2004:Zalariya%40123@cluster0.czsc9.mongodb.net/Grocerydata";
const port = 7000;

mongoose
    .connect(constr, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Atlas");

        const app = express();
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json()); 

        // Code for Get All
        app.get("/product", async (req, res) => {
            const products = await Product.find();
            res.send(products);
        });

        // Code for Get By Id
        app.get("/product/:id", async (req, res) => {
            const product = await Product.findById(req.params.id);
            res.send(product);
        });

        // Code for Delete
        app.delete("/product/:id", async (req, res) => {
            const product = await Product.findById(req.params.id);
            await product.deleteOne();
            res.send(product);
        });

        // Code for Insert
        app.post("/product", async (req, res) => {
            try {
                const product = new Product({
                    itemid: req.body.itemid,
                    itemname: req.body.itemname,
                    halfprice: req.body.halfprice,
                    fullprice: req.body.fullprice
                });
                await product.save();
                res.status(201).send(product);
            } catch (error) {
                res.status(400).send({ error: "Error inserting product: " + error.message });
            }
        });

        // Code for Update
        app.put("/product/:id", async (req, res) => {
            const product = await Product.findById(req.params.id);
            product.itemname = req.body.itemname;
            product.halfprice = req.body.halfprice;
            product.fullprice = req.body.fullprice;
            await product.save();
            res.send(product);
        });

        app.listen(port, () => {
            console.log("Server Started on port", port);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
