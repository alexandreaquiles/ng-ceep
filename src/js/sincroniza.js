(function ($, ceep) {
    'use strict';
    $('#sync').click(function () {
        $(document).trigger('precisaSincronizar');
    });
    function enviaCartoesParaServidor() {
        var cartoes = [];
        $('.cartao').each(function () {
            var cartao = {};
            cartao.conteudo = $(this).find('.cartao-conteudo').html();
            cartao.cor = $(this).css('background-color');
            cartoes.push(cartao);
        });
        $('#sync').addClass('botaoSync--esperando').removeClass('botaoSync--sincronizado botaoSync--deuRuim');
        ceep.enviaCartoes(cartoes, {
            success: function (resposta) {
                $('#sync').addClass('botaoSync--sincronizado');
            },
            error: function () {
                $('#sync').addClass('botaoSync--deuRuim');
            },
            complete: function () {
                $('#sync').removeClass('botaoSync--esperando');
            }
        });
    }
    $(document).on('precisaSincronizar', enviaCartoesParaServidor);
}(jQuery, servidorCeep));
