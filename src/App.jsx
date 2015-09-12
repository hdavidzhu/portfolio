// React Router requirements.
Router = window.ReactRouter;
Route = window.ReactRouter.Route;
DefaultRoute = window.ReactRouter.DefaultRoute;
RouteHandler = window.ReactRouter.RouteHandler;

var Main = require('./Main/Main.jsx');
var Expansion = require('./Expansion/Expansion.jsx');

var Footer = require('./Footer/Footer.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <RouteHandler></RouteHandler>
      </div>
    );
  }
});

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Main}></DefaultRoute>
    <Route name="expansion" path="/exp/:expansionID" handler={Expansion}>
    </Route>
  </Route>
);

window.onload = function() {  
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
  });
}
