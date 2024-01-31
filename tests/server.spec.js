const request = require("supertest");
const app = require("../index");

const { faker } = require('@faker-js/faker');
const generateJWT = require("./generate.jwt");

describe("Operaciones CRUD de cafes", () => {

    it("GET /cafes Teste que se devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
        const response = await request(app).get("/cafes").send();
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("DELETE /cafes/:id Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.", async () => {
        let fakeID = faker.number.int({ min: 5, max: 100 })
        const token = generateJWT();

        const response = await request(app).delete(`/cafes/${fakeID}`).set("Authorization", `Bearer ${token}`).send();
        expect(response.status).toBe(404);
    });

    it("Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
        const payload = {
            id: faker.number.int({ min: 5, max: 100 }),
            nombre: faker.commerce.productName()
        };

        const response = await request(app).post("/cafes").send(payload);
        expect(response.status).toBe(201);
    });

    it("Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
        const payload = {
            id: faker.number.int({ min: 5, max: 100 }),
            nombre: faker.commerce.productName()
        };

        let fakeID = faker.number.int({ min: 101, max: 200 })

        const response = await request(app).put(`/cafes/${fakeID}`).send(payload);
        expect(response.status).toBe(400);
    });
});
