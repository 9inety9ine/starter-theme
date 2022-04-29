window.initialiseCartAddEvents = function() {
    var addToCartForms = document.querySelectorAll('.shopify-product-form');
    for (let i = 0; i < addToCartForms.length; i++) {
        let addToCartForm = addToCartForms[i];
        if (addToCartForm.classList.contains('initalised')) continue;
        addToCartForm.classList.add('initialised');
        addToCartForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var formData = new FormData(this);
            fetch('/cart/add.js', {
                method: 'POST',
                body: formData
            })
            .then(function(response) { return response.json() })
            .then(function(response) {
                jQuery.getJSON('/cart.js', function(cart) {
                    if (cart.item_count >= 1) {
                        if ($('.cart-counter').is(":visible")) {
                            $('.cart-counter').text(cart.item_count);
                        } else {
                            $('.cart-counter').css('display','flex');
                            $('.cart-counter').text(cart.item_count);
                        }
                    }
                    if (cart.item_count == 0) {
                        $('.cart-counter').hide();
                    }
                });
                Drawer.click('cart',true, true);
            })
            .catch(function(err) {
                console.log(err);
            })
         });
    }    
}
window.initialiseCartAddEvents();