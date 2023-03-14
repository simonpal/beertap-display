// import app from "../../server";
// import request from "supertest";
import * as user from "../user";

describe("POST /user", function () {
  it("should create a new user", async () => {
    const req = { body: { username: "test", password: "test" } };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req, res, () => {});
    //expect(1).toBe(1);
    // const res = await request(app)
    //   .post("/user")
    //   .send({ username: "hello", password: "hola" })
    //   .set("Accept", "application/json");

    // expect(res.headers["Content-Type"]).toMatch(/json/);
    // expect(res.status).toEqual(200);
  });
});
