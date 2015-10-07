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

},{"./Expansion/Expansion.jsx":4,"./Footer/Footer.jsx":5,"./Main/Main.jsx":6}],2:[function(require,module,exports){
var Card = React.createClass({displayName: "Card",

  mixins: [ Router.Navigation ],

  onEnter: function() {
    console.log("entered");
    this.forceUpdate();
  },

  componentDidMount: function() {
    var _this = this;
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
        onClick: _this._goToExpansion}, 
        React.createElement("div", {className: "card-blurb"}, _this.props.content.blurb)
      )
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
    var currentTopic = _this.props.topic;
    var cardsToRender = CardContent[currentTopic];
    var content;

    var cards = [];
    for (cardIndex in cardsToRender) {
      content = cardsToRender[cardIndex];
      cards[cardIndex] = React.createElement(Card, {content: content})
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

  mixins: [ Router.State, Router.Navigation ],

  getInitialState: function() {
    return {
      content: ""
    };
  },

  componentWillReceiveProps: function() {
    this._update();
  },

  componentDidMount: function() {
    this._update();
  },

  _update: function() {
    var _this = this;
    var document_id = _this.getParams().expansionID;
    $.ajaxSetup({ cache: false });
    $.get('/markdown/' + document_id + '.md', function(data) {
      _this.state.content = marked(data);
      _this.setState(_this.state);
    });
  },

  _goToNext: function() {
    var _this = this;
    var currentRoute = _this.getPathname();
    var cards;

    if (currentRoute.indexOf('exp') > -1) {
      cards = CardContent['/'];
    }

    var cardIndex;
    var expansionID = _this.getParams().expansionID;
    for(var i = 0, len = cards.length; i < len; i++) {
      if (cards[i].link === expansionID) {
        cardIndex = i;
        break;
      }
    }

    var nextLink;
    if (cardIndex === cards.length - 1) {
      nextLink = cards[0].link;
    } else {
      nextLink = cards[cardIndex + 1].link;
    }

    console.log(nextLink);
    this.transitionTo('expansion', {
      expansionID: nextLink
    });
  },

  render: function() {
    var _this = this
    var test = this.getParams();

    return (
      React.createElement("div", {className: "expansion"}, 
        React.createElement("div", {className: "expansion-content"}, 
          React.createElement("div", {className: "expansion-header"}, 
            React.createElement("a", {href: "#"}, "― DAVID ZHU ―")
          ), 

          React.createElement("div", {dangerouslySetInnerHTML: {__html: _this.state.content}}), 

          React.createElement("div", {className: "expansion-footer"}, 
            React.createElement("a", {href: "/"}, "← HOME"), 
            React.createElement("span", {onClick: _this._goToNext}, "NEXT →")
          )
        )
      )
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
var Profile = require('../Profile/Profile.jsx');
var Cards = require('../Cards/Cards.jsx');

var Main = React.createClass({displayName: "Main",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(Profile, null), 
        React.createElement("div", {className: "section-header"}, "Work"), 
        React.createElement(Cards, {topic: "work"}), 
        React.createElement("div", {className: "section-header"}, "Projects"), 
        React.createElement(Cards, {topic: "projects"})
      )
    );
  }
});

module.exports = Main;

},{"../Cards/Cards.jsx":3,"../Profile/Profile.jsx":7}],7:[function(require,module,exports){
var Profile = React.createClass({displayName: "Profile",
  render: function() {
    return (
      React.createElement("div", {id: "profile"}, 
        React.createElement("div", null, 
          React.createElement("div", {id: "profile-image"}), 
          React.createElement("div", {id: "icons-holder"}, 

React.createElement("a", {href: "https://www.linkedin.com/in/hdavidzhu", target: "_blank"}, React.createElement("div", {className: "sq-icon", id: "linkedin"})), 
React.createElement("a", {href: "https://github.com/hdavidzhu", target: "_blank"}, React.createElement("div", {className: "sq-icon", id: "github"})), 
React.createElement("a", {href: "https://medium.com/@hdavidzhu/", target: "_blank"}, React.createElement("div", {className: "sq-icon", id: "medium"})), 
React.createElement("a", {href: "https://twitter.com/hdavidzhu", target: "_blank"}, React.createElement("div", {className: "sq-icon", id: "twitter"})), 
React.createElement("a", {href: "mailto:HelloDavidZhu@gmail.com", target: "_blank"}, React.createElement("div", {className: "sq-icon", id: "email"}))

          )
        ), 

        React.createElement("div", {id: "profile-text-content"}, 
          React.createElement("div", {id: "profile-title"}, "DAVID ZHU"), 
          React.createElement("div", {id: "profile-description"}, "Student @ Olin College of Engineering"), 
          React.createElement("div", {id: "profile-description"}, "Dev and Design Intern @ PillPack, Involution Studios")
        )

      )
    );
  }
});

module.exports = Profile;

},{}]},{},[1]);
