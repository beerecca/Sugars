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

      for (var entry of this.entries) {
        entry.exerciseCarbs = Math.round(entry.exerciseCarbs);
        entry.glucoseLevel = Math.round(entry.glucoseLevel);
        entry.insulinShort = Math.round(entry.insulinShort);
        entry.foodAdjust = 0;

        for (var food of entry.foodItems) {
          food.quantity = Math.round(food.quantity);
          entry.foodAdjust += (food.quantity * food.carbs);
        }

        if (entry.glucoseLevel < 4) {
          entry.levelKeyword = "low";
        } else if (entry.glucoseLevel > 9) {
          entry.levelKeyword = "high";
        } else {
          entry.levelKeyword = "ideal";
        }

        this.entries.splice(4, this.entries.length);

        console.log('entry', entry);
      }
    });


  }


}
