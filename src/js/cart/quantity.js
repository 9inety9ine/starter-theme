// cart quantity
$(document).on('click', 'body.page-cart .increment', function(){
    var current_val = $(this).parent().find('input[type=number]').val();
    if ($(this).hasClass('down')) {
        $(this).parent().find('input[type=number]').val( function(i, oldval) {
            return --oldval;
        });
        --current_val;
    }
    if ($(this).hasClass('up')) {
        $(this).parent().find('input[type=number]').val( function(i, oldval) {
            return ++oldval;
        });
        ++current_val;
    }
    var current_id = $(this).parent().data('item-id');
    var data = { updates: {} };
    data.updates[current_id] = current_val;
    jQuery.ajax({
        type: 'POST',
        url: '/cart/update.js',
        data: data,
        dataType: 'json',
        success: function() { 
            location.href = '';
        }
    });
});