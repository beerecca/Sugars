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
          this.carbs = 0;
          this.quantity = 0;
          this.exercise = 0;
          this.amount = 1;
          this.food = {
            pizza: {
              unit: "slice",
              defaultAmount: 1,
              carbs: 30
            },
            rice: {
              unit: "cup",
              defaultAmount: 1,
              carbs: 40
            },
            bread: {
              unit: "slice",
              defaultAmount: 1,
              carbs: 20
            }
          };
        }

        _prototypeProperties(Entry, null, {
          time: {
            get: function () {
              return moment().format("dddd, Do MMMM YYYY, h:mm a");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudHJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUFPLE1BQU0seUNBRUEsS0FBSzs7O0FBRlgsWUFBTTs7Ozs7OztBQUVBLFdBQUs7QUFDTCxpQkFEQSxLQUFLO2dDQUFMLEtBQUs7O0FBRWQsY0FBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7QUFDM0IsY0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDeEIsY0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDdEIsY0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDakIsY0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZixjQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUNsQixjQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUNsQixjQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNoQixjQUFJLENBQUMsSUFBSSxHQUFHO0FBQ1YsaUJBQUssRUFBRztBQUNOLGtCQUFJLEVBQUcsT0FBTztBQUNkLDJCQUFhLEVBQUcsQ0FBQztBQUNqQixtQkFBSyxFQUFHLEVBQUU7YUFDWDtBQUNELGdCQUFJLEVBQUc7QUFDTCxrQkFBSSxFQUFHLEtBQUs7QUFDWiwyQkFBYSxFQUFHLENBQUM7QUFDakIsbUJBQUssRUFBRyxFQUFFO2FBQ1g7QUFDRCxpQkFBSyxFQUFHO0FBQ04sa0JBQUksRUFBRyxPQUFPO0FBQ2QsMkJBQWEsRUFBRyxDQUFDO0FBQ2pCLG1CQUFLLEVBQUcsRUFBRTthQUNYO1dBQ0YsQ0FBQTtTQUNGOzs2QkEzQlUsS0FBSztBQTZCWixjQUFJO2lCQUFBLFlBQUU7QUFDUixxQkFBTyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQzthQUN0RDs7O0FBRUcsZUFBSztpQkFBQSxZQUFFO0FBQ1Qsa0JBQUksWUFBWSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxDQUFDO2tCQUMvQyxVQUFVLEdBQUcsQUFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUksRUFBRTtrQkFDbEUsY0FBYyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2tCQUN4QyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxBQUFDLENBQUMsWUFBWSxHQUFHLFVBQVUsR0FBRyxjQUFjLENBQUEsR0FBSSxFQUFFLEdBQUksRUFBRSxDQUFDLENBQUM7O0FBRW5GLHlCQUFXLEdBQUcsQUFBQyxXQUFXLEdBQUcsQ0FBQyxHQUFJLENBQUMsR0FBRyxXQUFXLENBQUM7O0FBRXRELDBCQUFVLFdBQVcsQ0FBRzthQUN6Qjs7Ozs7ZUExQ1UsS0FBSyIsImZpbGUiOiJlbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjLyJ9