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

            console.log('Food.getList: request recieved');
            //call the database init.
            this.initDb().then((result) => {
                console.log('Food.getList: Database Init');
                //success, lets query the request
                this.db.User.findAll({
                    include: [ { model: this.db.Food, as: 'Foods' } ], 
                    where: {
                        firstName: 'Ben'
                    }
                }).then(function(result) {
                    console.log('Food.getList: retrieved results');
                    resolve(result[0].Foods);
                }, function(err) {
                    console.log('Food.getList: error getting results');
                    reject(err);
                });
            }, reject);
        });
    }

    fillDummy() {
        return new Promise((resolve, reject) => {
            this.initDb().then((result) => {
                this.db.User.create({
                    firstName: 'Ben',
                    lastName: 'Naylor'
                }).then((user) => {
                    var foods = [];
                    this.db.Food.create({
                       name: 'Pizza',
                       unit: 'Slice',
                       defaultAmount: 1,
                       carbs: 30 
                    }).then(function(food) {
                        user.addFood(food);
                    }, reject);
                    this.db.Food.create({
                        name: 'Phalus',
                        unit: 'Man meat',
                        defaultAmount: 2,
                        carbs: 15
                    }).then(function(food) {
                        user.addFood(food);
                    }, reject);
                    this.db.Food.create({
                        name: 'Rice',
                        unit: 'cup',
                        defaultAmount: 1,
                        carbs: 45
                    }).then(function(food) {
                        user.addFood(food);
                    }, reject);
                    this.db.Food.create({
                        name: 'bread',
                        unit: 'slice',
                        defaultAmount: 2,
                        carbs: 20
                    }).then(function(food) {
                        user.addFood(food);
                    }, reject);
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
            console.log('Food Handler: Fill request recieved');
            food.fillDummy().then(resolve, reject);        
        } else if (request.query.clean !== undefined) {
            console.log('Food Handler: clean request recieved');
            food.cleanAll().then(resolve, reject);
        } else { 
            console.log('Food Handler: Retrieve request recieved');
            food.getList(request).then(resolve, reject);
        }
    });
}
