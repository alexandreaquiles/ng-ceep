angular.module('ceep')
.controller('CartoesController', function ($scope, $http) {
  var CEEP_URL = 'http://ceep.herokuapp.com/cartoes';
  var usuario = 'fulano@bol.com.br';

  $scope.cores = [{ nome: "Padrão", codigo: "#EBEF40"},
               {nome: "Importante", codigo: "#F05450"},
               {nome: "Tarefa", codigo: "#92C4EC"},
               {nome: "Inspiração", codigo: "#76EF40"}];

  $scope.decideTipoCartao = function (texto) {
      var quebras, textoSemQuebras, letras, palavras, maiorPalavra, tamanhoMaiorPalavra;
      quebras = texto.split('<br>').length - 1;
      textoSemQuebras = texto.replace(/<br>/g, '');
      letras = textoSemQuebras.length;
      palavras = texto.replace(/<br>/g, ' ').split(' ');
      maiorPalavra = '';
      angular.forEach(palavras, function (palavra) {
          if (palavra.length > maiorPalavra.length) {
              maiorPalavra = palavra;
          }
      });
      tamanhoMaiorPalavra = maiorPalavra.length;
      if (quebras < 5 && letras < 55 && tamanhoMaiorPalavra < 9) {
          return 'cartao--textoGrande';
      } else if (quebras < 6 && letras < 75 && tamanhoMaiorPalavra < 12) {
          return 'cartao--textoMedio';
      } else {
          return 'cartao--textoPequeno';
      }
  }

  $http.jsonp(CEEP_URL + '/carregar?callback=JSON_CALLBACK', {
    params: {
      usuario: usuario
    }
  })
  .success(function (dados) {
    $scope.cartoes = dados.cartoes;
  })
  .error(function () {
    console.error('Erro ao carregar cartões do servidor.');
  });
});
