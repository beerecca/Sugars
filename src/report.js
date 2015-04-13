import {HttpClient} from 'aurelia-http-client';

export class Report{
  static inject() { return [HttpClient]; }
  constructor(){
    this.heading = 'Reports';
    this.entries = [
      {
        exerciseCarbs: "2",
        foodItems: [{id: 4, name: "Sushi", carbs: "5", quantity: "4"}, {id: 8, name: "Potato", carbs: "20", quantity: "2"}],
        glucoseLevel: "13.5",
        insulinShort: "8"
      },
      {
        exerciseCarbs: "0",
        foodItems: [{id: 2, name: "Rice", carbs: "40", quantity: "1"}, {id: 10, name: "Chips", carbs: "10", quantity: "4"}],
        glucoseLevel: "13.5",
        insulinShort: "8"
      }
    ];
    this.client = new HttpClient()
      .configure(x => {
        x.withBaseUri('http://sugars.herokuapp.com/api');
        x.withHeader('Content-Type', 'application/json');
    });

    // this.client.get('/entry').then(response => {
    //   this.entries = response.content;
    // });
  }


}