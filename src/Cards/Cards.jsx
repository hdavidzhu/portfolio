var Card = require('../Card/Card.jsx');

var Cards = React.createClass({
  mixins: [ Router.State ],

  render: function() {
    var _this = this;
    var currentRoute = _this.getPathname();
    var cardsToRender = CardContent[currentRoute];
    var content;

    var cards = [];
    for (cardIndex in cardsToRender) {
      content = cardsToRender[cardIndex];
      cards[cardIndex] = <Card content={content} />
    }

    return (
      <div className="cards">
        {cards}
      </div>
    );
  }
});

module.exports = Cards;
