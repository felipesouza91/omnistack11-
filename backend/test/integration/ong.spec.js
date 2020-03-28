const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(() => {
    connection.destroy();
  });

  it("should be able to create new ong", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        nome: "Felipe Souz 2",
        email: "email@mail.com.br",
        whatsapp: "29999999999",
        cidade: "Rio de janeiro",
        uf: "RJ"
      });
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
