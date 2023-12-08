import request from "supertest";
import app from "../..";

describe("POST /users/login", () => {
    it("should successfully login", async () => {
        const res = await request(app).post("/users/login").send({
            email: "user@wfr.loc",
            password: "testpassword"
        });

        expect(res.status).toEqual(200);
    });
    it("should fail with missing email", async () => {
        const res = await request(app).post("/users/login").send({
            password: "testpassword"
        });

        expect(res.status).toEqual(400);
    });
    it("should fail with missing password", async () => {
        const res = await request(app).post("/users/login").send({
            email: "user@wfr.loc"
        });

        expect(res.status).toEqual(400);
    });
    it("should fail with invalid email", async () => {
        const res = await request(app).post("/users/login").send({
            email: "invalidemail@wfr.loc",
            password: "testpassword"
        });

        expect(res.status).toEqual(404);
    });
    it("should fail with invalid password", async () => {
        const res = await request(app).post("/users/login").send({
            email: "user@wfr.loc",
            password: "invalidpassword"
        });

        expect(res.status).toEqual(401);
    });
});