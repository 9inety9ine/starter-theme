window.Drawer = {
    click : function(type, toggleDrawer) {
        toggleDrawer = (toggleDrawer === false) ? false : true;
        Drawer.updateCartDrawer(function() {
            if (toggleDrawer) {
                var html = document.getElementsByTagName('body')[0];
                var drawerOpenClass = 'drawer-open';                
                var drawer = Drawer.getDrawer(type);
                drawer.open = (html.classList.contains(drawerOpenClass)) ? true : false;         
                if (drawer.open) {
                    html.classList.remove(drawerOpenClass);
                } else {
                    html.classList.add(drawerOpenClass);
                    window.dispatchEvent(new Event('resize'));
                }
            }
        }); 
        return false;
    },
    getDrawer : function(type) {
        var html = document.getElementsByTagName('body')[0];
        var obj = {
            type : type,
            class : '',
            open : false
        }
        obj.type = 'cart';
        obj.class = 'drawer-open';
        return obj;
    },
    updateCartDrawer : function(callback){
        fetch('/cart').then(function (response) {
            return response.text();
        }).then(function(html) {
            var drawerBodyEl = document.getElementById('drawer-cart-body');
            var drawerTotalEl = document.getElementById('drawer-cart-total');
            var cartBody = document.getElementById('cart-body');
            var cartItems = '';
            var cartTotal = '';
            if (html.indexOf('<!--[empty-cart]-->') > 0) {
                cartItems = html.split('<!--[empty-cart]-->').pop().split('<!--[/empty-cart]-->')[0];
                cartTotal = '';
                $('.checkout, .view').hide();
            } else {
                cartItems = html.split('<!--[cart-items]-->').pop().split('<!--[/cart-items]-->')[0];
                cartTotal = html.split('<!--[cart-total]-->').pop().split('<!--[/cart-total]-->')[0];
                $('.checkout, .view').show();
            }
            if (cartBody) {
                cartBody.innerHTML = html.split('<!--[cart-body]-->').pop().split('<!--[/cart-body]-->')[0];
            } else {
                drawerBodyEl.innerHTML = cartItems;
                drawerTotalEl.innerHTML = cartTotal;
            }
            callback(true);
        }).catch(function(err) {
            console.error(err);
            callback(true);
        });
    },
    toggle : function() {
        var html = document.getElementsByTagName('body')[0];
        var drawerOpenClass = 'drawer-open';        
        var drawer = Drawer.getDrawer();
        drawer.open = (html.classList.contains(drawerOpenClass)) ? true : false; 
        if (drawer.open) {
            html.classList.remove(drawerOpenClass);
            return false;
        } else {
            html.classList.add(drawerOpenClass);
        }
    }
}