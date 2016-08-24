(function ($, ceep, cartoes) {
    'use strict';
    function buscaAjuda() {
        ceep.pegaInstrucoes(function (dados) {
            $.each(dados.instrucoes, function () {
                var cartao = {
                    conteudo: this.conteudo,
                    cor: this.cor
                };
                cartoes.cria(cartao);
            });
        });
    }
    $('#ajuda').one('click', buscaAjuda);
}(jQuery, servidorCeep, controladorDeCartoes));
