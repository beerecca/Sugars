import {Router} from 'aurelia-router';

export class App {
  static inject() { return [Router]; }
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'Sugars';
      config.map([
        { route: ['','entry'], moduleId: 'entry', nav: true, title:'New Entry' },
        { route: 'report', moduleId: 'report', nav: true, title:'Reports' }
      ]);
    });
  }
}
