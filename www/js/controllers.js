angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope , UserService) {

$scope.User = UserService.UserCred;
console.log($scope.User);
    
})

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


.controller('TransactionCtrl', function($scope ,$stateParams,  TransactionsHistory ) {
    var vm = this;
    
   TransactionsHistory.getTransaction($stateParams.child).then(function(data){
     vm.transactions = data;
       $scope.trans = vm.transactions;
       $scope.trans.titleType = $stateParams.child; 
       console.log($scope.trans.titleType);
       
   });    
})

.controller('TranDetailCtrl', function($scope, $stateParams, TransactionsHistory) {
  $scope.details = TransactionsHistory.setTransactionID($stateParams.tranDetail);
    //console.log($scope.details);
})





.controller('LoginCtrl', function($scope,UserService ,GetCred, $ionicPopup, $state) {
    $scope.data = {};
 
     $scope.logins = function() {

         
     GetCred.getCredential($scope.data.username, $scope.data.password)
        .then(function(data)
        {
            $scope.team = data;
        //  console.log($scope.team);
            
            if($scope.team.status != true)
            {
                var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
                });
            }
            else
            {
                UserService.UserCred = $scope.team ;
                $state.go('tab.dash');
                $scope.yolo =  UserService.UserCred;
                console.log($scope.yolo);
            }
            
        
            
     }) 
  
     }
})

.controller('BankLocalCtrl', function($scope, BankingShit) {
 $scope.data = {};
 $scope.data.Trantype = 'Transfer : Local Transfer';
 $scope.data.SpecificType = 'Local';     
    
 $scope.PerformTrans = function() {
 
     BankingShit.ProceedBanking($scope.data)
        .then(function(data){
         
         
        })
 }

})

.controller('BankInterbankCtrl', function($scope, BankingShit) {
 $scope.data = {};
 $scope.data.Trantype = 'Transfer : Interbank Transfer';
 $scope.data.SpecificType = 'Interbank';     
    
 $scope.PerformTrans = function() {
 
     BankingShit.ProceedBanking($scope.data)
        .then(function(data){
         
         
        })
 }

})



.controller('BankBillCtrl', function($scope, $stateParams, BankingShit) {
 $scope.data = {};
 
 $scope.options = [
     { label: 'Phone' , value: '10001233'  },
     { label: 'Food' , value: '10001234'  },
     { label: 'Electricity', value: '10001235'  },
     { label: 'Water' , value: '10001236'  }, 
  ];

$scope.data.TranSelect  = $scope.options[0];   
$scope.data.receiver = $scope.data.TranSelect.value; 
$scope.data.Trantype = 'Bill : '+$scope.data.TranSelect.label;    
$scope.data.SpecificType = $scope.data.TranSelect.label;     
    
        $scope.change = function() {
         $scope.data.receiver = $scope.data.TranSelect.value; 
         $scope.data.Trantype = 'Bill : '+$scope.data.TranSelect.label;
         $scope.data.SpecificType = $scope.data.TranSelect.label; 
        
            console.log($scope.data.SpecificType);
        };

    
    
 $scope.PerformTrans = function() {
 
    BankingShit.ProceedBanking($scope.data)
        .then(function(data){
     
        })
        }
       
})
;
