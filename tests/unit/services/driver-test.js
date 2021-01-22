import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Service | driver", function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.driver = this.owner.lookup("service:driver");
  });

  test("it creates a driver instance", async function (assert) {
    await this.driver.create("test");
    await this.driver.createTour("tour", [{ element: "#test" }]);
    assert.ok(this.driver.getInstance("test"), 'the "test" instance was found');
    assert.ok(this.driver.getInstance("tour"), 'the "tour" instance was found');
  });
});
