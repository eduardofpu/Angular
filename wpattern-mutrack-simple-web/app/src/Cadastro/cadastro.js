'use strict';

angular.module('mutrack')
  .controller('cadastroCtrl', function($scope, ngNotify, RestSrv, SERVICE_PATH) {
    $scope.user = {};
    $scope.users = [];
    $scope.permissions = [];
    $scope.showAddEditUser = false;

    ngNotify.config({
      theme: 'pastel'
    });

      $scope.msg = 'Para se cadastrar digite  os dados requeridos nos campos abaixo!'

    // Show the form used to edit or add users.
    $scope.show = function() {
      $scope.showAddEditUser = true;
    };

    // Hide the form used to edit or add users.
    $scope.hide = function() {
      $scope.showAddEditUser = false;
      $scope.user = {};
    };

    // Manage CRUD operations.
    var userUrl = SERVICE_PATH.PRIVATE_PATH + '/usuarios';

    $scope.editUser = function(user) {
      $scope.user = angular.copy(user);
      $scope.show();
    };

    $scope.deleteUser = function(user) {
      RestSrv.delete(userUrl, user, function() {
        $scope.users.splice($scope.users.indexOf(user), 1);
        ngNotify.set('User \'' + user.name + '\' deleted.', 'success');
      });
    };


    $scope.updateLinkImageEdit = function(file){
        var arq = file.split(',');
        $scope.userEdit.mimeType = arq[0];
        $scope.userEdit.file = arq[1];
    };




    $scope.updateLinkImage = function(file){
        var arq = file.split(',');
        $scope.user.mimeType = arq[0];
        $scope.user.file = arq[1];
    };


    $scope.saveUser = function(user) {
      if (user.id) {
        RestSrv.edit(userUrl, user, function() {
          delete user.password;

          for (var i = 0; i < $scope.users.length; i++) {
            if ($scope.users[i].id === user.id) { //=== verifica id e o objeto
              $scope.users[i] = user;



            }
          }

          $scope.hide();// para esconder o forme
          ngNotify.set('User \'' + user.name + '\' updated.', 'success');
        });
      } else {
        RestSrv.add(userUrl, user, function(newUser) {
          $scope.users.push(newUser);
          $scope.hide();
          ngNotify.set('User \'' + user.name + '\' added.', 'success');
        });
      }
    };

    RestSrv.find(userUrl,function(data) {
      $scope.users = data;
      $scope.userEdit =  $scope.users[0];
      ngNotify.set('Loaded users with success.', 'success');
    });





                  // Request all data (permission and user).
                  var permissionUrl = SERVICE_PATH.PRIVATE_PATH + '/permission';


                  RestSrv.findCadastro(permissionUrl, function(data) {
                    $scope.permissions = data;
                      $scope.permissionEdit =  $scope.permissions[1]; // Busca apens o ROLE_USER

                  });





/*
    RestSrv.find(permissionUrl, function(data) {
      $scope.permissions = data;

      RestSrv.find(userUrl,function(data) {
        $scope.users = data;
        ngNotify.set('Loaded users with success.', 'success');
      });
    });


*/



  });
