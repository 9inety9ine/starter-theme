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
            $(this).closest('.filter-group').removeClass('open');
            filterForm.dispatchEvent(new Event('submit'));
        });
    }
    let filterPrices = filterForm.querySelectorAll('input[type="number"]');
    for (let i = 0; i < filterPrices.length; i++) {
        filterPrices[i].addEventListener('input', function() {
            filterForm.dispatchEvent(new Event('submit'));
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

$('#search-filter-form .filter-sort .toggle').on('click', function(){
    return false;
});