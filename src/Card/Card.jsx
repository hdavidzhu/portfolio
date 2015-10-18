var Card = React.createClass({

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



    // TODO: Determine whether this is `work` or `project`.
    _this.transitionTo(_this.props.topic, {
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
        onClick={_this._goToExpansion}>
        <div className="card-blurb">{_this.props.content.blurb}</div>
      </div>
    );
  }
});

module.exports = Card;
