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
    React.createElement(Route, {name: "work", path: "/work/:expansionID", handler: Expansion}
    ), 
    React.createElement(Route, {name: "projects", path: "/projects/:expansionID", handler: Expansion}
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
    this.forceUpdate();
  },

  componentDidMount: function() {
    var _this = this;
  },

  _goToExpansion: function() {
    var _this = this;



    // TODO: Determine whether this is `work` or `project`.
    _this.transitionTo(_this.props.topic, {
      expansionID: _this.props.content.link
    });
  },

  render: function() {
    var _this = this;

    var cardStyle = {
      'backgroundImage': "url('dist/" + _this.props.content.image + "')"
    }
    console.log(cardStyle);

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
      cards[cardIndex] = React.createElement(Card, {content: content, topic: _this.props.topic})
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
var unlisten;
var Expansion = React.createClass({displayName: "Expansion",

  mixins: [ Router.State, Router.Navigation ],

  getInitialState: function() {
    return {
      content: "",
      meta: {}
    };
  },

  componentWillReceiveProps: function() {
    this._update();
  },

  componentDidMount: function() {
    this._update();
  },

  componentWillUnmount: function() {
    // unlisten();
  },

  _update: function() {
    var _this = this;
    var document_id = _this.getParams().expansionID;
    $.ajaxSetup({ cache: false });
    $.get('/markdown/' + document_id + '.md', function(data) {
      _this.state.content = marked(data);
      _this.state.meta = _this._findIdInTree(document_id, CardContent);
      _this.setState(_this.state);
    });
  },

  // Might be an overkill.
  _findIdInTree: function(inputId, chosenObject) {
    var _this = this;
    var result;

    if (chosenObject.id === inputId) {
      return chosenObject;
    } else {
      for (var key in chosenObject) {
        if (chosenObject[key] instanceof Array) {
          for (var arrElIndex in chosenObject[key]) {
            result = _this._findIdInTree(inputId, chosenObject[key][arrElIndex]);
            if (result) { return result; }
          }
        } else if (chosenObject[key] instanceof Object) {
          result = _this._findIdInTree(inputId, chosenObject[key]);
          if (result) { return result; }
        }
      }
    }
  },

  _goToNext: function() {
    var _this = this;
    var currentRoute = _this.getPathname();
    var cards;
    var cardType;

    // TODO: Refactor in the future.
    // If the string `exp` is present,
    if (currentRoute.indexOf('work') > -1) {
      // This parts also makes the decision of which branch to choose.
      cards = CardContent['work'];
      cardType = 'work';
    } else if (currentRoute.indexOf('projects') > -1) {
      cards = CardContent['projects'];
      cardType = 'projects';
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

    this.transitionTo(cardType, {
      expansionID: nextLink
    });
  },

  render: function() {
    var _this = this;

    return (
      React.createElement("div", {className: "expansion"}, 
        React.createElement("div", {className: "expansion-content"}, 
          React.createElement("div", {className: "expansion-header"}, 
            React.createElement("a", {href: "#"}, "― DAVID ZHU ―")
          ), 

          React.createElement("h1", null, _this.state.meta.title), 
          React.createElement("i", null, React.createElement("div", null, _this.state.meta.date), 
          React.createElement("div", null, _this.state.meta.position)), 

          React.createElement("div", {dangerouslySetInnerHTML: {__html: _this.state.content}}), 

          React.createElement("div", {className: "expansion-footer"}, 
            React.createElement("a", {href: "#"}, "← HOME"), 
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
        React.createElement("div", {className: "section-header"}, "WORK"), 
        React.createElement(Cards, {topic: "work"}), 
        React.createElement("div", {className: "section-header"}, "PROJECTS"), 
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
          React.createElement("div", {id: "profile-image"})
        ), 

        React.createElement("div", {id: "profile-text-content"}, 
          React.createElement("div", {id: "profile-title"}, "Hi, I'm David!"), 
          React.createElement("div", {id: "profile-description"}, 
            "Currently a developer intern at ", React.createElement("b", null, React.createElement("a", {href: "https://www.pillpack.com/"}, "PillPack")), "." + ' ' +
            "Also student at ", React.createElement("b", null, React.createElement("a", {href: "https://www.olin.edu/"}, "Olin College of Engineering")), "."
          ), 
          React.createElement("div", {id: "icons-holder"}, 

React.createElement("a", {href: "dist/resume.pdf", target: "_blank"}, React.createElement("div", {className: "sq-icon", id: "resume"})), 
React.createElement("a", {href: "https://www.linkedin.com/in/hdavidzhu", target: "_blank"}, React.createElement("div", {className: "sq-icon", id: "linkedin"})), 
React.createElement("a", {href: "https://github.com/hdavidzhu", target: "_blank"}, React.createElement("div", {className: "sq-icon", id: "github"})), 
React.createElement("a", {href: "https://medium.com/@hdavidzhu/", target: "_blank"}, React.createElement("div", {className: "sq-icon", id: "medium"})), 
React.createElement("a", {href: "https://twitter.com/hdavidzhu", target: "_blank"}, React.createElement("div", {className: "sq-icon", id: "twitter"})), 
React.createElement("a", {href: "mailto:HelloDavidZhu@gmail.com", target: "_blank"}, React.createElement("div", {className: "sq-icon", id: "email"}))

          )
        )
      )
    );
  }
});

module.exports = Profile;

},{}]},{},[1]);
