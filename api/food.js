//food end point handler

import * as db from 'api/db';

export class Food {

    constructor() {
        this.db = new db.DB();
    }

    getList(request) {
        return new Promise((resolve,reject) => {

            //call the database init.
            this.db.init().then(function(result) {
                
                //success, lets query the request
                var foodList = this.db.User
                .findAll({
                    include: { model: 'Foods' }, 
                    where: {
                        firstname: {
                            eq: 'Ben'
                        }
                    }
                });

                //return the JSON object
                return resolve(foodList.toJSON());
            }, function(err) {
                reject(err);    
            });
            
        });
    }

    fillDummy() {
        return new Promise((resolve, reject) => {
            this.db.init().then(function(result) {
                this.db.User.create({
                    firstname: 'Ben',
                    lastname: 'Naylor'
                });

            }, function(err) {
                reject(err);
            });
        });

    };

}

export function handle(request) {
    return new Promise(function (resolve, reject) {
        var food = new Food();
        console.log('na');
        
        if (request.query.fill !== undefined) {
            console.log('filling data');
            food.fillDummy().then(function(result) {
                resolve(result); 
            }, function(err) {
                reject(err);
            });
        
        } else { 
            console.log('getting data');
            food.getList(request).then(function(result) {
                resolve(result);
            }, function (err) {
                reject(err);   
            });
        }
    });
}
