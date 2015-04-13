import moment from 'moment';
import {HttpClient} from 'aurelia-http-client';

var getFood = 'http://sugars.herokuapp.com/api/food',
    postEntry = 'http://sugars.herokuapp.com/api/entry?add';

export class Entry{
  static inject() { return [HttpClient]; }
  constructor(http){
    this.heading = 'New Entry';
    this.glucose = 0;
    this.exercise = 0;
   
    //start the page with one empty entry food item
    this.entryFoodItems = [ new EntryFoodItem() ];
    
    //initalize http client for ajaxy requests
    this.client = new HttpClient()
      .configure(x => {
        x.withBaseUri('http://sugars.herokuapp.com/api');
        x.withHeader('Content-Type', 'application/json');
    });
    
    this.client.get('/food').then(response => {
      this.food = response.content;
      this.food.unshift({
        id : null,
        name : 'Select food item:',
        unit : 'unit',
        carbs : 0,
        quantity : 0
      });
    });
  }

  activate(){

  }

  addFood(){
    this.entryFoodItems.push(new EntryFoodItem());
  }

  //TODO: rename to submit
  entry(){
    var jsonEntryFoodItem = [];
    for (var efi of this.entryFoodItems) {
      jsonEntryFoodItem.push(efi.toJSON());
    }

    var data = {
      glucoseLevel : this.glucose,
      exerciseCarbs : this.exercise,
      insulinShort : this.short,
      foodItems : jsonEntryFoodItem //not updating from default when you select a new food
    };

    return this.client.post('/entry?add', JSON.stringify(data)).then(response => {
      
      if (response.statusCode === 200) {
        console.log('Success');
      } else {
        console.log('Response', response);
        alert('Something went wrong');
      }
    });
  }

  get time(){
    return moment().format("dddd, Do MMMM YYYY, h:mm a");
  }

  totalCarbs(){
    total = 0;
    for (var efi of this.entryFoodItems) {
      total += efi.getTotal();
    }

    return total;
    //var calculation = parseInt(this.quantity) * parseInt(this.chosenFood.carbs);
    //return `${calculation}`;
  }

  get calc(){
    /*var normalAdjust = (parseInt(this.glucose) - 7) / 3,
        foodAdjust = totalCarbs() / 10,
        exerciseAdjust = parseInt(this.exercise),
        calculation = Math.round(((normalAdjust + foodAdjust - exerciseAdjust) * 10) / 10);

        calculation = (calculation < 0) ? 0 : calculation;

    return calculation;*/
    return 100;
    //return `${calculation}`;
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
    return (this.quantity == 0 || this.quantity > 1)?'s':'';
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



