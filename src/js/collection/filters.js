// const filterForm = document.getElementById('collection-filter-form');
// if (filterForm) {
//     filterForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         let formData = new FormData(this);
//         let params = new URLSearchParams(formData);
//         let requestUrl = `${window.location.pathname}?${params}`;
//         window.history.replaceState({}, document.title, requestUrl);
//         fetch(requestUrl)
//         .then(response => response.text())
//         .then(response => {
//             var countHtml = $(response).find('#collection-filter-form .count').html();
//             var activeFilters = $(response).find('.active-filters').html();
//             if (response.includes('<!--__BEGIN_PRODUCT_LIST__-->') && response.includes('<!--__END_PRODUCT_LIST__-->')) {
//                 let productListMarkup = response.split('<!--__BEGIN_PRODUCT_LIST__-->').pop().split('<!--__END_PRODUCT_LIST__-->')[0];
//                 let productListContainer = document.getElementById('products');
//                 if (productListContainer) productListContainer.innerHTML = productListMarkup;
//                 $('.active-filters').html(activeFilters);
//                 $('#collection-filter-form .count').html(countHtml);
//                 window.initialiseCartAddEvents();
//             }
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     });
//     let filterInputElements = filterForm.querySelectorAll('input[type="checkbox"]');
//     for (let i = 0; i < filterInputElements.length; i++) {
//         filterInputElements[i].addEventListener('change', function() {
//             if ($(this).is(':checked')) {
//                 filterForm.dispatchEvent(new Event('submit'));
//                 $(this).closest('.filter-group').removeClass('open')
//             } else {
//                 var filter_target = $(this).data('filter');
//                 var new_url = $('.active-filters a.' + filter_target).attr('href');
//                 //console.log(new_url);
//                 window.location = new_url;
//                 return false;
//             }
//         });
//     }
//     let filterPrices = filterForm.querySelectorAll('input[type="number"]');
//     for (let i = 0; i < filterPrices.length; i++) {
//         filterPrices[i].addEventListener('input', function() {
//             filterForm.dispatchEvent(new Event('submit'));
//         });
//     }
// }

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

var collectionFilters = document.getElementById('collection-filter-form');

$('#collection-filter-form input[type=checkbox]').on('click change', function(){
    var sort = getUrlParameter('sort_by');
    var formData = new FormData(collectionFilters);
    var params = new URLSearchParams(formData);
    var requestUrl = window.location.pathname + '?' + params;
    if (sort) {
        window.location = requestUrl + '&sort_by=' + sort;
    } else {
        window.location = requestUrl;
    }
});

$('#collection-filter-form-mobile label, #collection-filter-form-mobile input[type=checkbox]').on('click', function(){
    var checkbox = $(this).parent('li').find('input[type=checkbox]');
    if ($(checkbox).is(':checked')) {
        $(checkbox).prop('checked', false);
    } else {
        $(checkbox).prop('checked', true);
    }
    return false;
});

$('.filter-group-summary').on('click', function(){
    if ($(this).parent().hasClass('open')) {
        $(this).parent().removeClass('open');
    } else {
        $('.filter-group').removeClass('open');
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