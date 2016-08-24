(function ($, cartoes) {
    'use strict';
    function salvaNovoCartao(evento) {
        evento.preventDefault();
        var conteudo = $('.novoCartao-conteudo', this);
        var digitado = conteudo.val().trim().replace(/\n/g, '<br>').replace(/\*\*([\w ]+)\*\*/g, '<strong>$1</strong>');
        if (digitado) {
            var cartao = {
                conteudo: digitado
            };
            cartoes.cria(cartao);
        }
        $(document).trigger('precisaSincronizar');
        conteudo.val('');
        conteudo.focus();
    }
    $('.novoCartao').submit(salvaNovoCartao);
}(jQuery, controladorDeCartoes));