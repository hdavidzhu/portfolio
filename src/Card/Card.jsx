var Card = React.createClass({
  
  mixins: [ Router.Navigation ],



  _goToExpansion: function() {
    this.transitionTo('expansion', {
      expansionID: 'hello'
    });
  },

  render: function() {
    var _this = this;
    
    return (
      <div className="card" onClick={_this._goToExpansion}></div>
    );
  }
});

module.exports = Card;
