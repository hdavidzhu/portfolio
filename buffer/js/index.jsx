var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// try { import React = __React; } catch(e) {}
var React = require("react");
// React Router requirements.
var Router = ReactRouter;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
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
