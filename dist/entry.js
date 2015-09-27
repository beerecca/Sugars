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
            config.useStandardConfiguration().withBaseUrl('http://sugars.herokuapp.com/api/');
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
//# sourceMappingURL=data:application/json;base64,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QUFRLEdBQUcsQ0FBQyxHQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7O0FBRWpGLGdCQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFBLEFBQUMsRUFBRTtBQUNsRix3QkFBVSxHQUFHLElBQUksQ0FBQzthQUNuQjs7QUFFRCxtQkFBTyxVQUFVLENBQUM7V0FDbkI7OztlQUVtQixlQUFHO0FBQ3JCLG1CQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDO1dBQ3BDOzs7ZUFXVyxhQUFDLElBQUksRUFBRTtBQUNqQixnQkFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQ2xCLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDdEIsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztBQUNuQyxnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3hCLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7V0FDdkI7OztlQXRDVSxhQUFhIiwiZmlsZSI6ImVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xuaW1wb3J0ICdmZXRjaCc7XG5pbXBvcnQge2NvbWJvQm94fSBmcm9tICcuL2NvbWJvYm94JztcbmNvbnN0IERFRkFVTFRTRUxFQ1QgPSAnU2VsZWN0IGZvb2QgaXRlbTonO1xuXG5AaW5qZWN0KEh0dHBDbGllbnQpXG5leHBvcnQgY2xhc3MgRW50cnl7XG4gIGNvbnN0cnVjdG9yKGh0dHApe1xuICAgIHRoaXMuaGVhZGluZyA9ICdOZXcgRW50cnknO1xuICAgIHRoaXMuZ2x1Y29zZSA9IDA7XG4gICAgdGhpcy5leGVyY2lzZSA9IDA7XG4gICAgdGhpcy50aW1lID0gbW9tZW50KCkuZm9ybWF0KCdkZGRkLCBEbyBNTU1NIFlZWVksIGg6bW0gYScpO1xuICAgIHRoaXMuZm9vZCA9IFtdO1xuICAgIFxuICAgIC8vc3RhcnQgdGhlIHBhZ2Ugd2l0aCBvbmUgZW1wdHkgZW50cnkgZm9vZCBpdGVtXG4gICAgdGhpcy5lbnRyeUZvb2RJdGVtcyA9IFsgbmV3IEVudHJ5Rm9vZEl0ZW0oKSBdO1xuICAgIFxuICAgIC8vaW5pdGlhbGl6ZSBodHRwIGNsaWVudCBmb3IgYWpheHkgcmVxdWVzdHNcbiAgICBodHRwLmNvbmZpZ3VyZShjb25maWcgPT4ge1xuICAgICAgY29uZmlnXG4gICAgICAgIC51c2VTdGFuZGFyZENvbmZpZ3VyYXRpb24oKVxuICAgICAgICAvLy53aXRoSGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpXG4gICAgICAgIC53aXRoQmFzZVVybCgnaHR0cDovL3N1Z2Fycy5oZXJva3VhcHAuY29tL2FwaS8nKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaHR0cCA9IGh0dHA7XG5cbiAgICB0aGlzLmh0dHAuZmV0Y2goJ2Zvb2QnKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZm9vZCA9PiB7XG4gICAgICAgIHRoaXMuZm9vZCA9IGZvb2Q7XG4gICAgICAgIHRoaXMuZm9vZC51bnNoaWZ0KHtcbiAgICAgICAgICBpZCA6IG51bGwsXG4gICAgICAgICAgbmFtZSA6IERFRkFVTFRTRUxFQ1QsXG4gICAgICAgICAgdW5pdCA6ICd1bml0JyxcbiAgICAgICAgICBjYXJicyA6IDAsXG4gICAgICAgICAgcXVhbnRpdHkgOiAwXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IC8vY2hhbmdlIHRoaXMgdG8gYW4gb25sb2FkIG9mIGh0bWwgZXZlbnQgb2Ygc29tZSBraW5kXG4gICAgLy8gICB0aGlzLmNvbWJvQm94ID0gbmV3IGNvbWJvQm94KCdjYl9pZGVudGlmaWVyJyk7XG4gICAgLy8gICBjb25zb2xlLmxvZygnY29tYm9ib3ggYWZ0ZXIgdGltZW91dCcsIHRoaXMuY29tYm9Cb3gpO1xuICAgIC8vIH0sIDEwMDAwKTtcblxuICB9XG5cbiAgYWRkRm9vZCgpe1xuICAgIHRoaXMuZW50cnlGb29kSXRlbXMucHVzaChuZXcgRW50cnlGb29kSXRlbSgpKTtcbiAgfVxuXG4gIHJlbW92ZUZvb2QoaW5kZXgpe1xuICAgIHRoaXMuZW50cnlGb29kSXRlbXMuc3BsaWNlKGluZGV4LDEpO1xuICB9XG5cbiAgZ2V0IGNhbGMoKXtcbiAgICB2YXIgdG90YWwgPSAwLFxuICAgICAgbm9ybWFsQWRqdXN0LFxuICAgICAgZm9vZEFkanVzdCxcbiAgICAgIGV4ZXJjaXNlQWRqdXN0LFxuICAgICAgY2FsY3VsYXRpb247XG5cbiAgICBmb3IgKHZhciBlZmkgb2YgdGhpcy5lbnRyeUZvb2RJdGVtcykge1xuICAgICAgdG90YWwgKz0gZWZpLmdldFRvdGFsKCk7XG4gICAgfVxuXG4gICAgbm9ybWFsQWRqdXN0ID0gKHBhcnNlSW50KHRoaXMuZ2x1Y29zZSkgLSA3KSAvIDM7XG4gICAgZm9vZEFkanVzdCA9IHRvdGFsIC8gMTA7XG4gICAgZXhlcmNpc2VBZGp1c3QgPSBwYXJzZUludCh0aGlzLmV4ZXJjaXNlKTtcbiAgICBjYWxjdWxhdGlvbiA9IE1hdGgucm91bmQoKChub3JtYWxBZGp1c3QgKyBmb29kQWRqdXN0IC0gZXhlcmNpc2VBZGp1c3QpICogMTApIC8gMTApO1xuICAgIGNhbGN1bGF0aW9uID0gKGNhbGN1bGF0aW9uIDwgMCkgPyAwIDogY2FsY3VsYXRpb247XG5cbiAgICByZXR1cm4gY2FsY3VsYXRpb247XG4gIH1cblxuICBzdWJtaXQoKXtcbiAgICB2YXIgZGF0YSxcbiAgICAgICAgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdCcpLmNsYXNzTGlzdCxcbiAgICAgICAgYWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQtc3VjY2VzcycpLmNsYXNzTGlzdCxcbiAgICAgICAganNvbkVudHJ5Rm9vZEl0ZW0gPSBbXTtcblxuICAgIGZvciAodmFyIGVmaSBvZiB0aGlzLmVudHJ5Rm9vZEl0ZW1zKSB7XG4gICAgICBpZiAoZWZpLm5hbWUgIT09IERFRkFVTFRTRUxFQ1QpIHtcbiAgICAgICAganNvbkVudHJ5Rm9vZEl0ZW0ucHVzaChlZmkudG9KU09OKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBnbHVjb3NlTGV2ZWwgOiB0aGlzLmdsdWNvc2UsXG4gICAgICBleGVyY2lzZUNhcmJzIDogdGhpcy5leGVyY2lzZSxcbiAgICAgIGluc3VsaW5TaG9ydCA6IHRoaXMuc2hvcnQsXG4gICAgICBmb29kSXRlbXMgOiBqc29uRW50cnlGb29kSXRlbSxcbiAgICAgIGVudHJ5RGF0ZSA6IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3NcIilcbiAgICB9O1xuXG4gICAgc3VibWl0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLmZldGNoKCdlbnRyeT9hZGQnLCB7XG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGhlYWRlcnM6IHsgLy9UT0RPOiBzaG91bGQgYmUgYWJsZSB0byBzZXQgdGhpcyBnbG9iYWxseVxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSkgLy9UT0RPOiBpcyB0aGUgZGF0YSBnb2luZyB0aHJvdWdoPyBhbHNvIHNob3VsZCBiZSBjYXRjaCBpbnN0ZWFkIG9mIGlmXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuXG4gICAgICAgIGFsZXJ0LnJlbW92ZShcImZhZGVcIik7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgc3VibWl0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBhbGVydC5hZGQoXCJmYWRlXCIpOyB9LCAzMDAwKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgICAgICB3aW5kb3cuYWxlcnQoJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluIScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbnRyeUZvb2RJdGVtIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pZCA9IG51bGw7XG4gICAgdGhpcy5uYW1lID0gJ1NlbGVjdCBmb29kIGl0ZW06JztcbiAgICB0aGlzLnVuaXQgPSAndW5pdCc7XG4gICAgdGhpcy5jYXJicyA9IDA7XG4gICAgdGhpcy5xdWFudGl0eSA9IDA7XG4gIH1cblxuICBnZXQgcGx1cmFsKCkge1xuICAgIHZhciBwbHVyYWxpc2VkID0gKHBhcnNlSW50KHRoaXMucXVhbnRpdHkpID09PSAwIHx8IHRoaXMucXVhbnRpdHkgPiAxKSA/ICdzJyA6ICcnO1xuXG4gICAgaWYgKHRoaXMudW5pdCA9PT0gJ3BvdGF0bycgJiYgKHBhcnNlSW50KHRoaXMucXVhbnRpdHkpID09PSAwIHx8IHRoaXMucXVhbnRpdHkgPiAxKSkge1xuICAgICAgcGx1cmFsaXNlZCA9ICdlcyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBsdXJhbGlzZWQ7XG4gIH1cblxuICBnZXQgc2hvd1JlbW92ZUJ1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lICE9PSBERUZBVUxUU0VMRUNUO1xuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZCA6IHRoaXMuaWQsXG4gICAgICBuYW1lIDogdGhpcy5uYW1lLFxuICAgICAgY2FyYnMgOiB0aGlzLmNhcmJzLFxuICAgICAgcXVhbnRpdHkgOiB0aGlzLnF1YW50aXR5IFxuICAgIH07XG4gIH1cblxuICBzZXQgZm9vZEl0ZW0oaXRlbSkge1xuICAgIHRoaXMuaWQgPSBpdGVtLmlkO1xuICAgIHRoaXMubmFtZSA9IGl0ZW0ubmFtZTtcbiAgICB0aGlzLnF1YW50aXR5ID0gaXRlbS5kZWZhdWx0QW1vdW50O1xuICAgIHRoaXMuY2FyYnMgPSBpdGVtLmNhcmJzO1xuICAgIHRoaXMudW5pdCA9IGl0ZW0udW5pdDtcbiAgfVxuXG4gIGdldFRvdGFsKCkge1xuICAgIHJldHVybiAodGhpcy5jYXJicyAqIHRoaXMucXVhbnRpdHkpO1xuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==