var app = angular.module('myApp', [])

app.controller('MyController', function($scope) {
    $scope.person = {
      name: 'Ari Lerner'
    }
})

app.controller('PlayerController', ['$scope', function($scope){

}])

app.controller('RelatedController', ['$scope', function($scope){
  
}])