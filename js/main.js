var app = angular.module('myApp', [])
console.log('a')

// 从NPR获取音频所需的key和url
var apiKey = 'MDExODQ2OTg4MDEzNzQ5OTM4Nzg5MzFiZA001'
var nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON'
console.log('b')

// 定义控制器并注入player依赖
app.controller('PlayerController', ['$scope', '$http', 'player', function($scope, $http, player) {
  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {
    $scope.programs = data.list.story
  }).error(function(data, status) {
  })

  $scope.player = player
}])
console.log('c')

// audio依赖
app.factory('audio', ['$document', function($document) {
  var audio = $document[0].createElement('audio')
  return audio
}])
console.log('d')

// player中注入audio依赖
app.factory('player', ['audio', function(audio) {
  play = function(program){
    console.log(1)
    console.log(program)
    if(player.playing){
      player.stop()
    } else {
      var url = program.audio[0].format.mp4.$text
      player.current = program
      audio.src = url
      audio.play()
      player.playing = true
    }
  }
  stop = function(){
    if(player.playing){
      play.pause()
      player.playing = false
      player.ready = false
      player.current = null
    }
  }
  var player = {
    playing: false,
    current: null,
    ready: false,
    play: play,
    stop: stop
  }
  return player
}])
console.log('e')

// 自定义指令
app.directive('nprLink', ['player', function(player) {
   return {
     restrict: 'EA',
     require: ['^ngModel'],
     replace: true,
     scope: {
       ngModel: '=',
       play: '&'
     },
     templateUrl: '/views/nprListItem.html',
     link: function(scope, ele, attr) {
       scope.duration = scope.ngModel.audio[0].duration.$text;
       scope.player = player
     }
   } 
}])
console.log('f')

app.controller('RelatedController', ['$scope', function($scope){

}])