// React Router requirements.
var Router = window.ReactRouter;
var Route = window.ReactRouter.Route;
var DefaultRoute = window.ReactRouter.DefaultRoute;
var RouteHandler = window.ReactRouter.RouteHandler;

var Main = require('./Main/Main.jsx');
var Expansion = require('./Expansion/Expansion.jsx');

var Footer = require('./Footer/Footer.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <RouteHandler></RouteHandler>
        <Footer></Footer>
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
