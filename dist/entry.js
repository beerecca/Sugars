System.register(['moment', 'aurelia-framework', 'aurelia-fetch-client', 'fetch', './combobox'], function (_export) {
  'use strict';

  var moment, inject, HttpClient, comboBox, DEFAULTSELECT, Entry, EntryFoodItem;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_moment) {
      moment = _moment['default'];
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_fetch) {}, function (_combobox) {
      comboBox = _combobox.comboBox;
    }],
    execute: function () {
      DEFAULTSELECT = 'Select food item:';

      Entry = (function () {
        function Entry(http) {
          var _this = this;

          _classCallCheck(this, _Entry);

          this.heading = 'New Entry';
          this.glucose = 0;
          this.exercise = 0;
          this.time = moment().format('dddd, Do MMMM YYYY, h:mm a');
          this.food = [];

          this.entryFoodItems = [new EntryFoodItem()];

          http.configure(function (config) {
            config.useStandardConfiguration().withBaseUrl('http://sugars-api.herokuapp.com/api/');
          });

          this.http = http;

          this.http.fetch('food').then(function (response) {
            return response.json();
          }).then(function (food) {
            _this.food = food;
            _this.food.unshift({
              id: null,
              name: DEFAULTSELECT,
              unit: 'unit',
              carbs: 0,
              quantity: 0
            });
          });
        }

        _createClass(Entry, [{
          key: 'addFood',
          value: function addFood() {
            this.entryFoodItems.push(new EntryFoodItem());
          }
        }, {
          key: 'removeFood',
          value: function removeFood(index) {
            this.entryFoodItems.splice(index, 1);
          }
        }, {
          key: 'submit',
          value: function submit() {
            var data,
                submit = document.querySelector('.submit').classList,
                alert = document.querySelector('.alert-success').classList,
                jsonEntryFoodItem = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.entryFoodItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var efi = _step.value;

                if (efi.name !== DEFAULTSELECT) {
                  jsonEntryFoodItem.push(efi.toJSON());
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                  _iterator['return']();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            data = {
              glucoseLevel: this.glucose,
              exerciseCarbs: this.exercise,
              insulinShort: this.short,
              foodItems: jsonEntryFoodItem,
              entryDate: moment().format("YYYY-MM-DD HH:mm:ss")
            };

            submit.add('active');

            return this.http.fetch('entry?add', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data) }).then(function (response) {

              if (response.status === 200) {

                alert.remove("fade");
                window.scrollTo(0, 0);
                submit.remove("active");
                setTimeout(function () {
                  alert.add("fade");
                }, 3000);
              } else {
                console.log('Response', response);
                window.alert('Something went wrong, please try again!');
              }
            });
          }
        }, {
          key: 'calc',
          get: function get() {
            var total = 0,
                normalAdjust,
                foodAdjust,
                exerciseAdjust,
                calculation;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = this.entryFoodItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var efi = _step2.value;

                total += efi.getTotal();
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                  _iterator2['return']();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            normalAdjust = (parseInt(this.glucose) - 7) / 3;
            foodAdjust = total / 10;
            exerciseAdjust = parseInt(this.exercise);
            calculation = Math.round((normalAdjust + foodAdjust - exerciseAdjust) * 10 / 10);
            calculation = calculation < 0 ? 0 : calculation;

            return calculation;
          }
        }]);

        var _Entry = Entry;
        Entry = inject(HttpClient)(Entry) || Entry;
        return Entry;
      })();

      _export('Entry', Entry);

      EntryFoodItem = (function () {
        function EntryFoodItem() {
          _classCallCheck(this, EntryFoodItem);

          this.id = null;
          this.name = 'Select food item:';
          this.unit = 'unit';
          this.carbs = 0;
          this.quantity = 0;
        }

        _createClass(EntryFoodItem, [{
          key: 'toJSON',
          value: function toJSON() {
            return {
              id: this.id,
              name: this.name,
              carbs: this.carbs,
              quantity: this.quantity
            };
          }
        }, {
          key: 'getTotal',
          value: function getTotal() {
            return this.carbs * this.quantity;
          }
        }, {
          key: 'plural',
          get: function get() {
            var pluralised = parseInt(this.quantity) === 0 || this.quantity > 1 ? 's' : '';

            if (this.unit === 'potato' && (parseInt(this.quantity) === 0 || this.quantity > 1)) {
              pluralised = 'es';
            }

            return pluralised;
          }
        }, {
          key: 'showRemoveButton',
          get: function get() {
            return this.name !== DEFAULTSELECT;
          }
        }, {
          key: 'foodItem',
          set: function set(item) {
            this.id = item.id;
            this.name = item.name;
            this.quantity = item.defaultAmount;
            this.carbs = item.carbs;
            this.unit = item.unit;
          }
        }]);

        return EntryFoodItem;
      })();

      _export('EntryFoodItem', EntryFoodItem);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudHJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs0Q0FLTSxhQUFhLEVBR04sS0FBSyxFQWtITCxhQUFhOzs7Ozs7Ozs7O2lDQXpIbEIsTUFBTTs7dUNBQ04sVUFBVTs7MkJBRVYsUUFBUTs7O0FBQ1YsbUJBQWEsR0FBRyxtQkFBbUI7O0FBRzVCLFdBQUs7QUFDTCxpQkFEQSxLQUFLLENBQ0osSUFBSSxFQUFDOzs7OztBQUNmLGNBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO0FBQzNCLGNBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLGNBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLGNBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDMUQsY0FBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7O0FBR2YsY0FBSSxDQUFDLGNBQWMsR0FBRyxDQUFFLElBQUksYUFBYSxFQUFFLENBQUUsQ0FBQzs7QUFHOUMsY0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUN2QixrQkFBTSxDQUNILHdCQUF3QixFQUFFLENBRTFCLFdBQVcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1dBQ3hELENBQUMsQ0FBQzs7QUFFSCxjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsY0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQ3BCLElBQUksQ0FBQyxVQUFBLFFBQVE7bUJBQUksUUFBUSxDQUFDLElBQUksRUFBRTtXQUFBLENBQUMsQ0FDakMsSUFBSSxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ1osa0JBQUssSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixrQkFBSyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ2hCLGdCQUFFLEVBQUcsSUFBSTtBQUNULGtCQUFJLEVBQUcsYUFBYTtBQUNwQixrQkFBSSxFQUFHLE1BQU07QUFDYixtQkFBSyxFQUFHLENBQUM7QUFDVCxzQkFBUSxFQUFHLENBQUM7YUFDYixDQUFDLENBQUM7V0FDSixDQUFDLENBQUM7U0FPTjs7cUJBdkNVLEtBQUs7O2lCQXlDVCxtQkFBRTtBQUNQLGdCQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLENBQUM7V0FDL0M7OztpQkFFUyxvQkFBQyxLQUFLLEVBQUM7QUFDZixnQkFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1dBQ3JDOzs7aUJBc0JLLGtCQUFFO0FBQ04sZ0JBQUksSUFBSTtnQkFDSixNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTO2dCQUNwRCxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVM7Z0JBQzFELGlCQUFpQixHQUFHLEVBQUUsQ0FBQzs7Ozs7OztBQUUzQixtQ0FBZ0IsSUFBSSxDQUFDLGNBQWMsOEhBQUU7b0JBQTVCLEdBQUc7O0FBQ1Ysb0JBQUksR0FBRyxDQUFDLElBQUksS0FBSyxhQUFhLEVBQUU7QUFDOUIsbUNBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUN0QztlQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsZ0JBQUksR0FBRztBQUNMLDBCQUFZLEVBQUcsSUFBSSxDQUFDLE9BQU87QUFDM0IsMkJBQWEsRUFBRyxJQUFJLENBQUMsUUFBUTtBQUM3QiwwQkFBWSxFQUFHLElBQUksQ0FBQyxLQUFLO0FBQ3pCLHVCQUFTLEVBQUcsaUJBQWlCO0FBQzdCLHVCQUFTLEVBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDO2FBQ25ELENBQUM7O0FBRUYsa0JBQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRXJCLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUNsQyxvQkFBTSxFQUFFLE1BQU07QUFDZCxxQkFBTyxFQUFFO0FBQ1AsOEJBQWMsRUFBRSxrQkFBa0I7ZUFDbkM7QUFDRCxrQkFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLEVBQUk7O0FBRWxCLGtCQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFOztBQUUzQixxQkFBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyQixzQkFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdEIsc0JBQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEIsMEJBQVUsQ0FBQyxZQUFVO0FBQUUsdUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztlQUVwRCxNQUFNO0FBQ0wsdUJBQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDLHNCQUFNLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7ZUFDekQ7YUFDRixDQUFDLENBQUM7V0FDSjs7O2VBOURPLGVBQUU7QUFDUixnQkFBSSxLQUFLLEdBQUcsQ0FBQztnQkFDWCxZQUFZO2dCQUNaLFVBQVU7Z0JBQ1YsY0FBYztnQkFDZCxXQUFXLENBQUM7Ozs7Ozs7QUFFZCxvQ0FBZ0IsSUFBSSxDQUFDLGNBQWMsbUlBQUU7b0JBQTVCLEdBQUc7O0FBQ1YscUJBQUssSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7ZUFDekI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCx3QkFBWSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxDQUFDLENBQUM7QUFDaEQsc0JBQVUsR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLDBCQUFjLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6Qyx1QkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQUFBQyxDQUFDLFlBQVksR0FBRyxVQUFVLEdBQUcsY0FBYyxDQUFBLEdBQUksRUFBRSxHQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ25GLHVCQUFXLEdBQUcsQUFBQyxXQUFXLEdBQUcsQ0FBQyxHQUFJLENBQUMsR0FBRyxXQUFXLENBQUM7O0FBRWxELG1CQUFPLFdBQVcsQ0FBQztXQUNwQjs7O3FCQW5FVSxLQUFLO0FBQUwsYUFBSyxHQURqQixNQUFNLENBQUMsVUFBVSxDQUFDLENBQ04sS0FBSyxLQUFMLEtBQUs7ZUFBTCxLQUFLOzs7OztBQWtITCxtQkFBYTtBQUNiLGlCQURBLGFBQWEsR0FDVjtnQ0FESCxhQUFhOztBQUV0QixjQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztBQUNmLGNBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUM7QUFDaEMsY0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7QUFDbkIsY0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZixjQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztTQUNuQjs7cUJBUFUsYUFBYTs7aUJBdUJsQixrQkFBRztBQUNQLG1CQUFPO0FBQ0wsZ0JBQUUsRUFBRyxJQUFJLENBQUMsRUFBRTtBQUNaLGtCQUFJLEVBQUcsSUFBSSxDQUFDLElBQUk7QUFDaEIsbUJBQUssRUFBRyxJQUFJLENBQUMsS0FBSztBQUNsQixzQkFBUSxFQUFHLElBQUksQ0FBQyxRQUFRO2FBQ3pCLENBQUM7V0FDSDs7O2lCQVVPLG9CQUFHO0FBQ1QsbUJBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFFO1dBQ3JDOzs7ZUFqQ1MsZUFBRztBQUNYLGdCQUFJLFVBQVUsR0FBRyxBQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7O0FBRWpGLGdCQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFBLEFBQUMsRUFBRTtBQUNsRix3QkFBVSxHQUFHLElBQUksQ0FBQzthQUNuQjs7QUFFRCxtQkFBTyxVQUFVLENBQUM7V0FDbkI7OztlQUVtQixlQUFHO0FBQ3JCLG1CQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDO1dBQ3BDOzs7ZUFXVyxhQUFDLElBQUksRUFBRTtBQUNqQixnQkFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQ2xCLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDdEIsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztBQUNuQyxnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3hCLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7V0FDdkI7OztlQXRDVSxhQUFhIiwiZmlsZSI6ImVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xuaW1wb3J0ICdmZXRjaCc7XG5pbXBvcnQge2NvbWJvQm94fSBmcm9tICcuL2NvbWJvYm94JztcbmNvbnN0IERFRkFVTFRTRUxFQ1QgPSAnU2VsZWN0IGZvb2QgaXRlbTonO1xuXG5AaW5qZWN0KEh0dHBDbGllbnQpXG5leHBvcnQgY2xhc3MgRW50cnl7XG4gIGNvbnN0cnVjdG9yKGh0dHApe1xuICAgIHRoaXMuaGVhZGluZyA9ICdOZXcgRW50cnknO1xuICAgIHRoaXMuZ2x1Y29zZSA9IDA7XG4gICAgdGhpcy5leGVyY2lzZSA9IDA7XG4gICAgdGhpcy50aW1lID0gbW9tZW50KCkuZm9ybWF0KCdkZGRkLCBEbyBNTU1NIFlZWVksIGg6bW0gYScpO1xuICAgIHRoaXMuZm9vZCA9IFtdO1xuICAgIFxuICAgIC8vc3RhcnQgdGhlIHBhZ2Ugd2l0aCBvbmUgZW1wdHkgZW50cnkgZm9vZCBpdGVtXG4gICAgdGhpcy5lbnRyeUZvb2RJdGVtcyA9IFsgbmV3IEVudHJ5Rm9vZEl0ZW0oKSBdO1xuICAgIFxuICAgIC8vaW5pdGlhbGl6ZSBodHRwIGNsaWVudCBmb3IgYWpheHkgcmVxdWVzdHNcbiAgICBodHRwLmNvbmZpZ3VyZShjb25maWcgPT4ge1xuICAgICAgY29uZmlnXG4gICAgICAgIC51c2VTdGFuZGFyZENvbmZpZ3VyYXRpb24oKVxuICAgICAgICAvLy53aXRoSGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpXG4gICAgICAgIC53aXRoQmFzZVVybCgnaHR0cDovL3N1Z2Fycy1hcGkuaGVyb2t1YXBwLmNvbS9hcGkvJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmh0dHAgPSBodHRwO1xuXG4gICAgdGhpcy5odHRwLmZldGNoKCdmb29kJylcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGZvb2QgPT4ge1xuICAgICAgICB0aGlzLmZvb2QgPSBmb29kO1xuICAgICAgICB0aGlzLmZvb2QudW5zaGlmdCh7XG4gICAgICAgICAgaWQgOiBudWxsLFxuICAgICAgICAgIG5hbWUgOiBERUZBVUxUU0VMRUNULFxuICAgICAgICAgIHVuaXQgOiAndW5pdCcsXG4gICAgICAgICAgY2FyYnMgOiAwLFxuICAgICAgICAgIHF1YW50aXR5IDogMFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpeyAvL2NoYW5nZSB0aGlzIHRvIGFuIG9ubG9hZCBvZiBodG1sIGV2ZW50IG9mIHNvbWUga2luZFxuICAgIC8vICAgdGhpcy5jb21ib0JveCA9IG5ldyBjb21ib0JveCgnY2JfaWRlbnRpZmllcicpO1xuICAgIC8vICAgY29uc29sZS5sb2coJ2NvbWJvYm94IGFmdGVyIHRpbWVvdXQnLCB0aGlzLmNvbWJvQm94KTtcbiAgICAvLyB9LCAxMDAwMCk7XG5cbiAgfVxuXG4gIGFkZEZvb2QoKXtcbiAgICB0aGlzLmVudHJ5Rm9vZEl0ZW1zLnB1c2gobmV3IEVudHJ5Rm9vZEl0ZW0oKSk7XG4gIH1cblxuICByZW1vdmVGb29kKGluZGV4KXtcbiAgICB0aGlzLmVudHJ5Rm9vZEl0ZW1zLnNwbGljZShpbmRleCwxKTtcbiAgfVxuXG4gIGdldCBjYWxjKCl7XG4gICAgdmFyIHRvdGFsID0gMCxcbiAgICAgIG5vcm1hbEFkanVzdCxcbiAgICAgIGZvb2RBZGp1c3QsXG4gICAgICBleGVyY2lzZUFkanVzdCxcbiAgICAgIGNhbGN1bGF0aW9uO1xuXG4gICAgZm9yICh2YXIgZWZpIG9mIHRoaXMuZW50cnlGb29kSXRlbXMpIHtcbiAgICAgIHRvdGFsICs9IGVmaS5nZXRUb3RhbCgpO1xuICAgIH1cblxuICAgIG5vcm1hbEFkanVzdCA9IChwYXJzZUludCh0aGlzLmdsdWNvc2UpIC0gNykgLyAzO1xuICAgIGZvb2RBZGp1c3QgPSB0b3RhbCAvIDEwO1xuICAgIGV4ZXJjaXNlQWRqdXN0ID0gcGFyc2VJbnQodGhpcy5leGVyY2lzZSk7XG4gICAgY2FsY3VsYXRpb24gPSBNYXRoLnJvdW5kKCgobm9ybWFsQWRqdXN0ICsgZm9vZEFkanVzdCAtIGV4ZXJjaXNlQWRqdXN0KSAqIDEwKSAvIDEwKTtcbiAgICBjYWxjdWxhdGlvbiA9IChjYWxjdWxhdGlvbiA8IDApID8gMCA6IGNhbGN1bGF0aW9uO1xuXG4gICAgcmV0dXJuIGNhbGN1bGF0aW9uO1xuICB9XG5cbiAgc3VibWl0KCl7XG4gICAgdmFyIGRhdGEsXG4gICAgICAgIHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQnKS5jbGFzc0xpc3QsXG4gICAgICAgIGFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsZXJ0LXN1Y2Nlc3MnKS5jbGFzc0xpc3QsXG4gICAgICAgIGpzb25FbnRyeUZvb2RJdGVtID0gW107XG5cbiAgICBmb3IgKHZhciBlZmkgb2YgdGhpcy5lbnRyeUZvb2RJdGVtcykge1xuICAgICAgaWYgKGVmaS5uYW1lICE9PSBERUZBVUxUU0VMRUNUKSB7XG4gICAgICAgIGpzb25FbnRyeUZvb2RJdGVtLnB1c2goZWZpLnRvSlNPTigpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgZ2x1Y29zZUxldmVsIDogdGhpcy5nbHVjb3NlLFxuICAgICAgZXhlcmNpc2VDYXJicyA6IHRoaXMuZXhlcmNpc2UsXG4gICAgICBpbnN1bGluU2hvcnQgOiB0aGlzLnNob3J0LFxuICAgICAgZm9vZEl0ZW1zIDoganNvbkVudHJ5Rm9vZEl0ZW0sXG4gICAgICBlbnRyeURhdGUgOiBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIpXG4gICAgfTtcblxuICAgIHN1Ym1pdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5mZXRjaCgnZW50cnk/YWRkJywge1xuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBoZWFkZXJzOiB7IC8vVE9ETzogc2hvdWxkIGJlIGFibGUgdG8gc2V0IHRoaXMgZ2xvYmFsbHlcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpIC8vVE9ETzogaXMgdGhlIGRhdGEgZ29pbmcgdGhyb3VnaD8gYWxzbyBzaG91bGQgYmUgY2F0Y2ggaW5zdGVhZCBvZiBpZlxuICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcblxuICAgICAgICBhbGVydC5yZW1vdmUoXCJmYWRlXCIpO1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIHN1Ym1pdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgYWxlcnQuYWRkKFwiZmFkZVwiKTsgfSwgMzAwMCk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwb25zZScsIHJlc3BvbnNlKTtcbiAgICAgICAgd2luZG93LmFsZXJ0KCdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2FpbiEnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW50cnlGb29kSXRlbSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaWQgPSBudWxsO1xuICAgIHRoaXMubmFtZSA9ICdTZWxlY3QgZm9vZCBpdGVtOic7XG4gICAgdGhpcy51bml0ID0gJ3VuaXQnO1xuICAgIHRoaXMuY2FyYnMgPSAwO1xuICAgIHRoaXMucXVhbnRpdHkgPSAwO1xuICB9XG5cbiAgZ2V0IHBsdXJhbCgpIHtcbiAgICB2YXIgcGx1cmFsaXNlZCA9IChwYXJzZUludCh0aGlzLnF1YW50aXR5KSA9PT0gMCB8fCB0aGlzLnF1YW50aXR5ID4gMSkgPyAncycgOiAnJztcblxuICAgIGlmICh0aGlzLnVuaXQgPT09ICdwb3RhdG8nICYmIChwYXJzZUludCh0aGlzLnF1YW50aXR5KSA9PT0gMCB8fCB0aGlzLnF1YW50aXR5ID4gMSkpIHtcbiAgICAgIHBsdXJhbGlzZWQgPSAnZXMnO1xuICAgIH1cblxuICAgIHJldHVybiBwbHVyYWxpc2VkO1xuICB9XG5cbiAgZ2V0IHNob3dSZW1vdmVCdXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSAhPT0gREVGQVVMVFNFTEVDVDtcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQgOiB0aGlzLmlkLFxuICAgICAgbmFtZSA6IHRoaXMubmFtZSxcbiAgICAgIGNhcmJzIDogdGhpcy5jYXJicyxcbiAgICAgIHF1YW50aXR5IDogdGhpcy5xdWFudGl0eSBcbiAgICB9O1xuICB9XG5cbiAgc2V0IGZvb2RJdGVtKGl0ZW0pIHtcbiAgICB0aGlzLmlkID0gaXRlbS5pZDtcbiAgICB0aGlzLm5hbWUgPSBpdGVtLm5hbWU7XG4gICAgdGhpcy5xdWFudGl0eSA9IGl0ZW0uZGVmYXVsdEFtb3VudDtcbiAgICB0aGlzLmNhcmJzID0gaXRlbS5jYXJicztcbiAgICB0aGlzLnVuaXQgPSBpdGVtLnVuaXQ7XG4gIH1cblxuICBnZXRUb3RhbCgpIHtcbiAgICByZXR1cm4gKHRoaXMuY2FyYnMgKiB0aGlzLnF1YW50aXR5KTtcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
