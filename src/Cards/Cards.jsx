var Card = require('../Card/Card.jsx');

var Cards = React.createClass({
  mixins: [ Router.State ],

  render: function() {
    var _this = this;
    var currentTopic = _this.props.topic;
    var cardsToRender = CardContent[currentTopic];
    var content;

    var cards = [];
    for (cardIndex in cardsToRender) {
      content = cardsToRender[cardIndex];
      cards[cardIndex] = <Card content={content} topic={_this.props.topic}/>
    }

    return (
      <div className="cards">
        {cards}
      </div>
    );
  }
});

module.exports = Cards;
