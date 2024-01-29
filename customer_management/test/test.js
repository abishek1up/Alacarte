let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

var headerVal = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkRlYW4yNkB5YWhvby5jb20iLCJwYXNzd29yZCI6IjBENjNjUDkwRU1KVFZNZCIsImlhdCI6MTY1MTIwOTc0MSwiZXhwIjoxNjUxMjEwMzQxfQ.GNDiF27NuOlsYLQMH4_KhenPgCT08DmUz949b8m6E-s";

describe('User API', () => { 

    describe("POST /user/login", () => {
        it("It should login the Customer", (done) => {
            const requestBody = {
                "email": "Angeline_Krajcik@hotmail.com",
                "password": "N7J8BqkKNE0Ej6K"
              };
            chai.request(server)                
                .post("/user/login")
                .send(requestBody)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });
    });


    describe("POST /user/register", () => {
        it("It should register the Customer", (done) => {
            const requestBody = {
                "customerName": "vijay131",
                "email": "vijay131@gmail.com",
                "password": "vijay131",
                "location": {
                  "city": "vijay131",
                  "state": "vijay131"
                }
              };
            chai.request(server)                
                .post("/user/register")
                .send(requestBody)
                .end((err, response) => {
                    response.should.have.status(201);
                done();
                });
        });
    });




});

describe('Customer API', () => {
      /**
     * Test the GET route
     */


     describe("GET /customer/:customerId", () => {
        it("It should GET the Customer details", (done) => {
            const customerId = 1020;
            chai.request(server)                
                .get("/customer/"+customerId)
                .set('Authorization', headerVal)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('customerName');
                    response.body.should.have.property('customerId').eq(1020);
                    response.body.should.have.property('location');
                done();
                });
        });

        it("It should not GET the Customer details", (done) => {
            const customerId = 101;
            chai.request(server)                
                .get("/customer/" + customerId)
                .end((err, response) => {
                    response.should.have.status(422);
                done();
                });
        });
    });

    describe("PUT /customer/:customerId", () => {
        it("It should Update the Customer details", (done) => {
            const customerId = 1020;
            const requestBody = {
                customerName: "Abishek15new",
                location : {
                    "city": "Abishek15citynew" ,
                    "state" : "Abishek15statenew"
                }
              };
            chai.request(server)                
                .put("/customer/"+customerId)
                .set('Authorization', headerVal)
                .send(requestBody)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('customerName');
                    response.body.should.have.property('customerId').eq(1020);
                    response.body.should.have.property('location');
                done();
                });
        });
    });


    describe("DELETE /customer/:customerId", () => {
        it("It should delete the User/Customer", (done) => {
            const customerId = 1020;
            chai.request(server)                
                .delete("/customer/"+customerId)
                .set('Authorization', headerVal)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('acknowledged').eq(true);
                done();
                });
        });
    });

});




