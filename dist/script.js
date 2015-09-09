(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// React Router requirements.
var Router = window.ReactRouter;
var Route = window.ReactRouter.Route;
var RouteHandler = window.ReactRouter.RouteHandler;

var Main = require('./Main/Main.jsx');

var App = React.createClass({displayName: "App",
  render: function() {
    return (
      React.createElement(RouteHandler, null)
    );
  }
});

var routes = (
  React.createElement(Route, {handler: App}, 
    React.createElement(Route, {handler: Main})
  )
);

// Router.run(routes,(Root) => {
//   React.render(<Root/>, document.body);
// });

window.onload = function() {
  Router.run(routes, function (Handler) {
    // console.log(document.getElementById('content'));
    // React.render(<Handler/>, document.body);
    React.render(React.createElement(Handler, null), document.getElementById('content'));
  });
}

},{"./Main/Main.jsx":5}],2:[function(require,module,exports){
// Properties: 
  
  // Square fit picture.
  // Four sub pictures with padding.

  // Local or external link.
  // 



var Card = React.createClass({displayName: "Card",
  render: function() {
    return (
      React.createElement("div", {className: "card"}, "Card")
    );
  }
});

module.exports = Card;

},{}],3:[function(require,module,exports){
var Card = require('../Card/Card.jsx');

var Cards = React.createClass({displayName: "Cards",
  render: function() {
    return (
      React.createElement("div", {className: "cards"}, 
        "Cards", 
        React.createElement(Card, null), 
        React.createElement(Card, null), 
        React.createElement(Card, null)
      )
    );
  }
});

module.exports = Cards;

},{"../Card/Card.jsx":2}],4:[function(require,module,exports){
var Footer = React.createClass({displayName: "Footer",
  render: function() {
    return (
      React.createElement("div", {id: "footer"}, 
        "Footer"
      )
    );
  }
});

module.exports = Footer;

},{}],5:[function(require,module,exports){
var Cards = require('../Cards/Cards.jsx');
var Footer = require('../Footer/Footer.jsx');

var Main = React.createClass({displayName: "Main",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("div", null, "Main Card"), 
        React.createElement(Cards, null), 
        React.createElement(Footer, null)
      )
    );
  }
});

module.exports = Main;

},{"../Cards/Cards.jsx":3,"../Footer/Footer.jsx":4}]},{},[1]);
