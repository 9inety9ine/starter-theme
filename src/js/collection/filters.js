const filterForm = document.getElementById('collection-filter-form');
if (filterForm) {
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let formData = new FormData(this);
        let params = new URLSearchParams(formData);
        let requestUrl = `${window.location.pathname}?${params}`;
        window.history.replaceState({}, document.title, requestUrl);
        fetch(requestUrl)
        .then(response => response.text())
        .then(response => {
            var countHtml = $(response).find('#collection-filter-form .count').html();
            var activeFilters = $(response).find('.active-filters').html();
            if (response.includes('<!--__BEGIN_PRODUCT_LIST__-->') && response.includes('<!--__END_PRODUCT_LIST__-->')) {
                let productListMarkup = response.split('<!--__BEGIN_PRODUCT_LIST__-->').pop().split('<!--__END_PRODUCT_LIST__-->')[0];
                let productListContainer = document.getElementById('products');
                if (productListContainer) productListContainer.innerHTML = productListMarkup;
                $('.active-filters').html(activeFilters);
                $('#collection-filter-form .count').html(countHtml);
                window.initialiseCartAddEvents();
            }
        })
        .catch(err => {
            console.log(err);
        });
    });
    let filterInputElements = filterForm.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < filterInputElements.length; i++) {
        filterInputElements[i].addEventListener('change', function() {
            if ($(this).is(':checked')) {
                filterForm.dispatchEvent(new Event('submit'));
                $(this).closest('.filter-group').removeClass('open')
            } else {
                var filter_target = $(this).data('filter');
                var new_url = $('.active-filters a.' + filter_target).attr('href');
                //console.log(new_url);
                window.location = new_url;
                return false;
            }
        });
    }
    let filterPrices = filterForm.querySelectorAll('input[type="number"]');
    for (let i = 0; i < filterPrices.length; i++) {
        filterPrices[i].addEventListener('input', function() {
            filterForm.dispatchEvent(new Event('submit'));
        });
    }
}

$('#collection-filter-form .filter-group-summary').on('click', function(){
    if ($(this).parent().hasClass('open')) {
        $(this).parent().removeClass('open');
    } else {
        $('#collection-filter-form .filter-group').removeClass('open');
        $(this).parent().addClass('open');
    }
});

$('#collection-filter-form-mobile .filter-group-summary').on('click', function(){
    if ($(this).parent().hasClass('open')) {
        $(this).parent().removeClass('open');
    } else {
        $(this).parent().addClass('open');
    }
});

$('.filters .toggle').on('click', function(){
    $('.collection-filters-mobile').toggle();
    return false;
});
$('.collection-filters-mobile .mask').on('click', function(){
    $('.collection-filters-mobile').hide();
    return false;
});