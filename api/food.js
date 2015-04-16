//food end point handler

import * as db from 'api/db';

export class Food {

  constructor() {
    this.db = new db.DB();
  }

  getList(request) {
    return new Promise((resolve,reject) => {
      //call the database init.
      this.db.init().then((result) => {
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
      this.db.init().then((result) => {
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

  modEntry(request) {
    return new Promise((resolve, reject) => {
      this.db.init().then((result) => {
        this.db.User.find({
          where: {
            firstName: 'Bex',
            lastName: 'Hill'
          }
        }).then((user) => {
          console.log(request.params);
          this.db.Food.find({
            where: {
              id: request.query.id
            }
          }).then((food) => {
            if (food.userUuid != user.uuid) {
              reject('Food with ID ' + request.query.id + ' does not exist under this user');
            } else {
              if (request.body.name !== undefined) food.set('name', request.body.name);
              if (request.body.unit !== undefined) food.set('unit', request.body.unit);
              if (request.body.carbs !== undefined) food.set('carbs', request.body.carbs);
              if (request.body.defaultAmount !== undefined) food.set('defaultAmount', request.body.defaultAmount);
              food.save().then(resolve, reject);
            }
          },reject);
        }, reject);
      }, reject);
    });
  }

}

export function handle(request) {
  return new Promise(function (resolve, reject) {
    console.log('Food Handler: Request recieved');
    var food = new Food();
    if (request.params.mod !== undefined) {
      if (request.params.mod === 'add') {
        food.addEntry(request).then(resolve, reject);
      } else if (request.params.mod === 'edit') {
        if (request.query.id === undefined) {
          reject(new Error('No value defined under the id parameter'));
          return;
        }
        food.modEntry(request).then(resolve,reject);
      } else {
        reject(new Error('Invalid api call: /api/food/' + request.params.mod));
      }
    } else {
      food.getList(request).then(resolve, reject);
    }
  });
}
