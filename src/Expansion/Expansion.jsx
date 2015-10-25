var unlisten;
var Expansion = React.createClass({

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
      <div className="expansion">
        <div className="expansion-content">
          <div className="expansion-header">
            <a href="#">― DAVID ZHU ―</a>
          </div>

          <h1>{_this.state.meta.title}</h1>
          <i><div>{_this.state.meta.date}</div>
          <div>{_this.state.meta.position}</div></i>

          <div dangerouslySetInnerHTML={{__html: _this.state.content}}></div>

          <div className="expansion-footer">
            <a href="#">← HOME</a>
            <span onClick={_this._goToNext}>NEXT →</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Expansion;
