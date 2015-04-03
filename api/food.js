//food end point handler

import * as db from 'api/db';

export class Food {

    constructor() {
        this.db = new db.DB();
    }

    getList(request) {
        return new Promise((resolve,reject) => {

            console.log('Food.getList: request recieved');
            //call the database init.
            this.db.init().then((result) => {
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
            }, function(err) {
                reject(err);    
            });
            
        });
    }

    fillDummy() {
        return new Promise((resolve, reject) => {
            this.db.init().then((result) => {
                this.db.User.create({
                    firstName: 'Ben',
                    lastName: 'Naylor'
                });
                resolve('success');

            }, function(err) {
                reject(err);
            });
        });

    };

}

export function handle(request) {
    return new Promise(function (resolve, reject) {
        console.log('Food Handler: Request recieved');
        var food = new Food();
        
        if (request.query.fill !== undefined) {
            console.log('Food Handler: Fill request recieved');
            food.fillDummy().then(function(result) {
                resolve(result); 
            }, function(err) {
                reject(err);
            });
        
        } else { 
            console.log('Food Handler: Retrieve request recieved');
            food.getList(request).then(function(result) {
                console.log('Food Handler: retrieved req');
                resolve(result);
            }, function (err) {
                console.log(err);
                console.log('Food Handler: retrieved err');
                reject(err);   
            });
        }
    });
}
