const request = require("supertest");
const app = require("../index");

const { faker } = require('@faker-js/faker');
const generateJWT = require("./generate.jwt");

describe("Read operations for /cafes", () => {

    it("GET /cafes should return status code 200", async () => {
        const response = await request(app).get("/cafes").send();
        expect(response.status).toBe(200);
    });

    it("GET /cafes should return an array", async () => {
        const response = await request(app).get("/cafes").send();
        expect(response.body).toBeInstanceOf(Array);
    });

    it("GET /cafes should return at least 1 object", async () => {
        const response = await request(app).get("/cafes").send();
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe("Delete operations for /cafes", () => {

    let nonExistingId = faker.number.int({ min: 5, max: 100 })
    const token = generateJWT();
    
    it("DELETE /cafes/:id should return status code 404 when trying to delete a coffee with an id that does not exist", async () => {
        const response = await request(app).delete(`/cafes/${nonExistingId}`).set("Authorization", `Bearer ${token}`).send();
        expect(response.status).toBe(404);
    });
});

describe("Create operations for /cafes", () => {
    
    const payload = {
        id: faker.number.int({ min: 5, max: 100 }),
        nombre: faker.commerce.productName()
    };

    it("POST /cafes should add a new coffee and return status code 201", async () => {
        const response = await request(app).post("/cafes").send(payload);
        expect(response.status).toBe(201);
    });
});

describe("Update operations for /cafes", () => {
    
    const payload = {
        id: faker.number.int({ min: 5, max: 100 }),
        nombre: faker.commerce.productName()
    };

    let idInParameters = faker.number.int({ min: 101, max: 200 });

    it("PUT /cafes should return status code 400 if id in parameters is different from id in payload", async () => {
        const response = await request(app).put(`/cafes/${idInParameters}`).send(payload);
        expect(response.status).toBe(400);
    });
});