var Expansion = React.createClass({

  mixins: [ Router.State ],

  getInitialState: function() {
    return {
      content: ""   
    };
  },

  componentDidMount: function() {
    var _this = this;
    var document_id = _this.getParams().expansionID;

    $.get('/markdown/' + document_id + '.md', function(data) {
      _this.state.content = marked(data);
      _this.setState(_this.state);
    });
  },

  render: function() {
    var _this = this
    var test = this.getParams();
    console.log(test);

    return (
      <div className="expansion" 
        dangerouslySetInnerHTML={{__html: _this.state.content}}></div>
    );
  }
});

module.exports = Expansion;
