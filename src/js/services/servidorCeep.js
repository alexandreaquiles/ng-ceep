var servidorCeep = (function ($) {
    'use strict';
    var CEEP_URL = 'http://ceep.herokuapp.com/cartoes';
    var usuario = 'fulano@bol.com.br';
    function pegaInstrucoes(callback) {
        $.get(CEEP_URL + '/instrucoes', callback);
    }
    function carregaCartoes(callback) {
        $.getJSON(CEEP_URL + '/carregar?callback=?', {usuario: usuario}, callback);
    }
    function enviaCartoes(cartoes, callbacks) {
        var dados = {
            cartoes: cartoes,
            usuario: usuario
        };
        $.ajax({
            url: CEEP_URL + '/salvar',
            method: 'POST',
            data: dados,
            success: callbacks.success,
            error: callbacks.error,
            complete: callbacks.complete
        });
    }
    return {
        pegaInstrucoes: pegaInstrucoes,
        carregaCartoes: carregaCartoes,
        enviaCartoes: enviaCartoes
    };
}(jQuery));