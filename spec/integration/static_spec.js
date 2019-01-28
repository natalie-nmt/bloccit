const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {
    describe("GET /", () => {
        it("should return status code 200", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
            done();
            });
        });
    });
});

describe("routes : static", () => {
    describe("GET /marco", () => {
        it("should return status code 200", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
            done();
            });
        });
        it("should contain polo in the body of the response", (done) => {
            request.get(base, (err, res, body) => {
                console.log(body.search("polo"));
                expect(body.search("polo")).not.toBe(-1);
            done();
            });
        });
    });
});