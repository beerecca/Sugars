System.register([], function (_export) {
  "use strict";

  var _prototypeProperties, _classCallCheck, Welcome;
  return {
    setters: [],
    execute: function () {
      _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      Welcome = _export("Welcome", (function () {
        function Welcome() {
          _classCallCheck(this, Welcome);

          this.heading = "New Entry";
          this.firstName = "John";
          this.lastName = "Doe";
          this.glucose = 0;
          this.carbs = 0;
          this.quantity = 0;
          this.exercise = 0;
        }

        _prototypeProperties(Welcome, null, {
          fullName: {
            get: function () {
              return "" + this.firstName + " " + this.lastName;
            },
            configurable: true
          },
          welcome: {
            value: function welcome() {
              alert("Welcome, " + this.fullName + "!");
            },
            writable: true,
            configurable: true
          },
          time: {
            get: function () {
              return Date();
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

        return Welcome;
      })());
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlbGNvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZDQUFhLE9BQU87Ozs7Ozs7O0FBQVAsYUFBTztBQUNQLGlCQURBLE9BQU87Z0NBQVAsT0FBTzs7QUFFaEIsY0FBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7QUFDM0IsY0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDeEIsY0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDdEIsY0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDakIsY0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZixjQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUNsQixjQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztTQUNuQjs7NkJBVFUsT0FBTztBQVdkLGtCQUFRO2lCQUFBLFlBQUU7QUFDWiwwQkFBVSxJQUFJLENBQUMsU0FBUyxTQUFJLElBQUksQ0FBQyxRQUFRLENBQUc7YUFDN0M7OztBQUVELGlCQUFPO21CQUFBLG1CQUFFO0FBQ1AsbUJBQUssZUFBYSxJQUFJLENBQUMsUUFBUSxPQUFJLENBQUM7YUFDckM7Ozs7QUFFRyxjQUFJO2lCQUFBLFlBQUU7QUFDUixxQkFBTyxJQUFJLEVBQUUsQ0FBQzthQUNmOzs7QUFFRyxlQUFLO2lCQUFBLFlBQUU7QUFDVCxrQkFBSSxZQUFZLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLENBQUM7a0JBQy9DLFVBQVUsR0FBRyxBQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBSSxFQUFFO2tCQUNsRSxjQUFjLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7a0JBQ3hDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEFBQUMsQ0FBQyxZQUFZLEdBQUcsVUFBVSxHQUFHLGNBQWMsQ0FBQSxHQUFJLEVBQUUsR0FBSSxFQUFFLENBQUMsQ0FBQzs7QUFFbkYseUJBQVcsR0FBRyxBQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQzs7QUFFdEQsMEJBQVUsV0FBVyxDQUFHO2FBQ3pCOzs7OztlQWhDVSxPQUFPIiwiZmlsZSI6IndlbGNvbWUuanMiLCJzb3VyY2VSb290IjoiL3NyYy8ifQ==