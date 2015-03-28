import moment from 'moment';

export class Entry{
  constructor(){
    this.heading = 'New Entry';
    this.glucose = 0;
    this.quantity = 0;
    this.exercise = 0;
    this.chosenFood =
      [{
        name : 'Pizza',
        unit : 'slice',
        amount : 1,
        carbs : 30
      }];
    this.food = [
      {
        name : 'Pizza',
        unit : 'slice',
        amount : 1,
        carbs : 30
      },
      {
        name : 'Rice',
        unit : 'cup',
        amount : 1,
        carbs : 40
      }, 
      {
        name : 'Bread',
        unit : 'slice',
        amount : 1,
        carbs : 20
      }
    ];
  }

  get time(){
    return moment().format("dddd, Do MMMM YYYY, h:mm a");
  }

  get totalCarbs(){
    var calculation = parseInt(this.quantity) * parseInt(this.chosenFood.carbs);
    return `${calculation}`;
  }

  get short(){
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

