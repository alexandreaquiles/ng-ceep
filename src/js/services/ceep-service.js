angular.module('ceep')
.factory('ceepService', function ($http) {
  var CEEP_URL = 'http://ceep.herokuapp.com/cartoes';
  var usuario = 'fulano@bol.com.br';
  return {
    pegaInstrucoes: function () {
        return $http.get(CEEP_URL + '/instrucoes');
    },
    carregaCartoes: function () {
      return $http.jsonp(CEEP_URL + '/carregar?callback=JSON_CALLBACK', {
        params: {
          usuario: usuario
        }
      });
    },
    enviaCartoes: function (cartoes) {
      return $http.post(CEEP_URL + '/salvar', {
        usuario: usuario,
        cartoes: cartoes
      });
    }
  };
});
