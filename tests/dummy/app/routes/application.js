import Route from '@ember/routing/route';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service driver;

  activate() {
    scheduleOnce('afterRender', this, this._runTour);
  }

  async _runTour() {
    // Create a driver instance with steps
    const walkthrough = await this.driver.createTour('walkthrough', [
      {
        element: '[data-tour-step="a"]',
        popover: {
          title: 'Feature A',
          position: 'right-bottom',
        }
      },
      {
        element: '.feature--b',
        popover: {
          title: 'Feature B',
          position: 'left-bottom',
        }
      },
      {
        element: '#c',
        popover: {
          title: 'Feature C',
          position: 'right-top',
        }
      },
      {
        element: '#fail',
        popover: {
          title: 'Feature D',
          position: 'left-top',
        }
      },
    ], {
      animate: false,
      padding: 0,
    });

    // start the tour
    walkthrough.start();
  }
}
