import moment from 'moment';
import {HttpClient} from 'aurelia-http-client';
const DEFAULTSELECT = 'Select food item:';

export class Entry{
  static inject() { return [HttpClient]; }
  constructor(){
    this.heading = 'New Entry';
    this.glucose = 0;
    this.exercise = 0;
    this.time = moment().format("dddd, Do MMMM YYYY, h:mm a");
    
    //start the page with one empty entry food item
    this.entryFoodItems = [ new EntryFoodItem() ];
    
    //initialize http client for ajaxy requests
    this.client = new HttpClient()
      .configure(x => {
        x.withBaseUri('http://sugars.herokuapp.com/api');
        x.withHeader('Content-Type', 'application/json');
    });
    
    this.client.get('/food').then(response => {
      this.food = response.content;
      this.food.unshift({
        id : null,
        name : DEFAULTSELECT,
        unit : 'unit',
        carbs : 0,
        quantity : 0
      });
    });
  }

  addFood(){
    this.entryFoodItems.push(new EntryFoodItem());
  }

  removeFood(index){
    this.entryFoodItems.splice(index,1);
  }

  get calc(){
    var total = 0,
      normalAdjust,
      foodAdjust,
      exerciseAdjust,
      calculation;

    for (var efi of this.entryFoodItems) {
      total += efi.getTotal();
    }

    normalAdjust = (parseInt(this.glucose) - 7) / 3;
    foodAdjust = total / 10;
    exerciseAdjust = parseInt(this.exercise);
    calculation = Math.round(((normalAdjust + foodAdjust - exerciseAdjust) * 10) / 10);
    calculation = (calculation < 0) ? 0 : calculation;

    return calculation;
  }

  submit(){
    var data,
        submit = document.querySelector('.submit').classList,
        alert = document.querySelector('.alert-success').classList,
        jsonEntryFoodItem = [];

    for (var efi of this.entryFoodItems) {
      if (efi.name !== DEFAULTSELECT) {
        jsonEntryFoodItem.push(efi.toJSON());
      }
    }

    data = {
      glucoseLevel : this.glucose,
      exerciseCarbs : this.exercise,
      insulinShort : this.short,
      foodItems : jsonEntryFoodItem,
      entryDate : moment().format("YYYY-MM-DD HH:mm:ss")
    };

    submit.add('active');

    return this.client.post('/entry?add', JSON.stringify(data)).then(response => {
      
      if (response.statusCode === 200) {

        alert.remove("fade");
        window.scrollTo(0, 0);
        submit.remove("active");
        setTimeout(function(){ alert.add("fade"); }, 3000);

      } else {
        console.log('Response', response);
        alert('Something went wrong, please try again!');
      }
    });
  }
}

export class EntryFoodItem {
  constructor() {
    this.id = null;
    this.name = 'Select food item:';
    this.unit = 'unit';
    this.carbs = 0;
    this.quantity = 0;
  }

  get plural() {
    var pluralised = (parseInt(this.quantity) === 0 || this.quantity > 1) ? 's' : '';

    if (this.unit === 'potato' && (parseInt(this.quantity) === 0 || this.quantity > 1)) {
      pluralised = 'es';
    }

    return pluralised;
  }

  get showRemoveButton() {
    return this.name !== DEFAULTSELECT;
  }

  toJSON() {
    return {
      id : this.id,
      name : this.name,
      carbs : this.carbs,
      quantity : this.quantity 
    };
  }

  set foodItem(item) {
    this.id = item.id;
    this.name = item.name;
    this.quantity = item.defaultAmount;
    this.carbs = item.carbs;
    this.unit = item.unit;
  }

  getTotal() {
    return (this.carbs * this.quantity);
  }

}



