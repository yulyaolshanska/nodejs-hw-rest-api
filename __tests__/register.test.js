// const express = require("express");
// const request = require("supertest");
// const register = require("../controllers/users/register");

// const app = express();
// app.post("/api/users/signup", register);

// describe("Test registration", () => {
//   beforeAll(() => app.listen(3000));
//   // afterAll(() => app.close());

//   test("Ответ должен иметь статус-код 200", async () => {
//     const response = await request(app).post("/api/users/signup");
//     console.log("response", response);
//     expect(response.statusCode).toBe(200);
//   });
//   test("В ответе должен возвращаться токен", () => {});
//   test("В ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String", () => {});
// });
