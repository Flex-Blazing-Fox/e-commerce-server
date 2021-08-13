process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const server = require("../index");
const crypto = require("crypto");
chai.should();
chai.use(chaiHttp);

describe("E-commerce API", () => {
  // ========================================================================= //

  const user1Credential = {
    email: "user1@gmail.com",
    password: "user1",
  };
  const user3Credential = {
    email: "user3@gmail.com",
    password: "user3",
  };
  let tokenUser1, tokenUser3;
  before((done) => {
    chai
      .request(server)
      .post("/user/login")
      .send(user1Credential)
      .end((err, response) => {
        tokenUser1 = response.body.access_token;
      });
    chai
      .request(server)
      .post("/user/login")
      .send(user3Credential)
      .end((err, response) => {
        tokenUser3 = response.body.access_token;
        done();
      });
  });

  // ========================================================================= //

  // Registration with already used email
  describe("POST /user/register wih already used email", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          email: "user1@gmail.com",
          password: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes("Email is not unique");
          done();
        });
    });
  });

  // Registration without email
  describe("POST /user/register without emaild data provided", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          password: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes("User.email cannot be null");
          done();
        });
    });
  });

  // Registration with empty email
  describe("POST /user/register with empty email", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          email: "",
          password: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes(
              "Validation notEmpty on email failed",
              "Validation isEmail on email failed"
            );
          done();
        });
    });
  });

  // Registration with invalid email format
  describe("POST /user/register with invalid email format", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          email: "abc",
          password: "123",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes("Validation isEmail on email failed");
          done();
        });
    });
  });

  // Registration with empty password
  describe("POST /user/register with empty password", () => {
    it("should not do registration", (done) => {
      chai
        .request(server)
        .post("/user/register")
        .send({
          email: "user5@gmail.com",
          password: "",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.an("array")
            .that.includes("Validation notEmpty on password failed");
          done();
        });
    });
  });

  // ========================================================================= //

  // Testing Authenticated and Authorized User

  // Get all products
  describe("GET /product", () => {
    it("should get all products", (done) => {
      chai
        .request(server)
        .get("/product")
        .set("access_token", tokenUser1)
        .end((_, response) => {
          ids = response.body.map((res) => res.id);
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(5);
          ids.should.have.members([1, 2, 3, 4, 5]);
          done();
        });
    });
  });

  // Get certain product
  describe("GET /product/1", () => {
    it("should get certain product", (done) => {
      chai
        .request(server)
        .get("/product/1")
        .set("access_token", tokenUser1)
        .end((_, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(1);
          done();
        });
    });
  });

  // Create product without name
  describe("POST /product without name", () => {
    it("should not create new product", (done) => {
      chai
        .request(server)
        .post("/product")
        .set("access_token", tokenUser3)
        .send({
          image_url: "https://ibb.co/bLMGY0f",
          price: 100000,
          stock: 2,
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Product.name cannot be null");
          done();
        });
    });
  });

  // Create product with empty name
  describe("POST /product with empty title", () => {
    it("should not create new product", (done) => {
      chai
        .request(server)
        .post("/product")
        .set("access_token", tokenUser3)
        .send({
          name: "",
          image_url: "Example Url",
          price: 100000,
          stock: 2,
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Validation notEmpty on name failed");
          done();
        });
    });
  });

  // Create product name with more than 100 characters
  describe("POST /product with title more than 100 characters", () => {
    it("should not create new product", (done) => {
      chai
        .request(server)
        .post("/product")
        .set("access_token", tokenUser3)
        .send({
          name: crypto.randomBytes(110).toString("hex"),
          image_url: "Example Url",
          price: 100000,
          stock: 2,
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Name's length cant be more than 100 characters");
          done();
        });
    });
  });

  // Create product without image url
  describe("POST /product without image url", () => {
    it("should not create new product", (done) => {
      chai
        .request(server)
        .post("/product")
        .set("access_token", tokenUser3)
        .send({
          name: "Kamera",
          price: 100000,
          stock: 2,
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Product.image_url cannot be null");
          done();
        });
    });
  });

  // Create product with invalid image url
  describe("POST /product with invalid image url", () => {
    it("should not create new product", (done) => {
      chai
        .request(server)
        .post("/product")
        .set("access_token", tokenUser3)
        .send({
          name: "Kamera",
          image_url: "Example",
          price: 100000,
          stock: 2,
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Validation isUrl on image_url failed");
          done();
        });
    });
  });

  // Create product without price
  describe("POST /product without price", () => {
    it("should not create new product", (done) => {
      chai
        .request(server)
        .post("/product")
        .set("access_token", tokenUser3)
        .send({
          name: "Kamera",
          image_url: "https://ibb.co/jJmVdc9",
          stock: 2,
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Product.price cannot be null");
          done();
        });
    });
  });

  // Create product with non numeric price
  describe("POST /product with non numeric price", () => {
    it("should not create new product", (done) => {
      chai
        .request(server)
        .post("/product")
        .set("access_token", tokenUser3)
        .send({
          name: "Kamera",
          image_url: "https://ibb.co/jJmVdc9",
          price: "tiga",
          stock: 2,
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Validation isNumeric on price failed");
          done();
        });
    });
  });

  // Create product without stock
  describe("POST /product without stock", () => {
    it("should not create new product", (done) => {
      chai
        .request(server)
        .post("/product")
        .set("access_token", tokenUser3)
        .send({
          name: "Kamera",
          image_url: "https://ibb.co/jJmVdc9",
          price: 100000,
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Product.stock cannot be null");
          done();
        });
    });
  });

  // Create product with non integer stock
  describe("POST /product with non integer stock", () => {
    it("should not create new product", (done) => {
      chai
        .request(server)
        .post("/product")
        .set("access_token", tokenUser3)
        .send({
          name: "Kamera",
          image_url: "https://ibb.co/jJmVdc9",
          price: 10000,
          stock: "dua",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .to.be.a("array")
            .that.includes("Validation isInt on stock failed");
          done();
        });
    });
  });

  // Patch product
  describe("PATCH /product", () => {
    it("should patch product", (done) => {
      chai
        .request(server)
        .patch("/product/1")
        .set("access_token", tokenUser3)
        .send({
          name: "Drone",
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("name").eq("Drone");
          done();
        });
    });
  });

  // Put a product
  describe("PUT /product", () => {
    it("should put a product", (done) => {
      chai
        .request(server)
        .put("/product/1")
        .set("access_token", tokenUser3)
        .send({
          name: "drone",
          image_url: "https://ibb.co/jJmVdc9",
          price: 21000000,
          stock: 5,
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("name").eq("drone");
          response.body.should.have
            .property("image_url")
            .eq("https://ibb.co/jJmVdc9");
          response.body.should.have.property("price").eq(21000000);
          response.body.should.have.property("stock").eq(5);
          done();
        });
    });
  });

  // Put product with incomplete data
  describe("PUT /product with incomplete data", () => {
    it("should not put product", (done) => {
      chai
        .request(server)
        .put("/product/3")
        .set("access_token", tokenUser3)
        .send({
          name: "Example",
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .eql([
              "All data (name, image_url, price, and stock) must be provided",
            ]);
          done();
        });
    });
  });

  // ========================================================================= //

  // Testing for unauthorized account

  // Delete a product from a customer account
  describe("DELETE /product for unauthorized account", () => {
    it("should not delete the selected product", (done) => {
      chai
        .request(server)
        .delete("/product/1")
        .set("access_token", tokenUser1)
        .end((err, response) => {
          response.should.have.status(403);
          response.should.be.a("object");
          response.body.should.have
            .property("error")
            .eql(["Role not authorized"]);
          done();
        });
    });
  });

});
