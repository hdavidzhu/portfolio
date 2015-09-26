var Profile = require('../Profile/Profile.jsx');
var Cards = require('../Cards/Cards.jsx');

var Main = React.createClass({
  render: function() {
    return (
      <div>
        <Profile></Profile>
        <div className="section-header">Work</div>
        <Cards topic="work"></Cards>
        <div className="section-header">Projects</div>
        <Cards topic="projects"></Cards>
      </div>
    );
  }
});

module.exports = Main;
