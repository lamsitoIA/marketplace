import request from "supertest";
import app from "../../server.js";

export const sendPostRequest = async (url, payload) => {
  return await request(app).post(url).send(payload);
}

export const sendPutRequest = async (url, token, data) => {
  return await request(app)
    .put(url)
    .set("Authorization", `Bearer ${token}`)
    .send(data);
}


/*  it("It should return a 201, the user has successfully logged in.", async () => {
      const response = await request(app)
        .post("/api/v1/auth_user")
        .send(payload);
      expect(response.statusCode).toBe(200);
    }); */