var Cards = require('../Cards/Cards.jsx');
var Footer = require('../Footer/Footer.jsx');

var Main = React.createClass({
  render: function() {
    return (
      <div>
        <Cards></Cards>
      </div>
    );
  }
});

module.exports = Main;