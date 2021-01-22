ember-driver
==============================================================================

This is a basic Ember addon that provides a service that makes it simple to create and manage multiple driver.js instances.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-driver
```


Usage
------------------------------------------------------------------------------

Import the service and use it to create a new driver.js instance.

```
export default class ApplicationRoute extends Route {
  @service driver;

  activate() {
    scheduleOnce('afterRender', this, this._runTour);
  }

  async _runTour() {
    // Create a driver instance with steps
    const walkthrough = await this.driver.createTour('walkthrough', [ ...steps ], { ...options });

    // start the tour
    walkthrough.start();
  }
}
```

The `create` and `createTour` methods both create a new instance of the Driver class and store it on the service. These methods return promises that resolve to the newly created instance, so await the result before calling any of their methods. To retrieve a previously created instance, call `getInstance` with the name id.

```
// get a reference when you create it
const driverReference = this.driver.create('mydriver');

// get a reference later on (perhaps in a component or another file)
const sameDriverReference = this.driver.getInstance('mydriver');
```

For information about the Driver class api, please see https://github.com/kamranahmedse/driver.js#api


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
