// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('tab.banking', {
      url: '/banking',
      views: {
        'tab-banking': {
          templateUrl: 'templates/tab-banking.html',
          controller: 'ChatsCtrl'
        }
      }
    })
  
    .state('tab.banking.banking-local', {
      url: '/Local',
      views: {
        'tab-banking@tab': {
          templateUrl: 'templates/banking-transfer.html',
          controller: 'BankLocalCtrl'
        }
      }
    })
  
  .state('tab.banking.banking-interbank', {
      url: '/Interbank',
      views: {
        'tab-banking@tab': {
          templateUrl: 'templates/banking-transfer.html',
          controller: 'BankInterbankCtrl'
        }
      }
    })
  
  .state('tab.banking.banking-bill', {
      url: '/Bill',
      views: {
        'tab-banking@tab': {
          templateUrl: 'templates/banking-bill.html',
          controller: 'BankBillCtrl'
        }
      }
    })
  
  
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.transaction', {
    url: '/transaction',
    views: {
      'tab-transaction': {
        templateUrl: 'templates/tab-transaction.html',
        controller: 'AccountCtrl'
      }
    }
  })
  
  .state('tab.transaction.transaction-child', {
    url: '/{child}',
    views: {
      'tab-transaction@tab': {
        templateUrl: 'templates/transaction-child.html',
        controller: 'TransactionCtrl'
      }
    }
  })
  
  
   .state('tab.transaction.transaction-child.child-detail', {
    url: '/:tranDetail',
    views: {
      'tab-transaction@tab': {
        templateUrl: 'templates/transaction-child-detail.html',
        controller: 'TranDetailCtrl'
      }
    }
  })
  
  ;

  // if none of the above states are matched, use this as the fallback
 $urlRouterProvider.otherwise('/login');

});
