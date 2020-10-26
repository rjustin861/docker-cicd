describe("Simple Math Test", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });

  it("should return 2", () => {
    expect(1 + 1).toBe(2);
  });

  it("should return 9", () => {
    expect(3 * 3).toBe(9);
  });
});
