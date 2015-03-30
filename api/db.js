var Sequelize = require('sequelize');

export class DB {
    
    constructor() {
        this.__db_connstring = process.env.DATABASE_URL;
    }

    /*constructor(properties) {
        console.log('testing3');
        this.__db_connstring = (properties.dbConnString === undefined)?process.env.DATABASE_URL:properties.dbConnString;
        console.log('testing4');
    }*/

    init() {
        return new Promise((result, reject) => {
            
            //start the database connector
            this.sequelize = Sequelize(this.__db_connstring);

            this.User = this.sequelize.define('user', {
                uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV1, primaryKey: true },   
                firstName: DataTypes.STRING(255),               
                lastName: DataTypes.STRING(255),
                authLoginType: DataTypes.STRING(32),
                //dailyLongActingUnits: DataType.DECIMAL(8, 3),
                unitType: DataTypes.STRING(32),
                glLow: DataTypes.DECIMAL(8,3),                  //low range on Glucose Level (in unitType)
                glHigh: DataTypes.DECIMAL(8,3),                 //high range of Glucose Level (in unitType)
                carbsPerUnit: DataType.DECIMAL(8,3),    
                godMode: DataType.BOOLEAN,

                //Auth implementations for later use
                authEmail: DataTypes.STRING(255),
                authFacebook: DataTypes.STRING(255),
                authGoogle: DataTypes.STRING(255),
                authOAuth: DataTypes.STRING(255)
            });

            this.Food = this.sequelize.define('food', {
                name: DataTypes.STRING(255),                    //Name              e.g. Pizza
                unit: DataTypes.STRING(255),                    //Unit type,        e.g. Slice
                carbs: DataTypes.INTEGER,                       //Carbs per unit    e.g. 30
                defaultAmount: DataTypes.INTEGER                //Default           e.g. 1 (as in one slice)
            });

            this.Entry = this.sequelize.define('entry', {
                entryDate: DataTypes.DATE,
                glucoseLevel: DataTypes.DECIMAL(8,3),
                exerciseCarbs: DataType.DECIMAL(8,3),
                insulinShort: DataType.INTEGER
            });

            this.FoodEntry = this.sequelize.define('foodEntry', {
                quantity: DataTypes.STRING(255),
                carbs: DataTypes.INTEGER
            });

            this.User.hasMany(this.Entry, { as: 'Entries'});
            this.User.hasMany(this.Food, { as: 'Foods' });

            this.Food.belongsToMany(this.Entry, { as: "Entries", through: this.FoodEntry });
            this.Entry.belongsToMany(this.Food, { as: "Foods", through: this.FoodEntry });

            this.sequelize.sync();
            
            result('success!');
        });   
    }
}

