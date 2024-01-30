const request = require("supertest");
const server = require("../index");

const { faker } = require('@faker-js/faker');
const generateJWT = require("./generate.jwt");

describe("Operaciones CRUD de cafes", () => {

    it("GET /cafes Teste que se devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
        const response = await request(server).get("/cafes").send();
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("DELETE /cafes/:id Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.", async () => {
        let fakeID = faker.string.numeric([1, 2, 3, 4]); // Genera un id aleatorio excluyendo el 1, 2, 3 y 4
        const token = generateJWT();

        const response = await request(server).delete(`/cafes/${fakeID}`).set("Authorization", `Bearer ${token}`).send();
        expect(response.status).toBe(404);
    });



});
