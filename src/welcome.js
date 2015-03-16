export class Welcome{
  constructor(){
    this.heading = 'New Entry';
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.glucose = 11;
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
    //console.log('stuff', this.glucose);
    //var stuff = parseInt(this.glucose) + parseInt(this.carbs);
    return this.carbs;
  }

}