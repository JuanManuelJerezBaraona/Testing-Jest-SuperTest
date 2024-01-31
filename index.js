// Imports
const express = require('express');
const cors = require('cors');

const coffees = require("./cafes.json");

// Server
const app = express(); // Create an express application
app.listen(3000, console.log("✅ Server ON")); // Start the server on port 3000

app.use(express.json()); // Use express.json() middleware to parse incoming JSON requests into JavaScript objects
app.use(cors()); // Use cors() middleware to enable CORS (Cross-Origin Resource Sharing)


// Routes + Controllers
app.get("/cafes", (req, res) => {
    res.status(200).send(coffees)
})

app.get("/cafes/:id", (req, res) => {
    const { id } = req.params
    const coffee = coffees.find(c => c.id == id)
    if (coffee) res.status(200).send(coffee)
    else res.status(404).send({ message: "No se encontró ningún café con ese id" })
})

app.post("/cafes", (req, res) => {
    const coffee = req.body
    const { id } = coffee
    const thereIsACoffeeWithThatId = coffees.some(c => c.id == id)
    if (thereIsACoffeeWithThatId) res.status(400).send({ message: "Ya existe un café con ese id" })
    else {
        coffees.push(coffee)
        res.status(201).send(coffees)
    }
})

app.put("/cafes/:id", (req, res) => {
    const coffee = req.body;
    const { id } = req.params;
    if (id != coffee.id)
        return res
            .status(400)
            .send({
                message: "El id del parámetro no coincide con el id del café recibido",
            });

    const coffeeIndexFound = coffees.findIndex((p) => p.id == id);
    if (coffeeIndexFound >= 0) {
        coffees[coffeeIndexFound] = coffee;
        res.send(coffees);
    } else {
        res
            .status(404)
            .send({ message: "No se encontró ningún café con ese id" });
    }
});

app.delete("/cafes/:id", (req, res) => {
    const jwt = req.header("Authorization")
    if (jwt) {
        const { id } = req.params
        const coffeeIndexFound = coffees.findIndex(c => c.id == id)

        if (coffeeIndexFound >= 0) {
            coffees.splice(coffeeIndexFound, 1)
            console.log(coffeeIndexFound, coffees)
            res.send(coffees)
        } else {
            res.status(404).send({ message: "No se encontró ningún café con ese id" })
        }

    } else res.status(400).send({ message: "No recibió ningún token en las cabeceras" })
});

app.use("*", (req, res) => {
    res.status(404).send({ message: "La ruta que intenta consultar no existe" })
});

module.exports = app;