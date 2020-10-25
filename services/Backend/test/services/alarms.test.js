const app = require("../../src/app");

describe("'alarms' service", () => {
  it("registered the service", () => {
    const service = app.service("alarms");
    expect(service).toBeTruthy();
  });
});
