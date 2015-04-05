import moment from 'moment';
import {HttpClient} from 'aurelia-http-client';

var getFood = '/api/food',
    postEntry = "/api/entry";

export class Entry{
  static inject() { return [HttpClient]; }
  constructor(http){
    this.heading = 'New Entry';
    this.glucose = 0;
    this.quantity = 0;
    this.exercise = 0;
    this.chosenFood =
      {
        name : 'Default',
        unit : 'unit',
        amount : 0,
        carbs : 0
      };
    this.food = [];
    this.images = [];
    this.http = http;
    // this.food = [
    //   {
    //     name : 'Pizza',
    //     unit : 'slice',
    //     amount : 1,
    //     carbs : 30
    //   },
    //   {
    //     name : 'Rice',
    //     unit : 'cup',
    //     amount : 1,
    //     carbs : 45
    //   }, 
    //   {
    //     name : 'Bread',
    //     unit : 'slice',
    //     amount : 1,
    //     carbs : 20
    //   }
    // ];
  }

  activate(){
    return this.http.get(getFood).then(response => {
      this.food = response.content;
    });
  }

  entry(){
    var data = {
        name : 'Bread',
        unit : 'slice',
        amount : 1,
        carbs : 20
    };

    return this.http.post(postEntry, JSON.stringify(data)).then(response => {
      
      if (response.statusCode === 201) {
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

  get totalCarbs(){
    var calculation = parseInt(this.quantity) * parseInt(this.chosenFood.carbs);
    return `${calculation}`;
  }

  get plural(){
    if (this.quantity > 1 || this.quantity === 0) {
      return 's';
    }
  }

  get short(){
    var normalAdjust = (parseInt(this.glucose) - 7) / 3,
        foodAdjust = (isNaN(parseInt(this.totalCarbs) / 10)) ? 0 : parseInt(this.totalCarbs) / 10,
        exerciseAdjust = parseInt(this.exercise),
        calculation = Math.round(((normalAdjust + foodAdjust - exerciseAdjust) * 10) / 10);

        calculation = (calculation < 0) ? 0 : calculation;


    return `${calculation}`;
  }

  addFood(){
    return alert('adding some foods');
  }

}


//1. user inputs data, new entry record is saved on submit.
//2. user inputs new food name, number of carbs per unit and quantity, new food record is saved on submit ("unit" can be default unit name)
//3. api returns food list

