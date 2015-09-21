var Card = React.createClass({

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
      <div
        className="card"
        style={cardStyle}
        onClick={_this._goToExpansion}
      ></div>
    );
  }
});

module.exports = Card;
