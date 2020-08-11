let chai = require("chai");
chai.should();
let chaiHttp = require("chai-http");
let server = require("../server.js");
let reqBody = require("../Json/admin.json");

chai.use(chaiHttp);

describe("/New Book test", () => {
  it("New Book status", (done) => {
    let requestBody = reqBody.addBook;
    chai
      .request(server)
      .post("/books")
      .set({ Authorization: `Bearer ${reqBody.token.token}` })
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("no data passed in titile,description status", (done) => {
    let requestBody = reqBody.addBookNullData;
    chai
      .request(server)
      .post("/books")
      .set({ Authorization: `Bearer ${reqBody.token.token}` })
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });
});

describe("/get Books test", () => {
  it(" getAllBook status", (done) => {
    chai
      .request(server)
      .get("/books")
      .set({ Authorization: `Bearer ${reqBody.token.token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it(" Wrong token send,authorization falied status", (done) => {
    chai
      .request(server)
      .get("/books")
      .set({ Authorization: `Bearer ${reqBody.token.wrongToken}` })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
