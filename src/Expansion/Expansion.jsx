var Expansion = React.createClass({

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
      cards = CardContent['projects'];
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
      <div className="expansion">
        <div className="expansion-content">
          <div className="expansion-header">
            <a href="#">― DAVID ZHU ―</a>
          </div>

          <div dangerouslySetInnerHTML={{__html: _this.state.content}}></div>

          <div className="expansion-footer">
            <a href="/">← HOME</a>
            <span onClick={_this._goToNext}>NEXT →</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Expansion;
