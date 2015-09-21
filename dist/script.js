(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// React Router requirements.
Router = window.ReactRouter;
Route = window.ReactRouter.Route;
DefaultRoute = window.ReactRouter.DefaultRoute;
RouteHandler = window.ReactRouter.RouteHandler;

CardContent = {};

var Main = require('./Main/Main.jsx');
var Expansion = require('./Expansion/Expansion.jsx');

var Footer = require('./Footer/Footer.jsx');

var App = React.createClass({displayName: "App",

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(RouteHandler, null)
      )
    );
  }
});

var routes = (
  React.createElement(Route, {handler: App, path: "/"}, 
    React.createElement(DefaultRoute, {handler: Main}), 
    React.createElement(Route, {name: "expansion", path: "/exp/:expansionID", handler: Expansion}
    )
  )
);

$.get('dist/content.json', function(content) {
  CardContent = content;
  Router.run(routes, function (Handler) {
    React.render(React.createElement(Handler, null), document.getElementById('content'));
  });
});

// window.onload = function() {
//   Router.run(routes, function (Handler) {
//     React.render(<Handler/>, document.getElementById('content'));
//   });
// }

},{"./Expansion/Expansion.jsx":4,"./Footer/Footer.jsx":5,"./Main/Main.jsx":6}],2:[function(require,module,exports){
var Card = React.createClass({displayName: "Card",

  mixins: [ Router.Navigation ],

  componentDidMount: function() {
    var _this = this;
    console.log("Card did mount.");

    console.log(_this.props.content);
  },

  _goToExpansion: function() {
    var _this = this;
    _this.transitionTo('expansion', {
      expansionID: _this.props.content.link
    });
  },

  render: function() {
    var _this = this;

    var cardStyle = {
      'background-image': "url('" + _this.props.content.image + "')"
    }

    return (
      React.createElement("div", {
        className: "card", 
        style: cardStyle, 
        onClick: _this._goToExpansion
      })
    );
  }
});

module.exports = Card;

},{}],3:[function(require,module,exports){
var Card = require('../Card/Card.jsx');

var Cards = React.createClass({displayName: "Cards",
  mixins: [ Router.State ],

  render: function() {
    var _this = this;
    var currentRoute = _this.getPathname();
    var cardsToRender = CardContent[currentRoute];

    var cards = [];
    for (cardIndex in cardsToRender) {
      cards[cardIndex] = React.createElement(Card, {content: cardsToRender[cardIndex]})
    }

    return (
      React.createElement("div", {className: "cards"}, 
        cards
      )
    );
  }
});

module.exports = Cards;

},{"../Card/Card.jsx":2}],4:[function(require,module,exports){
var Expansion = React.createClass({displayName: "Expansion",

  mixins: [ Router.State ],

  getInitialState: function() {
    return {
      content: ""
    };
  },

  componentDidMount: function() {
    var _this = this;
    var document_id = _this.getParams().expansionID;

    $.ajaxSetup({ cache: false });
    $.get('/markdown/' + document_id + '.md', function(data) {
      _this.state.content = marked(data);
      _this.setState(_this.state);
    });
  },

  render: function() {
    var _this = this
    var test = this.getParams();
    console.log(test);

    return (
      React.createElement("div", {className: "expansion", 
        dangerouslySetInnerHTML: {__html: _this.state.content}})
    );
  }
});

module.exports = Expansion;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
var Cards = require('../Cards/Cards.jsx');
var Footer = require('../Footer/Footer.jsx');

var Main = React.createClass({displayName: "Main",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(Cards, null)
      )
    );
  }
});

module.exports = Main;

},{"../Cards/Cards.jsx":3,"../Footer/Footer.jsx":5}]},{},[1]);
