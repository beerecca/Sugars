//Entry handler

import * as db from 'api/db';

export class Entry {

    constructor() {
        this.db = new db.DB();
    }

    addEntry(request) {
        return new Promise((resolve, reject) => {
            this.db.init().then((result) => {
                this.db.User.find({
                    where: {
                        firstName: "Bex",
                        lastName: "Hill"
                    }
                }).then((user) => {
                    this.db.sequelize.transaction((t) => {
                        return this.db.Entry.create({
                            glucoseLevel: request.body.glucoseLevel,
                            exerciseCarbs: request.body.exerciseCarbs,
                            insulinShort: request.body.insulinShort,  
                        }, { transaction: t }).then((entry) => {
                            return user.addEntry(entry, { transaction: t }).then(() => {
                                
                                var allIds = new Set(); 
                                //container to hold new item promises
                                var newItems = [];

                                for (var foodItem of request.body.foodItems) {
                                    if (foodItem.id === undefined || foodItem.id === null) {
                                        newItems.push(this.db.Food.create({
                                            name: foodItem.name,
                                            unit: foodItem.unit,
                                            carbs: foodItem.carbs,
                                            defaultAmount: (foodItem.defaultAmount || 1)
                                        }, { transaction: t }).then((food) => {
                                            foodItem.id = food.id;
                                            return user.addFood(food, { transaction: t });
                                        }));
                                    } else {
                                        allIds.add(foodItem.id);
                                    }
                                }
                                //return all promises under newItems to be processed by the transaction
                                return new Promise.all(newItems).then((nItems) => {
                                    for (var item of nItems) {
                                        allIds.add(item.id);
                                    }

                                    this.db.User.find({
                                        include: [ {
                                            model: this.db.Food,
                                            as: 'Foods',
                                            where: {
                                                id: Array.from(allIds) 
                                            }
                                        } ],
                                        where: {
                                            firstName: "Bex",
                                            lastName: "Hill"
                                        }
                                    }).then((userFoods) => {
                                        var itemMap = new Map();
                                        for (var dbFood of userFoods.Foods) {
                                            itemMap.set(dbFood.id, dbFood);
                                        }
                                        var newEntries = [];
                                        for (var foodItem of request.body.foodItems) {
                                            newEntries.push(entry.addFood(
                                                itemMap.get(foodItem.id),
                                                {
                                                    quantity: foodItem.quantity,
                                                    carbs: foodItem.carbs,
                                                }
                                            ));
                                        }
                                        return new Promise.all(newEntries);
                                    });
                                });
                            });
                        })
                    }).then(function(result) {
                        resolve({status: "success"});   
                    },reject);
                }, reject)
            }, reject);
        });
    }
}

export function handle(request) {
    return new Promise(function(resolve,reject) {
        console.log('Entry Handler: request recieved');
        var entry = new Entry();

        if (request.query.add !== undefined) {
            entry.addEntry(request).then(resolve,reject); 
        } else {
            reject(new Error('No such api call'));
        }
    });
}



