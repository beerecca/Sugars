import moment from 'moment';
import {HttpClient} from 'aurelia-http-client';

var getFood = 'http://sugars.herokuapp.com/api/food',
    postEntry = 'http://sugars.herokuapp.com/api/entry?add';

export class Entry{
  static inject() { return [HttpClient]; }
  constructor(http){
    this.heading = 'New Entry';
    this.glucose = 0;
    this.quantity = 0;
    this.exercise = 0;
    this.defaultFood = {
      id : 4,
      name : 'Select food item:',
      unit : 'unit',
      defaultAmount : 0,
      carbs : 0,
      quantity : 0
    };
    this.chosenFood = [
      {
        id : 4,
        name : 'Select food item:',
        unit : 'unit',
        defaultAmount : 0,
        carbs : 0,
        quantity : 0
      }];

    //this.food = [];
    this.http = http;
    //this.http = http.defaultRequestHeaders.add('Content-Type', 'application/json; charset=utf-8');
    this.food = [
      {
        id : 4,
        name : 'Select food item:',
        unit : 'unit',
        defaultAmount : 0,
        carbs : 0,
        quantity : 0
      },
      {
        id : 1,
        name : 'Pizza',
        unit : 'slice',
        defaultAmount : 1,
        carbs : 30,
        quantity : 0
      },
      {
        id : 2,
        name : 'Rice',
        unit : 'cup',
        defaultAmount : 1,
        carbs : 45,
        quantity : 0
      }, 
      {
        id : 3,
        name : 'Bread',
        unit : 'slice',
        defaultAmount : 1,
        carbs : 20,
        quantity : 0
      }
    ];
  }

  // activate(){
  //   return this.http.get(getFood).then(response => {
  //     this.food = response.content;
  //     this.food.unshift(this.defaultFood);
  //      console.log('this.food plus default', this.food);
  //   });
  // }

  addFood(){
    this.chosenFood.push(this.defaultFood);
    console.log('this.chosenFood', this.chosenFood);
  }

  entry(){
    var data = {
      glucoseLevel : this.glucose,
      exerciseCarbs : this.exercise,
      insulinShort : this.short,
      foodItems : [
        {
          id : this.chosenFood.id,
          quantity : this.quantity,
          carbs : this.chosenFood.carbs,
          name : this.chosenFood.name,
          unit : this.chosenFood.unit,
          defaultAmount : this.chosenFood.defaultAmount
        }]
    };

    return this.http.post(postEntry, JSON.stringify(data)).then(response => {
      
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

  plural(quantity){
    console.log('quantity', quantity);

    if (quantity > 1 || quantity === 0) {
      console.log('yup', quantity);
      return 's';
    }
  }

  get totalCarbs(){
    var calculation = parseInt(this.quantity) * parseInt(this.chosenFood.carbs);
    return `${calculation}`;
  }

  get calc(){
    var normalAdjust = (parseInt(this.glucose) - 7) / 3,
        foodAdjust = (isNaN(parseInt(this.totalCarbs) / 10)) ? 0 : parseInt(this.totalCarbs) / 10,
        exerciseAdjust = parseInt(this.exercise),
        calculation = Math.round(((normalAdjust + foodAdjust - exerciseAdjust) * 10) / 10);

        calculation = (calculation < 0) ? 0 : calculation;

    return `${calculation}`;
  }

}


//1. user inputs data, new entry record is saved on submit.
//2. user inputs new food name, number of carbs per unit and quantity, new food record is saved on submit ("unit" can be default unit name)
//3. api returns food list

