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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudHJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUFPLE1BQU0seUNBRUEsS0FBSzs7O0FBRlgsWUFBTTs7Ozs7OztBQUVBLFdBQUs7QUFDTCxpQkFEQSxLQUFLO2dDQUFMLEtBQUs7O0FBRWQsY0FBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7QUFDM0IsY0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDeEIsY0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDdEIsY0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDakIsY0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZixjQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUNsQixjQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUNsQixjQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNqQjs7NkJBVlUsS0FBSztBQVlaLGNBQUk7aUJBQUEsWUFBRTtBQUNSLHFCQUFPLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2FBQ3REOzs7QUFFRyxlQUFLO2lCQUFBLFlBQUU7QUFDVCxrQkFBSSxZQUFZLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLENBQUM7a0JBQy9DLFVBQVUsR0FBRyxBQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBSSxFQUFFO2tCQUNsRSxjQUFjLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7a0JBQ3hDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEFBQUMsQ0FBQyxZQUFZLEdBQUcsVUFBVSxHQUFHLGNBQWMsQ0FBQSxHQUFJLEVBQUUsR0FBSSxFQUFFLENBQUMsQ0FBQzs7QUFFbkYseUJBQVcsR0FBRyxBQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQzs7QUFFdEQsMEJBQVUsV0FBVyxDQUFHO2FBQ3pCOzs7OztlQXpCVSxLQUFLIiwiZmlsZSI6ImVudHJ5LmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIn0=