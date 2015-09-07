var Cards = require('../Cards/Cards.jsx');
var Footer = require('../Footer/Footer.jsx');

var Main = React.createClass({
  render: function() {
    return (
      <div>
        <div> Hello world! </div>
        <Cards></Cards>
        <Footer></Footer>
      </div>
    );
  }
});

module.exports = Main;