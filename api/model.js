var Sequelize = require('sequelize');
var sequelize = Sequelize('database', 'username', 'password');

var User = sequelize.define('user', {
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

var Food = sequelize.define('food', {
    name: DataTypes.STRING(255),                    //Name              e.g. Pizza
    unit: DataTypes.STRING(255),                    //Unit type,        e.g. Slice
    carbs: DataTypes.INTEGER,                       //Carbs per unit    e.g. 30
    defaultAmount: DataTypes.INTEGER                //Default           e.g. 1 (as in one slice)
});


var Entry = sequelize.define('entry', {
    entryDate: DataTypes.DATE,
    glucoseLevel: DataTypes.DECIMAL(8,3),
    exerciseCarbs: DataType.DECIMAL(8,3),
    insulinShort: DataType.INTEGER
});

var FoodEntry = sequelize.define('foodEntry', {
    quantity: DataTypes.STRING(255),
    carbs: DataTypes.INTEGER
});


User.hasMany(Entry, { as: 'Entries'});
User.hasMany(Food, { as: 'Foods' });

Food.belongsToMany(Entry, { as: "Entries", through: FoodEntry });
Entry.belongsToMany(Food, { as: "Foods", through: FoodEntry });

