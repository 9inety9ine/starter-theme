$(document).on('click', '#cart-drawer .item-remove', function(e){
    e.preventDefault();
    var current_id = $(this).closest('.cart-item').find('.quantity').data('item-id');
    var current_val = 0;
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
                    $('.cart-counter').hide();
                }
                if (cart.item_count >= 1) {
                    if ($('.cart-counter').is(":visible")) {
                        $('.cart-counter').text(cart.item_count);
                    } else {
                        $('.cart-counter').css('display','flex');
                        $('.cart-counter').text(cart.item_count);
                    }
                    var newTotal = parseFloat(cart.total_price / 100).toFixed(2);
                    $('#drawer-cart-total p').text('£' + newTotal);
                }
            });
        }
    });
});