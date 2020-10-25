const app = require("../../src/app");

describe("'rules' service", () => {
  it("registered the service", () => {
    const service = app.service("rules");
    expect(service).toBeTruthy();
  });
});
