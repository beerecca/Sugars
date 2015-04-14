import {HttpClient} from 'aurelia-http-client';

export class Report{
  static inject() { return [HttpClient]; }
  constructor(){
    this.heading = 'Reports';
    this.client = new HttpClient()
      .configure(x => {
        x.withBaseUri('http://sugars.herokuapp.com/api');
        x.withHeader('Content-Type', 'application/json');
    });

    this.client.get('/entry').then(response => {
      this.entries = response.content;
    });
  }


}
