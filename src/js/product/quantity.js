// cart-drawer quantity
$(document).on('click', '#cart-drawer .increment', function(){
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
            Drawer.click('cart', false, true);
            jQuery.getJSON('/cart.js', function(cart) {
                if (cart.item_count == 0) {
                    $('.checkout, .view').hide();
                    $('.cart-counter').text('(0)');
                }
                if (cart.item_count >= 1) {
                    $('.checkout, .view').show();
                    $('.cart-counter').text('(' + cart.item_count + ')');
                    var newTotal = parseFloat(cart.total_price / 100).toFixed(2);
                    $('#drawer-cart-total p').text('£' + newTotal);
                }
            });
        }
    });
    return false;
});

// product page quantity
$(document).on('click', '.shopify-product-form .increment', function(){
    var current_val = $(this).parent().find('input[type=number]').val();
    if ($(this).hasClass('down')) {
        if (current_val <= 0) {
            // do nothing
        } else {
            $(this).parent().find('input[type=number]').val( function(i, oldval) {
                return --oldval;
            });
        }
    }
    if ($(this).hasClass('up')) {
        $(this).parent().find('input[type=number]').val( function(i, oldval) {
            return ++oldval;
        });
    }
});