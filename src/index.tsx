// try { import React = __React; } catch(e) {}
import React = require("react");

// React Router requirements.
var Router = ReactRouter;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

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
