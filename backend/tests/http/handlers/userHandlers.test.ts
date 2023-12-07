const app = require("../../.");
const request = require("supertest");

describe("POST /users/login", () => {
    it("should return 200 OK", async () => {
        const res = await request(app).post("/users/login").send({
            email: "user@wfr.loc",
            password: "testpassword"
        });

        expect(res.status).toEqual(200);
    });
});