// React Router requirements.
var Router = window.ReactRouter;
var Route = window.ReactRouter.Route;
var RouteHandler = window.ReactRouter.RouteHandler;

var Main = require('./Main/Main.jsx');

var App = React.createClass({
  render: function() {
    return (
      <RouteHandler/>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route handler={Main}></Route>
  </Route>
);

// Router.run(routes,(Root) => {
//   React.render(<Root/>, document.body);
// });

window.onload = function() {
  Router.run(routes, function (Handler) {
    // console.log(document.getElementById('content'));
    // React.render(<Handler/>, document.body);
    React.render(<Handler/>, document.getElementById('content'));
  });
}
