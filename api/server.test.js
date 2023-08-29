const request = require("supertest");
const server = require("./server");
const db = require("../data/db-config");

test("test environment testing olarak ayarlanmış", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
}); //her bir testen önce veritabanını sıfırladık

beforeEach(async () => {
  await db.seed.run();
}); //truncate yoksa onu da yazarız

afterAll(async () => {
  await db.destroy();
});

describe("API END POINT TESTLERI", () => {
  describe("[GET] /", () => {
    test("[1] server mesajını geri dönüyor", async () => {
      const res = await request(server).get("/");
      expect(res.body).toEqual({ message: "Hey, server is up and running..." });
      expect(res.status).toBe(200);
    });
  });
  describe("[GET] /starwars", () => {
    test("[2] tüm starwars karakterlerini dönüyor", async () => {
      const res = await request(server).get("/api/starwars");
      expect(res.body).toHaveLength(3);
      expect(res.body[0]).toHaveProperty(
        "id",
        "1",
        "name",
        "Luke Skywalker",
        "homeworld",
        "Tatooine"
      );
      expect(res.status).toBe(200);
    });
  });
  describe("[GET] /starwars/:id", () => {
    test("[3] istenilen id li starwars karakterini varsa dönüyor", async () => {
      const res = await request(server).get("/api/starwars/1");
      expect(res.body).toEqual({
        id: 1,
        name: "Luke Skywalker",
        homeworld: "Tatooine",
      });
      expect(res.status).toBe(200);
    });
    test("[4] istenilen id li starwars karakteri yoksa hata mesajını doğru dönüyor", async () => {
      const res = await request(server).get("/api/starwars/8");
      expect(res.body.message).toBe("id li karakter bulunamadı");
      expect(res.status).toBe(404);
    });
  });
  describe("[POST] /starwars", () => {
    test("[5] name ve homeworld alanlarından biri eksikse hata mesajını doğru dönüyor", async () => {
      const yeniKarakter = { name: "Owen Lars" };
      const res = await request(server)
        .post("/api/starwars")
        .send(yeniKarakter);
      expect(res.body.message).toBe("name alanı ve homeworld alanı zorunlu");
    });
    test("[6] name ve homeworld alanlarından biri doğru hata kodunu dönüyor", async () => {
      const yeniKarakter = { name: "Owen Lars" };
      const res = await request(server)
        .post("/api/starwars")
        .send(yeniKarakter);
      expect(res.status).toBe(400);
    });
    test("[7] name önceden kayıt edildiyse hata mesajını doğru dönüyor", async () => {
      const yeniKarakter = { name: "Leia Organa", homeworld: "fwefwf" };
      const res = await request(server)
        .post("/api/starwars")
        .send(yeniKarakter);
      expect(res.body.message).toBe("aynı isimde karakter var");
    });
    test("[8] name önceden kayıt edildiyse doğru hata kodunu dönüyor", async () => {
      const yeniKarakter = { name: "Leia Organa", homeworld: "fwefwf" };
      const res = await request(server)
        .post("/api/starwars")
        .send(yeniKarakter);
      expect(res.status).toBe(400);
    });
    test("[9] name string değilse hata mesajını doğru dönüyor", async () => {
      const yeniKarakter = { name: 2445, homeworld: "fwefwf" };
      const res = await request(server)
        .post("/api/starwars")
        .send(yeniKarakter);
      expect(res.body.message).toBe("name alanı string olmalı");
    });
    test("[10] name string değilse doğru hata kodunu dönüyor", async () => {
      const yeniKarakter = { name: 2445, homeworld: "fwefwf" };
      const res = await request(server)
        .post("/api/starwars")
        .send(yeniKarakter);
      expect(res.status).toBe(400);
    });
    test("[11] yeni karakter başarılı bir şekilde oluşturuluyor", async () => {
      const yeniKarakter = { name: "Owen Lars", homeworld: "Tatooine" };
      const res = await request(server)
        .post("/api/starwars")
        .send(yeniKarakter);
      expect(res.status).toBe(201);
    });
  });
});
