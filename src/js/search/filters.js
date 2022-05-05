const filterForm = document.getElementById('search-filter-form');
if (filterForm) {
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let searchData = window.location.search.substring(1);
        let formData = new FormData(this);
        let params = new URLSearchParams(formData);
        let requestUrl = `${window.location.pathname}?${searchData}&${params}`;
        window.history.replaceState({}, document.title, requestUrl);
        fetch(requestUrl)
        .then(response => response.text())
        .then(response => {
            var countHtml = $(response).find('#search-filter-form .count').html();
            var activeFilters = $(response).find('.active-filters').html();
            if (response.includes('<!--__BEGIN_PRODUCT_LIST__-->') && response.includes('<!--__END_PRODUCT_LIST__-->')) {
                let productListMarkup = response.split('<!--__BEGIN_PRODUCT_LIST__-->').pop().split('<!--__END_PRODUCT_LIST__-->')[0];
                let productListContainer = document.getElementById('products');
                if (productListContainer) productListContainer.innerHTML = productListMarkup;
                $('.active-filters').html(activeFilters);
                $('#search-filter-form .count').html(countHtml);
                window.initialiseCartAddEvents();
            }
        })
        .catch(err => {
            console.log(err);
        });
    });
    let filterInputElements = filterForm.querySelectorAll('.search-filter-option');
    for (let i = 0; i < filterInputElements.length; i++) {
        filterInputElements[i].addEventListener('change', function() {
            if ($(this).is(':checked')) {
                filterForm.dispatchEvent(new Event('submit'));
                $(this).closest('.filter-group').removeClass('open');
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
const filterForm2 = document.getElementById('search-filter-form-mobile');
if (filterForm2) {
    filterForm2.addEventListener('submit', function(e) {
        e.preventDefault();
        let searchData = window.location.search.substring(1);
        let formData = new FormData(this);
        let params = new URLSearchParams(formData);
        let requestUrl = `${window.location.pathname}?${searchData}&${params}`;
        window.history.replaceState({}, document.title, requestUrl);
        fetch(requestUrl)
        .then(response => response.text())
        .then(response => {
            var countHtml = $(response).find('#search-filter-form .count').html();
            var activeFilters = $(response).find('.active-filters').html();
            if (response.includes('<!--__BEGIN_PRODUCT_LIST__-->') && response.includes('<!--__END_PRODUCT_LIST__-->')) {
                let productListMarkup = response.split('<!--__BEGIN_PRODUCT_LIST__-->').pop().split('<!--__END_PRODUCT_LIST__-->')[0];
                let productListContainer = document.getElementById('products');
                if (productListContainer) productListContainer.innerHTML = productListMarkup;
                $('.active-filters').html(activeFilters);
                $('#search-filter-form .count').html(countHtml);
                window.initialiseCartAddEvents();
                $('.search-filters-mobile').hide();
            }
        })
        .catch(err => {
            console.log(err);
        });
    });
    let filterInputElements = filterForm2.querySelectorAll('.search-filter-option');
    for (let i = 0; i < filterInputElements.length; i++) {
        filterInputElements[i].addEventListener('change', function() {
            if ($(this).is(':checked')) {
            } else {
                var filter_target = $(this).data('filter');
                var new_url = $('.active-filters a.' + filter_target).attr('href');
                //console.log(new_url);
                filterForm2.onsubmit = function(){
                    window.location = new_url;
                };
                return false;
            }
        });
    }
}
$('#search-filter-form .filter-group-summary').on('click', function(){
    if ($(this).parent().hasClass('open')) {
        $(this).parent().removeClass('open');
    } else {
        $('#search-filter-form .filter-group').removeClass('open');
        $(this).parent().addClass('open');
    }
});

$('#search-filter-form-mobile .filter-group-summary').on('click', function(){
    if ($(this).parent().hasClass('open')) {
        $(this).parent().removeClass('open');
    } else {
        $(this).parent().addClass('open');
    }
});

$('#search-filter-form .toggle').on('click', function(){
    $('.search-filters-mobile').toggle();
    return false;
});

$('.search-filters-mobile .mask').on('click', function(){
    $('.search-filters-mobile').hide();
    return false;
});