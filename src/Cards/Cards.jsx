var Card = require('../Card/Card.jsx');

var Cards = React.createClass({
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
