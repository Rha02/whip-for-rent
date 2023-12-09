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

describe("POST /users/register", () => {
    it("should successfully register", async () => {
        const res = await request(app).post("/users/register").send({
            id: "001001",
            email: "user@wfr.loc",
            firstName: "testfname",
            lastName: "testlname",
            password: "testpassword"
        });

        expect(res.status).toEqual(201);
    });

    it("should fail with missing driver license", async () => {
        const res = await request(app).post("/users/register").send({
            email: "user@wfr.loc",
            firstName: "testfname",
            lastName: "testlname",
            password: "testpassword"
        });

        expect(res.status).toEqual(400);
    });

    it("should fail with missing email", async () => {
        const res = await request(app).post("/users/register").send({
            id: "001001",
            firstName: "testfname",
            lastName: "testlname",
            password: "testpassword"
        });

        expect(res.status).toEqual(400);
    });

    it("should fail with missing first name", async () => {
        const res = await request(app).post("/users/register").send({
            id: "001001",
            email: "user@wfr.loc",
            lastName: "testlname",
            password: "testpassword"
        });

        expect(res.status).toEqual(400);
    });

    it("should fail with missing last name", async () => {
        const res = await request(app).post("/users/register").send({
            id: "001001",
            email: "user@wfr.loc",
            firstName: "testfname",
            password: "testpassword"
        });

        expect(res.status).toEqual(400);
    });

    it("should fail with missing password", async () => {
        const res = await request(app).post("/users/register").send({
            id: "001001",
            email: "user@wfr.loc",
            firstName: "testfname",
            lastName: "testlname"
        });

        expect(res.status).toEqual(400);
    });

    it("should fail creating user", async () => {
        const res = await request(app).post("/users/register").send({
            id: "001001",
            email: "dberror@wfr.loc",
            firstName: "testfname",
            lastName: "testlname",
            password: "testpassword"
        });

        expect(res.status).toEqual(500);
    });
});

describe("GET /users/checkauth", () => {
    it("should successfully return authenticated user", async () => {
        // set auth headers
        const res = await request(app).get("/users/checkauth").set({
            "Authorization": "Bearer token"
        });

        expect(res.status).toEqual(200);
    });
});