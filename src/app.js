import 'bootstrap';
// import 'bootstrap/css/bootstrap.css!';
// import '../styles/styles.css!';

export class App {
  configureRouter(config, router){
    config.title = 'Sugars';
    config.map([
      { route: ['','entry'],  name: 'entry',      moduleId: 'entry',      nav: true, title:'New Entry' },
      { route: 'report',  name: 'report', moduleId: 'report', nav: true, title:'Reports' }
    ]);

    this.router = router;
  }
}
