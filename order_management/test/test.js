let chai = require('chai')
chai.use(require('chai-like'));
chai.use(require('chai-things'));

let chaiHttp = require("chai-http");
let server = require("../server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Order API', () => {
      /**
     * Test the GET route
     */
    var header = "Authorization";
    var value = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpamF5MTNAZ21haWwuY29tIiwicGFzc3dvcmQiOiJ2aWpheTEzIiwiaWF0IjoxNjUwODc4MTc3LCJleHAiOjE2NTA4Nzg0Nzd9.5djynOX6AYvs4IB1k2mOdIV99uw6TjlvXne60FIVyss";

    describe("GET All Orders /order/all/:customerId", () => {
        it("It should GET all Orders for customerId", (done) => {
            const customerId = 1019;
            chai.request(server)                
                .get("/order/all/"+customerId)
                .set(header, value)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.should.be.a('array').that.contains.something.like({customerId: 1019});
                    response.body.should.be.a('array').that.contains.something.like({restaurantId: 403530});
                done();
                });
        });
    });

    describe("GET /order/:orderId", () => {
        it("It should GET the Order details", (done) => {
            const orderId = 110;
            chai.request(server)                
                .get("/order/"+orderId)
                .set(header, value)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('OrderItems');
                    response.body.should.have.property('customerId');
                    response.body.should.have.property('restaurantId');
                    response.body.should.have.property('orderId').eq(110);
                done();
                });
        });
    });

    describe("POST /order/", () => {
        it("It should Update the Order details", (done) => {
            const requestBody = {
                restaurantId : 403530,
                OrderItems : [1, 2, 3],
                customerId : 1019
            }
            ;
            chai.request(server)                
                .post("/order/")
                .set(header, value)
                .send(requestBody)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.have.property('OrderItems');
                    response.body.should.have.property('customerId');
                    response.body.should.have.property('restaurantId');
                    response.body.should.have.property('orderId')
                done();
                });
        });
    });


    describe("DELETE /order/:orderId", () => {
        it("It should delete the User/Order", (done) => {
            const orderId = 102;
            chai.request(server)                
                .delete("/order/"+orderId)
                .set(header, value)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('acknowledged').eq(true);
                done();
                });
        });
    });

});



