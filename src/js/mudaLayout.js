(function ($) {
    'use strict';
    $('#mudalayout').click(function () {
        var mural = $('.mural');
        mural.toggleClass('mural--linhas');
        if (mural.hasClass('mural--linhas')) {
            $(this).text('Blocos');
        } else {
            $(this).text('Linhas');
        }
    });
}(jQuery));