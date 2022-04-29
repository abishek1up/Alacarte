let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

//Assertion Style
chai.should();

chai.use(chaiHttp);


describe('User API', () => { 

    describe("GET /user/login", () => {
        it("It should GET the Customer details", (done) => {
            const requestBody = {
                "email": "Abishek13@gmail.com",
                "password": "Abishek13"
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


    describe("GET /user/register", () => {
        it("It should GET the Customer details", (done) => {
            const requestBody = {
                "customerName": "vijay13",
                "email": "vijay13@gmail.com",
                "password": "vijay13",
                "location": {
                  "city": "vijay13",
                  "state": "vijay13"
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
            const customerId = 1018;
            chai.request(server)                
                .get("/customer/"+customerId)
                .set('Authentication', '')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('customerName');
                    response.body.should.have.property('customerId').eq(1018);
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
            const customerId = 1018;
            const requestBody = {
                customerName: "Abishek15new",
                location : {
                    "city": "Abishek15citynew" ,
                    "state" : "Abishek15statenew"
                }
              };
            chai.request(server)                
                .put("/customer/"+customerId)
                .set('Authentication', '')
                .send(requestBody)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('customerName');
                    response.body.should.have.property('customerId').eq(1018);
                    response.body.should.have.property('location');
                done();
                });
        });
    });


    describe("DELETE /customer/:customerId", () => {
        it("It should delete the User/Customer", (done) => {
            const customerId = 1018;
            chai.request(server)                
                .delete("/customer/"+customerId)
                .set('Authentication', '')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('acknowledged').eq(true);
                done();
                });
        });
    });

});




