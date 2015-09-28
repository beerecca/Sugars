System.register(['moment', 'aurelia-framework', 'aurelia-fetch-client', 'fetch'], function (_export) {
  'use strict';

  var moment, inject, HttpClient, Report, DayFilterValueConverter, TimeFormatValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_moment) {
      moment = _moment['default'];
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_fetch) {}],
    execute: function () {
      Report = (function () {
        function Report(http) {
          var _this = this;

          _classCallCheck(this, _Report);

          this.heading = 'Reports';
          this.entryDays = [];
          this.entryDaysFormatted = [];
          this.showFood = false;

          http.configure(function (config) {
            config.useStandardConfiguration().withBaseUrl('http://sugars-api.herokuapp.com/api/');
          });

          this.http = http;

          this.http.fetch('entry').then(function (response) {
            return response.json();
          }).then(function (entries) {
            _this.entries = entries;

            var hour = 1;
            var day = 1;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = _this.entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var entry = _step.value;

                entry.exerciseCarbs = Math.round(entry.exerciseCarbs);
                entry.glucoseLevel = Math.round(entry.glucoseLevel);
                entry.insulinShort = Math.round(entry.insulinShort);
                entry.foodAdjust = 0;

                hour = Math.floor(Math.random() * 9) + 1;
                day = Math.floor(Math.random() * 6) + 1;
                entry.entryDate = '2015-04-' + day + ' 1' + hour + ':17:43';

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = entry.foodItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var food = _step2.value;

                    food.quantity = Math.round(food.quantity);
                    entry.foodAdjust += food.quantity * food.carbs;
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

                if (entry.glucoseLevel < 4) {
                  entry.levelKeyword = "low";
                } else if (entry.glucoseLevel > 9) {
                  entry.levelKeyword = "high";
                } else {
                  entry.levelKeyword = "ideal";
                }

                _this.entries.splice(6, _this.entries.length);

                _this.entryDays.push(moment(entry.entryDate));
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

            var sortByDateAsc = function sortByDateAsc(lhs, rhs) {
              return lhs > rhs ? 1 : lhs < rhs ? -1 : 0;
            };

            _this.entryDays.sort(sortByDateAsc);

            _this.entryDaysFormatted = _this.entryDays.map(function (day) {
              return moment(day).format('ddd D MMM');
            });

            console.log('edited entries', _this.entries);
          });
        }

        var _Report = Report;
        Report = inject(HttpClient)(Report) || Report;
        return Report;
      })();

      _export('Report', Report);

      DayFilterValueConverter = (function () {
        function DayFilterValueConverter() {
          _classCallCheck(this, DayFilterValueConverter);
        }

        _createClass(DayFilterValueConverter, [{
          key: 'toView',
          value: function toView(array, dayFilter) {
            return array.filter(function (entry) {
              if (moment(entry.entryDate).format('ddd D MMM') === dayFilter) {
                return true;
              }
            });
          }
        }]);

        return DayFilterValueConverter;
      })();

      _export('DayFilterValueConverter', DayFilterValueConverter);

      TimeFormatValueConverter = (function () {
        function TimeFormatValueConverter() {
          _classCallCheck(this, TimeFormatValueConverter);
        }

        _createClass(TimeFormatValueConverter, [{
          key: 'toView',
          value: function toView(value) {
            return moment(value).format('h:mm a');
          }
        }]);

        return TimeFormatValueConverter;
      })();

      _export('TimeFormatValueConverter', TimeFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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d0I7OztxQkFBeEIsd0JBQXdCOztpQkFDN0IsZ0JBQUMsS0FBSyxFQUFFO0FBQ1osbUJBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztXQUN2Qzs7O2VBSFUsd0JBQXdCIiwiZmlsZSI6InJlcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcbmltcG9ydCAnZmV0Y2gnO1xuXG5AaW5qZWN0KEh0dHBDbGllbnQpXG5leHBvcnQgY2xhc3MgUmVwb3J0e1xuICBjb25zdHJ1Y3RvcihodHRwKXtcbiAgICB0aGlzLmhlYWRpbmcgPSAnUmVwb3J0cyc7XG4gICAgdGhpcy5lbnRyeURheXMgPSBbXTtcbiAgICB0aGlzLmVudHJ5RGF5c0Zvcm1hdHRlZCA9IFtdO1xuICAgIHRoaXMuc2hvd0Zvb2QgPSBmYWxzZTtcblxuICAgIC8vaW5pdGlhbGl6ZSBodHRwIGNsaWVudCBmb3IgYWpheHkgcmVxdWVzdHNcbiAgICBodHRwLmNvbmZpZ3VyZShjb25maWcgPT4ge1xuICAgICAgY29uZmlnXG4gICAgICAgIC51c2VTdGFuZGFyZENvbmZpZ3VyYXRpb24oKVxuICAgICAgICAvLy53aXRoSGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpXG4gICAgICAgIC53aXRoQmFzZVVybCgnaHR0cDovL3N1Z2Fycy1hcGkuaGVyb2t1YXBwLmNvbS9hcGkvJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmh0dHAgPSBodHRwO1xuXG4gICAgdGhpcy5odHRwLmZldGNoKCdlbnRyeScpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihlbnRyaWVzID0+IHtcbiAgICAgICAgdGhpcy5lbnRyaWVzID0gZW50cmllcztcblxuICAgICAgICB2YXIgaG91ciA9IDE7IC8vZmFraW5nIGVudHJ5RGF0ZSBiZWNhdXNlIEFQSSBkb2Vzbid0IHN1cHBvcnQgaXQgeWV0XG4gICAgICAgIHZhciBkYXkgPSAxO1xuXG4gICAgICAgIGZvciAodmFyIGVudHJ5IG9mIHRoaXMuZW50cmllcykge1xuICAgICAgICAgIGVudHJ5LmV4ZXJjaXNlQ2FyYnMgPSBNYXRoLnJvdW5kKGVudHJ5LmV4ZXJjaXNlQ2FyYnMpO1xuICAgICAgICAgIGVudHJ5LmdsdWNvc2VMZXZlbCA9IE1hdGgucm91bmQoZW50cnkuZ2x1Y29zZUxldmVsKTtcbiAgICAgICAgICBlbnRyeS5pbnN1bGluU2hvcnQgPSBNYXRoLnJvdW5kKGVudHJ5Lmluc3VsaW5TaG9ydCk7XG4gICAgICAgICAgZW50cnkuZm9vZEFkanVzdCA9IDA7XG4gICAgICAgICAgXG4gICAgICAgICAgaG91ciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpICsgMTsgLy9mYWtpbmcgZW50cnlEYXRlXG4gICAgICAgICAgZGF5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxO1xuICAgICAgICAgIGVudHJ5LmVudHJ5RGF0ZSA9ICcyMDE1LTA0LScgKyBkYXkgKyAnIDEnICsgaG91ciArICc6MTc6NDMnO1xuXG4gICAgICAgICAgZm9yICh2YXIgZm9vZCBvZiBlbnRyeS5mb29kSXRlbXMpIHtcbiAgICAgICAgICAgIGZvb2QucXVhbnRpdHkgPSBNYXRoLnJvdW5kKGZvb2QucXVhbnRpdHkpO1xuICAgICAgICAgICAgZW50cnkuZm9vZEFkanVzdCArPSAoZm9vZC5xdWFudGl0eSAqIGZvb2QuY2FyYnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlbnRyeS5nbHVjb3NlTGV2ZWwgPCA0KSB7XG4gICAgICAgICAgICBlbnRyeS5sZXZlbEtleXdvcmQgPSBcImxvd1wiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZW50cnkuZ2x1Y29zZUxldmVsID4gOSkge1xuICAgICAgICAgICAgZW50cnkubGV2ZWxLZXl3b3JkID0gXCJoaWdoXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVudHJ5LmxldmVsS2V5d29yZCA9IFwiaWRlYWxcIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmVudHJpZXMuc3BsaWNlKDYsIHRoaXMuZW50cmllcy5sZW5ndGgpOyAvL2Zha2luZyB0aGUgbGVuZ3RoIG9mIHRoZSBhcnJheVxuXG4gICAgICAgICAgdGhpcy5lbnRyeURheXMucHVzaChtb21lbnQoZW50cnkuZW50cnlEYXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc29ydEJ5RGF0ZUFzYyA9IGZ1bmN0aW9uIChsaHMsIHJocykge1xuICAgICAgICAgIHJldHVybiBsaHMgPiByaHMgPyAxIDogbGhzIDwgcmhzID8gLTEgOiAwO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZW50cnlEYXlzLnNvcnQoc29ydEJ5RGF0ZUFzYyk7XG5cbiAgICAgICAgdGhpcy5lbnRyeURheXNGb3JtYXR0ZWQgPSB0aGlzLmVudHJ5RGF5cy5tYXAoZnVuY3Rpb24oZGF5KXtcbiAgICAgICAgICByZXR1cm4gbW9tZW50KGRheSkuZm9ybWF0KCdkZGQgRCBNTU0nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2VkaXRlZCBlbnRyaWVzJywgdGhpcy5lbnRyaWVzKTtcbiAgICB9KTtcblxuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIERheUZpbHRlclZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KGFycmF5LCBkYXlGaWx0ZXIpIHtcbiAgICByZXR1cm4gYXJyYXkuZmlsdGVyKGZ1bmN0aW9uKGVudHJ5KXtcbiAgICAgIGlmIChtb21lbnQoZW50cnkuZW50cnlEYXRlKS5mb3JtYXQoJ2RkZCBEIE1NTScpID09PSBkYXlGaWx0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRpbWVGb3JtYXRWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyh2YWx1ZSkge1xuICAgIHJldHVybiBtb21lbnQodmFsdWUpLmZvcm1hdCgnaDptbSBhJyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
