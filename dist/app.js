System.register(['bootstrap'], function (_export) {
  'use strict';

  var App;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_bootstrap) {}],
    execute: function () {
      App = (function () {
        function App() {
          _classCallCheck(this, App);
        }

        _createClass(App, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.title = 'Sugars';
            config.map([{ route: ['', 'entry'], name: 'entry', moduleId: 'entry', nav: true, title: 'New Entry' }, { route: 'report', name: 'report', moduleId: 'report', nav: true, title: 'Reports' }]);

            this.router = router;
          }
        }]);

        return App;
      })();

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFJYSxHQUFHOzs7Ozs7Ozs7QUFBSCxTQUFHO2lCQUFILEdBQUc7Z0NBQUgsR0FBRzs7O3FCQUFILEdBQUc7O2lCQUNDLHlCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUM7QUFDN0Isa0JBQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO0FBQ3hCLGtCQUFNLENBQUMsR0FBRyxDQUFDLENBQ1QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLEVBQUcsSUFBSSxFQUFFLE9BQU8sRUFBTyxRQUFRLEVBQUUsT0FBTyxFQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLFdBQVcsRUFBRSxFQUNsRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUcsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLFNBQVMsRUFBRSxDQUNyRixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1dBQ3RCOzs7ZUFUVSxHQUFHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYm9vdHN0cmFwJztcbi8vIGltcG9ydCAnYm9vdHN0cmFwL2Nzcy9ib290c3RyYXAuY3NzISc7XG4vLyBpbXBvcnQgJy4uL3N0eWxlcy9zdHlsZXMuY3NzISc7XG5cbmV4cG9ydCBjbGFzcyBBcHAge1xuICBjb25maWd1cmVSb3V0ZXIoY29uZmlnLCByb3V0ZXIpe1xuICAgIGNvbmZpZy50aXRsZSA9ICdTdWdhcnMnO1xuICAgIGNvbmZpZy5tYXAoW1xuICAgICAgeyByb3V0ZTogWycnLCdlbnRyeSddLCAgbmFtZTogJ2VudHJ5JywgICAgICBtb2R1bGVJZDogJ2VudHJ5JywgICAgICBuYXY6IHRydWUsIHRpdGxlOidOZXcgRW50cnknIH0sXG4gICAgICB7IHJvdXRlOiAncmVwb3J0JywgIG5hbWU6ICdyZXBvcnQnLCBtb2R1bGVJZDogJ3JlcG9ydCcsIG5hdjogdHJ1ZSwgdGl0bGU6J1JlcG9ydHMnIH1cbiAgICBdKTtcblxuICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=