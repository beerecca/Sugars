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
                }, reject);
            }, reject);
        });
    }

    addEntry(request) {
        return new Promise((resolve, reject) => {
            this.initDb().then((result) => {
                this.db.User.findAll({
                    where: {
                        firstName: 'Ben'
                    }
                }).then((users) => {
                    for (var food of request.body) {
                        this.db.Food.create(food).then(function(food) {
                            users[0].addFood(food);
                        }, reject);
                    }
                    resolve({status: 'success'});
                }, reject);
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
                    this.db.Food.create({
                       name: 'Pizza',
                       unit: 'slice',
                       defaultAmount: 1,
                       carbs: 30 
                    }).then(function(food) {
                        user.addFood(food);
                    }, reject);
                    this.db.Food.create({
                        name: 'Phalus',
                        unit: 'man meat',
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
                        name: 'Bread',
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
