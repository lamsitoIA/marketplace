import request from "supertest";
import app from "../../server.js";
import { generateToken } from "../utils/login.js";
import { generateRandomProduct , generateInvalidProduct } from "../utils/products.js";
import { createProductModels } from "../../src/api/v1/models/productModel.js";
import { sendPostRequest , sendPutRequest } from "../utils/request.js";

describe("products controller", () => {
  let token = generateToken();
  //get valid params
  describe(" GET /api/v1/products with valid params", () => {
    it("It should return 200, all the products were obtained", async () => {
      const response = await request(app).get("/api/v1/products");
      expect(response.statusCode).toBe(200);
    });
    it("The response with products key", async () => {
      const response = await request(app).get("/api/v1/products");
      expect(response.body).toHaveProperty("products");
    });
    it("Is instance of array", async () => {
      //es una instancia de un array, recordemos que los it serian una descripcion de lo que esta testeando
      const response = await request(app).get("/api/v1/products");
      const { products } = response.body; //en response.body va a llegar la respuesta, destructuramos travels
      expect(products).toBeInstanceOf(Array); //toBeInstanceOf puede ser array o string o object o boolean. aca le digo espero que travels sea una instancia de un array
    });
  });

  //get invalid params
  describe(" GET /api/v1/products with invalid params", () => {
    it("It should return a 404 route invalid", async () => {
      const response = await request(app).get("/api/v1/invalidroute");
      expect(response.statusCode).toBe(404);
    });
  });

  //post valid params
  describe(" POST /api/v1/products with valid params", () => {
    const payload = generateRandomProduct();

    it("It should return a 201, the product was created successfully", async () => {
      const response = await sendPostRequest("/api/v1/products", payload);
      expect(response.statusCode).toBe(201);
    });
    it("It should return an object instance, the product was created successfully.", async () => {
      const response = await sendPostRequest("/api/v1/products", payload);
      const { newProduct } = response.body;
      expect(newProduct).toBeInstanceOf(Object);
    });
    it("Return the properties", async () => {
      const response = await sendPostRequest("/api/v1/products", payload);
      expect(response.body).toHaveProperty("newProduct");
    });
  });

  //post with invalid params
  describe(" POST /api/v1/products with invalid params", () => {
    const payload = generateInvalidProduct();

    it("It should return a code 400", async () => {
      const response = await sendPostRequest("/api/v1/products", payload);
      expect(response.statusCode).toBe(400);
    });
    it("Should return an error message", async () => {
      const response = await sendPostRequest("/api/v1/products", payload);
      expect(response.body.error).toBe(
        "exceeds the allowed type of characters"
      );
    });
  });

  //put with valid params, beforeEach and token, En nuestro caso no es necesario ocupar beforeEach yaque tenemos un ambiente para testing, pero igual lo realize
  describe(" PUT /api/v1/products with valid params", () => {
    let existingProductId;
    beforeEach(async () => {
      const payload = generateRandomProduct();
      const product = await createProductModels(payload.product);
      existingProductId = product.id_product; //entonces aqui le pasamos el id del registro recien creado y en send le pasamos data para actualizar ese register
    }); //const data aqui estamos actualizando el payload
    const data = generateRandomProduct();
    it("It should return a code 200, it was updated successfully", async () => {
      const response = await sendPutRequest(`/api/v1/products/${existingProductId}`, token, data);
      expect(response.statusCode).toBe(200);
    });
    it("return the properties", async () => {
      const response = await sendPutRequest(`/api/v1/products/${existingProductId}`, token, data);
      expect(response.body).toHaveProperty("updatedProduct");
    });
    it("return instance of object", async () => {
      const response = await sendPutRequest(`/api/v1/products/${existingProductId}`, token, data);
      const { updatedProduct } = response.body;
      expect(updatedProduct).toBeInstanceOf(Object);
    });
    it("return object with id eq existingProductId", async () => {
      const response = await sendPutRequest(`/api/v1/products/${existingProductId}`, token, data);
      const { updatedProduct } = response.body;
      expect(updatedProduct.id_product).toEqual(existingProductId);
    });
  });

  //put with invalid params
  describe(" PUT /api/v1/products with valid params", () => {
    let existingProductId = 3;
    let tokenInvalid = "21321oij3if";
    const payload = generateRandomProduct();
    it("It should return a 401 code and an error message, the token is not valid", async () => {
      const response = await sendPutRequest(`/api/v1/products/${existingProductId}`, tokenInvalid, payload);
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe("the token is not valid");
    });
    it("It should return a 401 code and an error message, the token must be present", async () => {
      const response = await request(app)
        .put(`/api/v1/products/${existingProductId}`)
        .send(payload);
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe("token must be present");
    });
  });

  //delete with valid params
  describe(" DELETE /api/v1/products with valid params", () => {
    //aqui si es importante el beforeEach, yaque creamos un registro para despues eliminarlo y asi no nos quedamos con registros sin eliminar
    let existingProductId;
    beforeEach(async () => {
      const payload = generateRandomProduct();
      const product = await createProductModels(payload.product);
      existingProductId = product.id_product;
    });
    it("It should return a code 200, it was updated successfully", async () => {
      const response = await request(app)
        .delete(`/api/v1/products/${existingProductId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(204);
    });
  });
});
