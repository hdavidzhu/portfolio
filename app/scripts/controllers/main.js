'use strict';

/**
 * @ngdoc function
 * @name hdavidzhugithubioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hdavidzhugithubioApp
 */
angular.module('hdavidzhugithubioApp')
  .controller('MainCtrl', function ($scope) {
    // $scope.todos = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    $scope.todos = [];

    $scope.addTodo = function () {
  		$scope.todos.push($scope.todo);
  		$scope.todo = '';
		};

		$scope.removeTodo = function (index) {
  		$scope.todos.splice(index, 1);
		};

  });

