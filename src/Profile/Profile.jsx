var Profile = React.createClass({
  render: function() {
    return (
      <div id="profile">
        <div>
          <div id="profile-image"></div>
          <div id="icons-holder">

<a href="https://www.linkedin.com/in/hdavidzhu" target="_blank"><div className="sq-icon" id="linkedin"></div></a>
<a href="https://github.com/hdavidzhu" target="_blank"><div className="sq-icon" id="github"></div></a>
<a href="https://medium.com/@hdavidzhu/" target="_blank"><div className="sq-icon" id="medium"></div></a>
<a href="https://twitter.com/hdavidzhu" target="_blank"><div className="sq-icon" id="twitter"></div></a>
<a href="mailto:HelloDavidZhu@gmail.com" target="_blank"><div className="sq-icon" id="email"></div></a>

          </div>
        </div>

        <div id="profile-text-content">
          <div id="profile-title">DAVID ZHU</div>
        </div>

      </div>
    );
  }
});

module.exports = Profile;
