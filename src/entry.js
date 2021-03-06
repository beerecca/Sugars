//TODO: fix bug when remove multiple comboboxes

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
        foodArray = this.food;

        setTimeout(function(){
          new comboBox('combo-0');
        });
      });

  }
  
  addFood(){
    this.entryFoodItems.push(new EntryFoodItem());
    let i = this.entryFoodItems.length - 1;

    setTimeout(function(){
      new comboBox('combo-'+i);
    });
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

    this.entryFoodItems.forEach(function(efi, i) {

      //if the food name entered doesn't match anything in the food array, set the name to that
      var name = document.getElementById('combo-'+i).value;
      if (foodArray.find(x => x.name === name) === undefined) { 
        efi.name = name;
      }

      if (efi.name !== DEFAULTSELECT) {
        jsonEntryFoodItem.push(efi.toJSON());
      }

    });

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
    this.name = DEFAULTSELECT;
    this.unit = 'unit';
    this.carbs = 0;
    this.quantity = 0;
    this.showInput = false;
    this.recheck = false;
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

  unitsInput() {
    this.recheck = true;
  }

  get showUnitsInput() {
    if (this.recheck) {
      this.showInput = this.id === null;
      this.recheck = false;
    }
    return this.showInput;
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

    //if the food name entered doesn't match anything in the food array, return
    var result = foodArray.find(x => x.name === item);
    if (result === undefined) {
      this.id = null;
      return;
    }

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

