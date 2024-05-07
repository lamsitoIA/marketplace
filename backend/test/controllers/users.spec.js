/* import { faker } from "@faker-js/faker"; */
import { createUser,createWrongUser,createUserDinamic } from "../utils/users.js";
import { sendPostRequest } from "../utils/request.js";

describe("users controller", () => {


  //valid params
  describe(" POST /api/v1/users with valid params", () => {
    const payload = createUser()
    it("It should return a 201, the user was created successfully", async () => {
      const response = await sendPostRequest("/api/v1/users", payload);
      expect(response.statusCode).toBe(201);
    });
  });
  //invalid params
  describe("POST /api/v1/users with invalid params", () => {
    it("should return a 400 status code and an error message indicating the rut must be unique", async () => {
      // Obtener un usuario existente y su rut
      const existingUser = await createUserDinamic();
      const existingRut = existingUser.rut;
  
      // Crear un usuario inválido con el mismo rut existente
      const wrongUser = createWrongUser(existingRut);
  
      // Enviar la solicitud y verificar el mensaje de error
      const response = await sendPostRequest("/api/v1/users", wrongUser);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Has a unique constraint and cannot be repeated in the database");
    });
  });
});

/* "has a unique constraint and cannot be repeated in the database" */
/* import request from "supertest";
import app from "../../server.js";
import { faker} from "@faker-js/faker";

let faker_name = faker.person.firstName()


describe("users controller", () => {
    describe(" POST /api/v1/users with valid params", ()  => {
        it("It should return a 201, the user was created successfully", async () => {

            const payload = {
                user:{
                    name: faker_name,
                    rut : faker.commerce.price({ min: 1000000, max: 30000000, dec: 0 }),
                    email : faker.internet.email(),
                    password : faker.internet.password({ length: 20 }),
                    address : faker.location.direction(),
                    url_icons : faker.internet.url()
                }
            }
            const response = await request(app).post("/api/v1/users").send(payload)
            expect(response.statusCode).toBe(201)
        })
    })
} ) */
