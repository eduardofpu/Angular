'use strict';

angular.module('mutrack')
  .filter('formatPermission', function() {
    return function(input) {
      switch (input) {
        case 'ROLE_ADMIN':
          return 'Administrador';
        break;

        case 'ROLE_USER':
          return 'Usuário';
        break;

        default:
          return 'Unknown';
        break;
      };
    };

  }).filter('formatCadastro', function() {
     return function(input) {
      switch (input) {

        case 'ROLE_USER':
          return 'Clique aqui! Antes de salvar';
        break;

        default:
          return 'Unknown';
        break;

      };
    };


  });
