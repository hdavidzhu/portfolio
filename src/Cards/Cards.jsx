var Card = require('../Card/Card.jsx');

var Cards = React.createClass({

  mixins: [ Router.State ],

  getInitialState: function() {
    return {
          
    };
  },

  componentDidMount: function() {
    var _this = this;
    var currentRoute = _this.getPathname();
    console.log(currentRoute);
    _this._loadFromPath(currentRoute);
    
    // First, determine which route the information came form.

    // Then, load the slides in that document and card to render.

  },

  _loadFromPath: function(route) {

  }

  render: function() {
    return (
      <div className="cards">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
});

module.exports = Cards;
