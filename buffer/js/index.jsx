// import React = __React;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// React Router requirements.
var Router = window.ReactRouter;
var Route = window.ReactRouter.Route;
var RouteHandler = window.ReactRouter.RouteHandler;
var Main = require('./Main/Main.jsx');
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        return (<RouteHandler />);
    };
    return App;
})(React.Component);
var routes = (<Route handler={App}>
    <Route handler={Main}/>
  </Route>);
Router.run(routes, function (Handler) {
    React.render(<Handler />, document.getElementById('content'));
});
