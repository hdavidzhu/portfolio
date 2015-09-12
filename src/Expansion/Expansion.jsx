

var Expansion = React.createClass({

  mixins: [ Router.State ],

  render: function() {
  
    var test = this.getParams();
    console.log(test);

    return (
      <div className="expansion">Expansion</div>
    );
  }
});

module.exports = Expansion;
