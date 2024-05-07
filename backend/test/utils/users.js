import { faker } from "@faker-js/faker";
import app from "../../server.js";
import request from "supertest";


//create user dinamic
export const createUserDinamic = async () => {
    const userData = {
        user: {
          name: faker.person.firstName(),
          rut: faker.commerce.price({ min: 1000000, max: 30000000, dec: 0 }),
          email:  faker.internet.email(),
          password: faker.internet.password({ length: 20 }),
          address: faker.location.direction(),
          url_icons: faker.internet.url(),
        }
    }

    await request(app).post("/api/v1/users").send(userData)

    return{
        name: userData.user.name,
        rut: userData.user.rut,
        email: userData.user.email,
        password: userData.user.password,
        address: userData.user.address,
        url_icons: userData.user.url_icons
    }
}

//create user valid params
export const createUser = () => {
    return {
      user: {
          name: faker.person.firstName(),
          rut: faker.commerce.price({ min: 1000000, max: 30000000, dec: 0 }),
          email:  faker.internet.email(),
          password: faker.internet.password({ length: 20 }),
          address: faker.location.direction(),
          url_icons: faker.internet.url(),
      },
    };
  }

//create user invalid params rut unique, the rut is dinamic
export const createWrongUser = (rut) => {
    return {
      user: {
          name: faker.person.firstName(),
          rut: rut,
          email:  faker.internet.email(),
          password: faker.internet.password({ length: 20 }),
          address: faker.location.direction(),
          url_icons: faker.internet.url(),
      },
    };
  }