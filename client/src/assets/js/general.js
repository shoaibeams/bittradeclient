$(document).ready(() => {

    // $('.number').filter_input({ regex: '[0-9]' });

    // $('.capital').filter_input({ regex: '[A-Z]' });

    // $('.numberd').filter_input({ regex: '^-?[0-9]\d*\.?\d*$' });

    $('input, textarea').keydown(function (e) {
        if (e.which == 222) {
            return false;
        }
    });

})