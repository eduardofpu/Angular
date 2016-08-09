'use strict';

var BASE_URL = 'http://localhost:8080/api';

angular.module('mutrack', ['checklist-model', 'ngNotify', 'ngRoute', 'ngCookies', 'ngStorage'])
  .constant('SERVICE_PATH', {
    'ROOT_PATH': BASE_URL,
    'PUBLIC_PATH': BASE_URL + '/public',
    'PRIVATE_PATH': BASE_URL + '/private'
  })
  .config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'src/home/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'src/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/packagee', {
        templateUrl: 'src/packagee/packagee.html',
        controller: 'PackageeCtrl'
      })
      .when('/user', {
        templateUrl: 'src/user/user.html',
        controller: 'UserCtrl'
      })
      .when('/userTable', {
        templateUrl: 'src/userTable/usertable.html',
        controller: 'UserTableCtrl'
      })
      .when('/editUser', {
          templateUrl: 'src/editUser/editUser.html',
          controller: 'editUserCtrl'
        })

      .when('/file', {
      templateUrl: 'src/file/file.html',
      controller: 'FileCtrl'
    })
    .when('/pesquisaUpload', {
      templateUrl: 'src/pesquisaUpload/pesquisaUpload.html',
      controller: 'uploadCtrl'
    })
    .when('/Cadastro', {
      templateUrl: 'src/Cadastro/cadastro.html',
      controller: 'cadastroCtrl'
    })



      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('httpRequestInterceptor');
  })
  .run(function($rootScope, ngNotify, LoginLogoutSrv) {
    $rootScope.authDetails = { name: '', authenticated: false, permissions: [] };

    ngNotify.config({
      theme: 'pastel'
    });

    LoginLogoutSrv.verifyAuth();

    })  .


      directive('appFilereader', function(
    $q
    ) {
    /*
    made by elmerbulthuis@gmail.com WTFPL licensed
    */
    var slice = Array.prototype.slice;

    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) {return;}

        ngModel.$render = function() {};
        function readFile(file) {
          var deferred = $q.defer();

          var reader = new FileReader();
          reader.onload = function(e) {
            deferred.resolve(e.target.result);
          };
          reader.onerror = function(e) {
            deferred.reject(e);
          };
          reader.readAsDataURL(file);

          return deferred.promise;
        }
        element.bind('change', function(e) {
          var element = e.target;
          if(!element.value) {return;}

          element.disabled = true;
          $q.all(slice.call(element.files, 0).map(readFile))
            .then(function(values) {
              if (element.multiple) {ngModel.$setViewValue(values);}
              else {ngModel.$setViewValue(values.length ? values[0] : null);}
              element.value = null;
              element.disabled = false;

               });
           }); //change
          } //link



    };




  }).directive('slider', function ($timeout) {
return {
 restrict: 'AE',
replace: true,
scope:{
 images: '='
},
 link: function (scope) {

 scope.currentIndex=0;

 scope.next=function(){
   if(scope.currentIndex<scope.images.length-1){
    scope.currentIndex++;
   }else{
     scope.currentIndex=0;
   }
 };

 scope.prev=function(){
   if( scope.currentIndex>0){
     scope.currentIndex--;
   }else{
     scope.currentIndex=scope.images.length-1;
   }
 };

 scope.$watch('currentIndex',function(){
   scope.image.forEach(function(image){
     image.visible=false;
   });
   scope.images[scope.currentIndex].visible=true;
 });

 /* Start: For Automatic slideshow*/

 var timer;

 var sliderFunc=function(){
   timer=$timeout(function(){
     scope.next();
     timer=$timeout(sliderFunc,5000);
   },5000);
 };

 sliderFunc();

 scope.$on('$destroy',function(){
   $timeout.cancel(timer);
 });

 /* End : For Automatic slideshow*/

},templateUrl:'src/img/img.html'
/* */




  };


});
