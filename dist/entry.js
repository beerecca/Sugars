System.register(["moment"], function (_export) {
  "use strict";

  var moment, _prototypeProperties, _classCallCheck, Entry;
  return {
    setters: [function (_moment) {
      moment = _moment["default"];
    }],
    execute: function () {
      _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      Entry = _export("Entry", (function () {
        function Entry() {
          _classCallCheck(this, Entry);

          this.heading = "New Entry";
          this.firstName = "John";
          this.lastName = "Doe";
          this.glucose = 0;
          this.quantity = 0;
          this.exercise = 0;
          this.amount = 1;
          this.chosenFood = [{
            name: "Pizza",
            unit: "slice",
            defaultAmount: 1,
            amount: 1,
            carbs: 30
          }];
          this.food = [{
            name: "Pizza",
            unit: "slice",
            defaultAmount: 1,
            amount: 1,
            carbs: 30
          }, {
            name: "Rice",
            unit: "cup",
            defaultAmount: 1,
            amount: 1,
            carbs: 40
          }, {
            name: "Bread",
            unit: "slice",
            defaultAmount: 1,
            amount: 1,
            carbs: 20
          }];
        }

        _prototypeProperties(Entry, null, {
          time: {
            get: function () {
              return moment().format("dddd, Do MMMM YYYY, h:mm a");
            },
            configurable: true
          },
          totalCarbs: {
            get: function () {
              var calculation = parseInt(this.quantity) * parseInt(this.chosenFood.carbs);
              return "" + calculation;
            },
            configurable: true
          },
          short: {
            get: function () {
              var normalAdjust = (parseInt(this.glucose) - 7) / 3,
                  foodAdjust = parseInt(this.quantity) * parseInt(this.carbs) / 10,
                  exerciseAdjust = parseInt(this.exercise),
                  calculation = Math.round((normalAdjust + foodAdjust - exerciseAdjust) * 10 / 10);

              calculation = calculation < 0 ? 0 : calculation;

              return "" + calculation;
            },
            configurable: true
          }
        });

        return Entry;
      })());
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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