//TODO: make the combobox load once everything else is loaded
//TODO: make the combobox work with multiple of them use id="combo-${$index}"


import moment from 'moment';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {comboBox} from './combobox';
const DEFAULTSELECT = 'Select food item:';
let foodArray = [];

@inject(HttpClient)
export class Entry{
  constructor(http){
    this.heading = 'New Entry';
    this.glucose = 7;
    this.exercise = 0;
    this.time = moment().format('dddd, Do MMMM YYYY, h:mm a');
    this.food = [];
    
    //start the page with one empty entry food item
    this.entryFoodItems = [ new EntryFoodItem() ];
    
    //initialize http client for ajaxy requests
    http.configure(config => {
      config
        .useStandardConfiguration()
        //.withHeader('Content-Type', 'application/json')
        .withBaseUrl('http://sugars-api.herokuapp.com/api/');
    });

    this.http = http;

    this.http.fetch('food')
      .then(response => response.json())
      .then(food => {
        this.food = food;
        this.food.unshift({
          id : null,
          name : DEFAULTSELECT,
          unit : 'unit',
          carbs : 0,
          quantity : 0
        });
        foodArray = this.food;
      });

    setTimeout(function(){ //change this to an onload of html event of some kind
      new comboBox('combo-0');
      console.log('combobox after timeout');
    }, 5000);

  }

  addFood(){
    this.entryFoodItems.push(new EntryFoodItem());
    let i = this.entryFoodItems.length - 1;

    setTimeout(function(){
      new comboBox('combo-'+i);
      console.log('new combo');
    }, 500);

  }

  removeFood(index){
    this.entryFoodItems.splice(index,1);
  }

  glucoseUp(){
    this.glucose++;
  }

  glucoseDown(){
    this.glucose--;
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

    return this.http.fetch('entry?add', {
      method: 'post',
      headers: { //TODO: should be able to set this globally
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) //TODO: is the data going through? also should be catch instead of if
    }).then(response => {
      
      if (response.status === 200) {

        alert.remove("fade");
        window.scrollTo(0, 0);
        submit.remove("active");
        setTimeout(function(){ alert.add("fade"); }, 3000);

      } else {
        console.log('Response', response);
        window.alert('Something went wrong, please try again!');
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

    if (foodArray.find(x => x.name === item) === undefined) { return; } //TODO: ideally should use id not name

    var result = foodArray.find(x => x.name === item);

    this.id = result.id;
    this.name = result.name;
    this.quantity = result.defaultAmount;
    this.carbs = result.carbs;
    this.unit = result.unit;
  }

  getTotal() {
    return (this.carbs * this.quantity);
  }


}

