
$(document).on('change', '#collection-filter-form #sort-by', function(){

    var sortOption = $(this).prop('value');
    var originalURL = window.location.href;
    
    const index = originalURL.indexOf('&sort_by');
    const hasParams = originalURL.indexOf('?');

    if (index !== -1) {
        originalURL = originalURL.slice(0, index);
    }
    if (hasParams !== -1) {
        var newUrl = originalURL + "&sort_by=" + sortOption;
    } else {
        var newUrl = originalURL + "?&sort_by=" + sortOption;
    }

    window.history.replaceState({}, document.title, newUrl);
    fetch(newUrl)
    .then(response => response.text())
    .then(response => {

        var activeSort = $(response).find('.current-sort').html();
        var activeCollection = $(response).find('.current-collection').html();

        if (response.includes('<!--__BEGIN_PRODUCT_LIST__-->') && response.includes('<!--__END_PRODUCT_LIST__-->')) {
            let productListMarkup = response.split('<!--__BEGIN_PRODUCT_LIST__-->').pop().split('<!--__END_PRODUCT_LIST__-->')[0];
            let productListContainer = document.getElementById('products');
            if (productListContainer) productListContainer.innerHTML = productListMarkup;
            
            $('.active-filters__clear').attr('href', activeCollection + '/?&sort_by=' + activeSort)
            
            window.initialiseCartAddEvents();
        }
    
    })
    .catch(err => {
        console.log(err);
    });
});