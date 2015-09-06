// import React = __React;

// React Router requirements.
var Router = window.ReactRouter;
var Route = window.ReactRouter.Route;
var RouteHandler = window.ReactRouter.RouteHandler;

var Main = require('./Main/Main.jsx');

class App extends React.Component<any, any> {
  render() {
    return (
      <RouteHandler/>
    );
  }
}

var routes = (
  <Route handler={App}>
    <Route handler={Main} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
