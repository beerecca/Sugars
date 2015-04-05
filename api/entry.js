//Entry handler

import * as db from 'api/db';

export class Entry {

    constructor() {
        this.db = new db.DB();
    }

    addEntry(request) {
        return new Promise((resolve, reject) => {
            this.db.init().then((result) => {
                this.db.User.findAll({
                    where: {
                        firstName: "Bex",
                        lastName: "Hill"
                    }
                }).then((user) => {
                    this.db.sequelize.transaction((t) => {
                        this.db.Entry.create({
                            glucoseLevel: request.body.glucoseLevel,
                            exerciseCarbs: request.body.exerciseCarbs,
                            insulinShort: request.body.insulinShort,  
                        }, { transaction: t}).then((entry) => {
                            user.addEntry(entry, { transaction: t }).then(() => {
                                resolve('derp');
                                /*for (var foodItem of request.body.footItems) {
                                    this.db.FoodEntry

                                }*/
                            });
                        })
                    }).then(resolve,reject);
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



