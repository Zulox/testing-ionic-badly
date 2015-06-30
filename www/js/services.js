angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('UserService', function() {
  var UserCred;
    
 return UserCred;
  
})    


.service('IPaddress', function() {

    this.returnIP = function(){
      var ipad="192.168.0.107";
        return ipad;
    }
})

.service('GetCred', function( $http , $q, IPaddress) {
    
    
    this.getCredential = function(name, pw)
    {
   
    var deferred = $q.defer();  
     $http.post('http://'+IPaddress.returnIP()+'/JavaBank/Webservice/Webservice.php?action=login',
               {'user_name'     : name, 
                'pass_word'     : pw      
               })
     .success(function (data)
      {
     deferred.resolve(data);
     })
     .error(function (data)
     {
    console.log("error");      
     deferred.reject();
     }); 
        return deferred.promise;
    
    }    
})


.factory('TransactionsHistory', function($http , $q, IPaddress , UserService) {

    var transactionDetail;
    var DataHold;
   
        
    function getTransaction(Ttypes){
     var deferred = $q.defer();
        console.log(Ttypes);
        
         $http.post('http://'+IPaddress.returnIP()+'/JavaBank/Webservice/Webservice.php?action=GetTransaction',
               {'user_account'     : UserService.UserCred.ACC_ID,
                'Tran_Type'        : Ttypes
               })
          
        .success(function (data){
         deferred.resolve (data);
      // console.log(UserService.UserCred.ACC_ID);
         DataHold = data;     
        }); 
        
        return deferred.promise;
    }
    
    function setTransactionID(tranID){
    transactionDetail = tranID;
        
      for (var i = 0; i < DataHold.length; i++) {
         
        if (DataHold[i].TranID == tranID) {
           // console.log(DataHold[i]);
            return DataHold[i];
        }
      }
        
    }
    return{
        getTransaction : getTransaction,
        setTransactionID : setTransactionID
    }; 
    
    
})

.factory('BankingShit', function($http , $q, IPaddress , UserService) {
    
         var deferred = $q.defer();
        
      function ProceedBanking(CtrlScope){
          
          
         $http.post('http://'+IPaddress.returnIP()+'/JavaBank/Webservice/Webservice.php?action=Banking',
               {'user_ID'          : UserService.UserCred.ID,
                'user_account'     : UserService.UserCred.ACC_ID,
                'bank_desc'        : CtrlScope.desc,
                'bank_amount'      : CtrlScope.amount,
                'bank_type'        : CtrlScope.Trantype,
                'bank_receiver'    : CtrlScope.receiver,
                'bank_Specific'    : CtrlScope.SpecificType
               })
          
        .success(function (data){
         deferred.resolve (data);
         console.log(data);   
        }); 
        
        return deferred.promise;
      }
          
    return{
        ProceedBanking : ProceedBanking
    };
})

;
