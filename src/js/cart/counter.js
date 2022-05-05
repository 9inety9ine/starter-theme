
jQuery.getJSON('/cart.js', function(cart) {
    if (cart.item_count >= 1) {
        $('.cart-counter').text('(' + cart.item_count + ')');
    }
    if (cart.item_count == 0) {
        $('.cart-counter').text('(0)');
    }
});
