import { faker } from "@faker-js/faker";
import { createUserDinamic } from "../utils/users.js";
import { sendPostRequest} from "../utils/request.js";
/* import { byEmail } from "../../src/api/v1/models/userModel.js"; */

describe("login controller", () => {
  //valid params
  let userCredentials;
  let payload;

  beforeAll(async () => {
    userCredentials = await createUserDinamic();
    payload = {
      user: {
        email: userCredentials.email,
        password: userCredentials.password,
      },
    };
  });
  describe(" POST /api/v1/auth_user with valid params", () => {
    it("It should return a 201, the user has successfully logged in.", async () => {
      const response = await sendPostRequest("/api/v1/auth_user", payload);
      expect(response.statusCode).toBe(200);
    });

    it("It should return a token in the response body", async () => {
      const response = await sendPostRequest("/api/v1/auth_user", payload);
      expect(response.body.token).toBeTruthy(); //aqui estamos verificando tobetruthy que el token que venga en el cuerpo no sea null o undefined osea que sea true que venga
    });
  });

  //invalid params
  describe(" POST /api/v1/users with invalid params", () => {
    it("It should return a code 400 and a message the user does not exist", async () => {
      const payloadFake = {
        user: {
          email: faker.internet.email(),
          password: faker.internet.password({ length: 20 }),
        },
      };
      const response = await sendPostRequest("/api/v1/auth_user", payloadFake);
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({ error: "Username does not exist" })); // Usando 'toEqual' para comparar el objeto de la respuesta con el objeto esperado
    });

    it("It should return a 400 code and a message that the password is invalid", async () => {
      const payloadFake = {
        user: {
          email: userCredentials.email,
          password: faker.internet.password({ length: 20 }),
        },
      };
      const response = await sendPostRequest("/api/v1/auth_user", payloadFake);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("Invalid password");
    });
  });
});
