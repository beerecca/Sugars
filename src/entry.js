import moment from 'moment';

export class Entry{
  constructor(){
    this.heading = 'New Entry';
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.glucose = 0;
    //this.carbs = 0;
    this.quantity = 0;
    this.exercise = 0;
    this.amount = 1;
    this.chosenFood =
      [{
        name : 'Pizza',
        unit : 'slice',
        defaultAmount : 1,
        amount : 1,
        carbs : 30
      }];
    this.food = [
      {
        name : 'Pizza',
        unit : 'slice',
        defaultAmount : 1,
        amount : 1,
        carbs : 30
      },
      {
        name : 'Rice',
        unit : 'cup',
        defaultAmount : 1,
        amount : 1,
        carbs : 40
      }, 
      {
        name : 'Bread',
        unit : 'slice',
        defaultAmount : 1,
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
        foodAdjust = (parseInt(this.quantity) * parseInt(this.carbs)) / 10,
        exerciseAdjust = parseInt(this.exercise),
        calculation = Math.round(((normalAdjust + foodAdjust - exerciseAdjust) * 10) / 10);

        calculation = (calculation < 0) ? 0 : calculation;

    return `${calculation}`;
  }

}
