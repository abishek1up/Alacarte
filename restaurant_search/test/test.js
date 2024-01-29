let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Restaurant API', () => { 

    describe("POST /restaurant/", () => {
        it("It creates a new restaurant", (done) => {
            const requestBody = {
                    "address": {
                      "city": "abishek",
                      "state": "abishek",
                      "coordinates": {
                        "lat": 30,
                        "lon":30
                      }
                    },
                    "cuisine": "abishek",
                    "budget": 300,
                    "total_reviews": 0,
                    "ratings": 0,
                    "name": "abishek"
              };
            chai.request(server)                
                .post("/restaurant/")
                .send(requestBody)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });
    });


    describe("GET /restaurant/", () => {
        it("It will get restaurant the Customer", (done) => {
            chai.request(server)                
                .get("/restaurant/")
                .send(requestBody)
                .end((err, response) => {
                    response.should.have.status(201);
                done();
                });
        });
    });

    describe("GET /restaurant/:restaurantId", () => {
        it("It should GET the restaurant details", (done) => {
            const restaurantId = 1020;
            chai.request(server)                
                .get("/curestaurantstomer/"+restaurantId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('name');
                    response.body.should.have.property('restaurantId').eq(1020);
                    response.body.should.have.property('address');
                done();
                });
        });

     
        describe("DELETE /restaurant/:restaurantId", () => {
            it("It should delete the restaurant", (done) => {
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

});