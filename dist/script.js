(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {};

},{}],2:[function(require,module,exports){
// import React = __React;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// React Router requirements.
var Router = window.ReactRouter;
var Route = window.ReactRouter.Route;
var RouteHandler = window.ReactRouter.RouteHandler;
var Main = require('./Main/Main.jsx');
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        return (React.createElement(RouteHandler, null));
    };
    return App;
})(React.Component);
var routes = (React.createElement(Route, {handler: App}, 
    React.createElement(Route, {handler: Main})
  ));
Router.run(routes, function (Handler) {
    React.render(React.createElement(Handler, null), document.getElementById('content'));
});

},{"./Main/Main.jsx":1}]},{},[2]);
