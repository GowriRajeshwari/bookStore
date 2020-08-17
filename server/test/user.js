let chai = require("chai");
chai.should();
let chaiHttp = require("chai-http");
let server = require("../server.js");
let reqBody = require("../Json/test.json");

chai.use(chaiHttp);

describe("/register test", () => {
  it("Already register status", (done) => {
    let requestBody = reqBody.registerWrong;
    chai
      .request(server)
      .post("/register")
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        done();
      });
  });
  // it("register status", (done) => {
  //   let requestBody = reqBody.register;
  //   chai
  //     .request(server)
  //     .post("/register")
  //     .send(requestBody)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.a("object");
  //       done();
  //     });
  // });
});

describe("/login test", () => {
  it(" login status", (done) => {
    let requestBody = reqBody.login;
    chai
      .request(server)
      .post("/login")
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it(" Wrong Password status", (done) => {
    let requestBody = reqBody.loginWrongPassword;
    chai
      .request(server)
      .post("/login")
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        done();
      });
  });
  it(" Null Email status", (done) => {
    let requestBody = reqBody.NullDataEmail;
    chai
      .request(server)
      .post("/login")
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });
  it(" Null Password status", (done) => {
    let requestBody = reqBody.NullData;
    chai
      .request(server)
      .post("/login")
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });
});
describe("/forgotpassword test", () => {
  it(" forgotpassword status", (done) => {
    let requestBody = reqBody.forgotPassword;
    chai
      .request(server)
      .post("/forgotpassword")
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it(" Null data status", (done) => {
    let requestBody = reqBody.NullData;
    chai
      .request(server)
      .post("/forgotpassword")
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it(" Wrong email data status", (done) => {
    let requestBody = reqBody.forgotPasswordwrongEmail;
    chai
      .request(server)
      .post("/forgotpassword")
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
// describe("/resetPassword test", () => {
//   it(" resetPassword status", (done) => {
//     let requestBody = reqBody.resetPassword;
//     chai
//       .request(server)
//       .post("/resetpassword")
//       .set({ Authorization: `Bearer ${reqBody.resetPasswordToken.token}` })
//       .send(requestBody)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
// });
