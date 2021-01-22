import Service from "@ember/service";
import { assert } from "@ember/debug";

export default class DriverService extends Service {
  // Store all created instances here so they can be easily accessed
  _instances = new Map();

  /**
   * Creates a new instance of the Driver class and stores it in the _instances map
   * @param {string} id A unique id for the Driver instance
   * @param {object} options Driver class options, @see https://github.com/kamranahmedse/driver.js#driver-definition
   * @returns {Promise} A promise which resolves to the created Driver instance
   */
  create(id, options = {}) {
    assert('The "id" must be a string', typeof id === "string");
    return import("driver.js").then((module) => {
      const Driver = module.default;
      const instance = new Driver(options);
      this._instances.set(id, instance);
      return instance;
    });
  }

  /**
   * A helper method that creates a new Driver instance and defines it's steps
   * @param {string} id A unique id for the Driver instance
   * @param {object[]} steps An collection of Driver step definitions @see https://github.com/kamranahmedse/driver.js#step-definition
   * @param {object} options Driver class options, @see https://github.com/kamranahmedse/driver.js#driver-definition
   * @returns {Promise} A promise which resolves to the created Driver instance
   */
  async createTour(id, steps = [], options = {}) {
    assert('The "id" must be a string', typeof id === "string");
    const instance = await this.create(id, options);
    instance.defineSteps(steps);
    return instance;
  }

  /**
   * Gets a reference to a saved Driver instance
   * @param {string} id The unique id of the driver instance to return
   */
  getInstance(id) {
    assert(
      `The id must match one of the saved instances: ${[
        ...this._instances.keys(),
      ].join(", ")}. Received "${id}".`,
      this._instances.has(id)
    );
    return this._instances.get(id);
  }
}
