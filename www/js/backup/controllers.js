angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})



.controller('LoginCtrl', function($scope, LoginService, GetCred, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
    
        LoginService.loginUser($scope.data.username, $scope.data.password)
   
        
        .success(function(data) {
            $state.go('tab.dash');
        })
        
        .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
    
     $scope.logins = function() {
         
         
     var promise = GetCred.getCredential($scope.data.username, $scope.data.password);
        promise.then(function(data)
        {
            $scope.team = data.data;
            console.log($scope.team);
        }
            
                    )} 
  
   
})

;
