var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __React;
var DemoProps = (function () {
    function DemoProps() {
    }
    return DemoProps;
})();
var Demo = (function (_super) {
    __extends(Demo, _super);
    function Demo(props) {
        _super.call(this, props);
        this.foo = 42;
    }
    Demo.prototype.render = function () {
        return (<div>Hello world!</div>);
    };
    return Demo;
})(React.Component);
