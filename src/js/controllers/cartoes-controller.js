angular.module('ceep')
.controller('CartoesController', function ($scope, $http, ceepService) {

  var CEEP_URL = 'http://ceep.herokuapp.com/cartoes';
  var usuario = 'fulano@bol.com.br';

  $scope.esperando = false;
  $scope.sincronizado = false;
  $scope.deuRuim = false;
  $scope.novoCartao = {};
  $scope.clicouAjuda = false;
  $scope.cores = [{ nome: "Padrão", codigo: "#EBEF40"},
               {nome: "Importante", codigo: "#F05450"},
               {nome: "Tarefa", codigo: "#92C4EC"},
               {nome: "Inspiração", codigo: "#76EF40"}];

  ceepService.carregaCartoes()
  .success(function (dados) {
    $scope.cartoes = dados.cartoes;
  })
  .error(function () {
    console.error('Erro ao carregar cartões do servidor.');
  });

  $scope.tipo = decideTipo;

  $scope.sincroniza = function () {
    $scope.$emit('precisaSincronizar');
  }

  $scope.salvaNovo = function () {
    var novoCartao = $scope.novoCartao;
    novoCartao.conteudo = trataConteudoCartao(novoCartao.conteudo);
    $scope.cartoes.unshift(novoCartao);
    $scope.$emit('precisaSincronizar');
    $scope.$emit('novoCartao-salvo');
    $scope.novoCartao = {};
  }

  $scope.buscaAjuda = function () {
    if (! $scope.clicouAjuda) {
      ceepService.pegaInstrucoes()
      .success(function (dados) {
        angular.forEach(dados.instrucoes, function (cartao) {
          $scope.cartoes.unshift(cartao);
        });
      });
      $scope.clicouAjuda = true;
    }
  }

  $scope.remove = function (cartao) {
    var indiceCartao = $scope.cartoes.indexOf(cartao);
    $scope.cartoes.splice(indiceCartao, 1);
    $scope.$emit('precisaSincronizar');
  }

  $scope.mudaCor = function (cartao, cor) {
    cartao.cor = cor.codigo
    $scope.$emit('precisaSincronizar');
  }

  $scope.$on('precisaSincronizar', function () {
    $scope.esperando = true;
    $scope.sincronizado = false;
    $scope.deuRuim = false;

    ceepService.enviaCartoes($scope.cartoes)
    .success(function () {
      $scope.sincronizado = true;
    })
    .error(function () {
      $scope.deuRuim = true;
    })
    .finally(function () {
      $scope.esperando = false;
    });
  });

  function trataConteudoCartao (texto) {
    return texto.replace(/\n/g, '<br>').replace(/\*\*([\w ]+)\*\*/g, '<strong>$1</strong>');
  }

  function decideTipo (texto) {
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
          return 'G';
      } else if (quebras < 6 && letras < 75 && tamanhoMaiorPalavra < 12) {
          return 'M';
      } else {
          return 'P';
      }
  }

});
