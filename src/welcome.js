export class Welcome{
  constructor(){
    this.heading = 'New Entry';
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.glucose = 0;
    this.carbs = 0;
    this.quantity = 0;
    this.exercise = 0;
  }

  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }

  welcome(){
    alert(`Welcome, ${this.fullName}!`);
  }

  get time(){
    return Date();
  }

  get short(){
    var normalAdjust = (parseInt(this.glucose) - 7) / 3,
        foodAdjust = (parseInt(this.quantity) * parseInt(this.carbs)) / 10,
        exerciseAdjust = parseInt(this.exercise);

    return `${normalAdjust + foodAdjust - exerciseAdjust}`;
  }

}
