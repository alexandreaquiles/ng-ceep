(function ($, ceep, cartoes) {
    'use strict';
    ceep.carregaCartoes(function (dados) {
        $.each(dados.cartoes, function () {
            var cartao = {
                conteudo: this.conteudo,
                cor: this.cor,
                noFim: true
            };
            cartoes.cria(cartao);
        });
    });
}(jQuery, servidorCeep, controladorDeCartoes));