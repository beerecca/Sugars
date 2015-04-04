var Sequelize = require('sequelize');

export class DB {
    
    constructor() {
        this.__db_connString = process.env.DATABASE_URL;
        this.__db_connOptions = {
            dialectOptions: {
                ssl: (process.env.ENVIRONMENT == 'dev')?true:false
            }
        }
    }
    
    syncForce() {
        return new Promise((resolve, reject) => { 
            this.sequelize.sync({ force: true }).then(function(result) {
                resolve({status: 'success'});
            }, reject);
        });
    }
    
    init(options) {
        return new Promise((resolve, reject) => {
            //start the database connector
            this.sequelize = new Sequelize(this.__db_connString, this.__db_connOptions);
           
            this.User = this.sequelize.define('user', {
                uuid: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true },   
                firstName: Sequelize.STRING(255),               
                lastName: Sequelize.STRING(255),
                authLoginType: Sequelize.STRING(32),
                //dailyLongActingUnits: Sequelize.DECIMAL(8, 3),
                unitType: Sequelize.STRING(32),
                glLow: Sequelize.DECIMAL(8,3),                  //low range on Glucose Level (in unitType)
                glHigh: Sequelize.DECIMAL(8,3),                 //high range of Glucose Level (in unitType)
                carbsPerUnit: Sequelize.DECIMAL(8,3),    
                godMode: Sequelize.BOOLEAN,

                //Auth implementations for later use
                authEmail: Sequelize.STRING(255),
                authFacebook: Sequelize.STRING(255),
                authGoogle: Sequelize.STRING(255),
                authOAuth: Sequelize.STRING(255)
            });

            this.Food = this.sequelize.define('food', {
                name: Sequelize.STRING(255),                    //Name              e.g. Pizza
                unit: Sequelize.STRING(255),                    //Unit type,        e.g. Slice
                carbs: Sequelize.INTEGER,                       //Carbs per unit    e.g. 30
                defaultAmount: Sequelize.INTEGER                //Default           e.g. 1 (as in one slice)
            });

            this.Entry = this.sequelize.define('entry', {
                entryDate: Sequelize.DATE,
                glucoseLevel: Sequelize.DECIMAL(8,3),
                exerciseCarbs: Sequelize.DECIMAL(8,3),
                insulinShort: Sequelize.INTEGER
            });

            this.FoodEntry = this.sequelize.define('foodEntry', {
                quantity: Sequelize.STRING(255),
                carbs: Sequelize.INTEGER
            });

            this.User.hasMany(this.Entry, { as: 'Entries'});
            this.User.hasMany(this.Food, { as: 'Foods' });

            this.Food.belongsToMany(this.Entry, { as: "Entries", through: this.FoodEntry });
            this.Entry.belongsToMany(this.Food, { as: "Foods", through: this.FoodEntry });
            
            if (options.sync) {
                this.sequelize.sync().then(function(result) {
                    resolve({status: 'success'});
                }, reject);
            } else {
                resolve({status: 'success'});
            }

        });   
    }
}

