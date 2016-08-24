var controladorDeCartoes = (function ($) {
    'use strict';
    var numCartoes = $('.cartao').length;
    function opcoesDeCoresDoCartao(idDoCartao) {
        var cores, opcoesDeCor;
        cores = [{ nome: "Padrão", codigo: "#EBEF40"},
                 {nome: "Importante", codigo: "#F05450"},
                 {nome: "Tarefa", codigo: "#92C4EC"},
                 {nome: "Inspiração", codigo: "#76EF40"}];
        opcoesDeCor = $("<div>").addClass("opcoesDoCartao-cores");
        $.each(cores, function () {
            var cor, idRadioCor, radioCor, labelRadioCor;
            cor = this;
            idRadioCor = "cor" + cor.nome + "-" + idDoCartao;
            radioCor = $("<input>").addClass("opcoesDoCartao-radioCor").val(cor.codigo)
                .attr({type: "radio", id: idRadioCor, name: "corDoCartao" + idDoCartao});
            labelRadioCor = $("<label>").addClass("opcoesDoCartao-opcao opcoesDoCartao-cor").text(cor.nome).css("color", cor.codigo).attr("for", idRadioCor);
            opcoesDeCor.append(radioCor).append(labelRadioCor).on('change', '.opcoesDoCartao-radioCor', function () {
                $(this).closest('.cartao').css('background-color', $(this).val());
                $(document).trigger('precisaSincronizar');
            });
        });
        return opcoesDeCor;
    }
    function decideTipoCartao(texto) {
        var quebras, textoSemQuebras, letras, palavras, maiorPalavra, tamanhoMaiorPalavra;
        quebras = texto.split('<br>').length - 1;
        textoSemQuebras = texto.replace(/<br>/g, '');
        letras = textoSemQuebras.length;
        palavras = texto.replace(/<br>/g, ' ').split(' ');
        maiorPalavra = '';
        $.each(palavras, function () {
            if (this.length > maiorPalavra.length) {
                maiorPalavra = this;
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
    function removeCartao() {
        var idDoCartao, cartao;
        idDoCartao = $(this).data('cartao');
        cartao = $('#' + idDoCartao).addClass('cartao--some');
        setTimeout(function () {
            cartao.remove();
            $(document).trigger('precisaSincronizar');
        }, 500);
    }
    function criaCartao(cartao) {
        numCartoes++;
        var tipoCartao = decideTipoCartao(cartao.conteudo);
        var timer;
        var novoConteudo = $('<p>').html(cartao.conteudo).addClass('cartao-conteudo').attr('contenteditable', true)
            .on('input', function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    $(document).trigger('precisaSincronizar');
                }, 1000);
            });
        var botaoRemove = $('<button>').addClass('opcoesDoCartao-opcao opcoesDoCartao-remove').text('Remove')
            .attr('data-cartao', 'cartao_' + numCartoes).click(removeCartao);
        var opcoesDeCores = opcoesDeCoresDoCartao('cartao_' + numCartoes);
        var opcoesDoCartao = $('<div>').addClass('opcoesDoCartao').append(botaoRemove).append(opcoesDeCores);
        var novoCartao = $('<div>').addClass('cartao ' + tipoCartao).append(opcoesDoCartao).append(novoConteudo)
            .css('background-color', cartao.cor).attr('id', 'cartao_' + numCartoes).attr('draggable', true);
        if (cartao.noFim) {
            novoCartao.appendTo('.mural');
        } else {
            novoCartao.prependTo('.mural');
        }
    }
    return {
        cria: criaCartao
    };
}(jQuery));
