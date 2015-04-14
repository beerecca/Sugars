//food end point handler

import * as db from 'api/db';

export class Food {

  constructor() {
    this.db = new db.DB();
  }

  initDb() {
    return new Promise((resolve,reject) => {
      this.db.init({sync: false}).then(resolve, reject);
    });
  }
  
  getList(request) {
    return new Promise((resolve,reject) => {

      //call the database init.
      this.initDb().then((result) => {
        //success, lets query the request
        this.db.User.find({
          include: [ { model: this.db.Food, as: 'Foods' } ], 
          where: {
            firstName: 'Bex',
            lastName: 'Hill'
          }
        }).then(function(user) {
          resolve(user.Foods);
        }, reject);
      }, reject);
    });
  }

  addEntry(request) {
    return new Promise((resolve, reject) => {
      this.initDb().then((result) => {
        this.db.User.find({
          where: {
            firstName: 'Bex',
            lastName: 'Hill'
          }
        }).then((user) => {
          this.db.sequelize.transaction((t) => {
            var newFoods = [];
            for (var nfood of request.body) {
              newFoods.push(this.db.Food.create(
                  nfood,
                  { transaction : t }
                ).then((food) => {
                  return user.addFood(food, { transaction : t });
                })
              );
            }
            return new Promise.all(newFoods).then((result) => {
              resolve({status: 'success'});
            }, reject);
          });
        }, reject);
      }, reject);
    });
  }

  fillDummy() {
    return new Promise((resolve, reject) => {
      this.initDb().then((result) => {
        this.db.User.create({
          firstName: 'Bex',
          lastName: 'Hill'
        }).then((user) => {
           /*this.db.Food.create({
           *   name: 'Pizza',
           *   unit: 'slice',
           *   defaultAmount: 1,
           *   carbs: 30 
           *}).then(function(food) {
           *  user.addFood(food);
           *}, reject);
           */
          resolve({status: 'success'});
        }, reject);
      }, reject);
    });

  };
  
  cleanAll() {
    return new Promise((resolve, reject) => {
      this.initDb().then((result) => {
        this.db.syncForce().then(resolve,reject);
      }, reject);
     });
  }
}

export function handle(request) {
  return new Promise(function (resolve, reject) {
    console.log('Food Handler: Request recieved');
    var food = new Food();
    
    if (request.query.fill !== undefined) {
      food.fillDummy().then(resolve, reject);    
    } else if (request.query.clean !== undefined) {
      food.cleanAll().then(resolve, reject);
    } else if (request.query.add !== undefined) {
      food.addEntry(request).then(resolve, reject);
    } else { 
      food.getList(request).then(resolve, reject);
    }
  });
}
