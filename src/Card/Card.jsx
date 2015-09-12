var Card = React.createClass({
  
  mixins: [ Router.Navigation ],

  

  _goToExpansion: function() {
    // console.log("Clicking on this link.");
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
