import moment from 'moment';
import {HttpClient} from 'aurelia-http-client';

export class Report{
  static inject() { return [HttpClient]; }
  constructor(){
    this.heading = 'Reports';
    this.entryDays = [];
    this.entryDaysFormatted = [];
    this.client = new HttpClient()
      .configure(x => {
        x.withBaseUri('http://sugars.herokuapp.com/api');
        x.withHeader('Content-Type', 'application/json');
    });

    this.client.get('/entry').then(response => {
      this.entries = response.content;

      var hour = 1; //faking entryDate because API doesn't support it yet
      var day = 1;

      for (var entry of this.entries) {
        entry.exerciseCarbs = Math.round(entry.exerciseCarbs);
        entry.glucoseLevel = Math.round(entry.glucoseLevel);
        entry.insulinShort = Math.round(entry.insulinShort);
        entry.foodAdjust = 0;
        
        hour = Math.floor(Math.random() * 9) + 1; //faking entryDate
        day = Math.floor(Math.random() * 6) + 1;
        entry.entryDate = '2015-04-' + day + ' 1' + hour + ':17:43';

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

        this.entries.splice(6, this.entries.length); //faking the length of the array

        this.entryDays.push(moment(entry.entryDate));
      }

      var sortByDateAsc = function (lhs, rhs) {
        return lhs > rhs ? 1 : lhs < rhs ? -1 : 0;
      };

      this.entryDays.sort(sortByDateAsc);

      this.entryDaysFormatted = this.entryDays.map(function(day){
        return moment(day).format('ddd D MMM');
      });

      console.log('edited entries', this.entries);
    });

  }

}


export class DayFilterValueConverter {
  toView(array, dayFilter) {
    return array.filter(function(entry){
      if (moment(entry.entryDate).format('ddd D MMM') === dayFilter) {
        return true;
      }
    });
  }
}

export class TimeFormatValueConverter {
  toView(value) {
    return moment(value).format('h:mm a');
  }
}
