/*----------------------------------------------------*/
/* Quote Loop
------------------------------------------------------ */

function fade($ele) {
    $ele.fadeIn(1000).delay(3000).fadeOut(1000, function() {
        var $next = $(this).next('.quote');
        fade($next.length > 0 ? $next : $(this).parent().children().first());
   });
}
fade($('.quoteLoop > .quote').first());


/*----------------------------------------------------*/
/* Navigation
------------------------------------------------------ */

$(window).scroll(function() {

    if ($(window).scrollTop() > 300) {
        $('.main_nav').addClass('sticky');
    } else {
        $('.main_nav').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.main_nav').hasClass('open-nav')) {
        $('.main_nav').removeClass('open-nav');
    } else {
        $('.main_nav').addClass('open-nav');
    }
});

$('.main_nav li a').click(function() {
    if ($('.main_nav').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_nav').removeClass('open-nav');
    }
});


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

jQuery(document).ready(function($) {

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});
  
});


TweenMax.staggerFrom(".heading", 0.8, {opacity: 0, y: 20, delay: 0.2}, 0.4);
document.addEventListener("DOMContentLoaded", function() {
    var options = {
        valueNames: ['thematique']
    };
    var articlesList = new List('articles', options);

    var filters = document.querySelectorAll('.filters a');

    filters.forEach((filter) => {
        filter.addEventListener('click', function(e){
            var filterValue = this.getAttribute('data-filter');
            e.preventDefault();
            var filterSelected = document.querySelector('.filters .selected');
            filterSelected.classList.remove('selected');
            filter.classList.add('selected');
            
            articlesList.filter(function(item){
                if(item.values().thematique == filterValue) {

                    return true;                        
                } else if(filterValue == "all"){
                    articlesList.filter();
                    return false;
                } else {
                    return false;
                }
            });
            
        });
    })

});
document.addEventListener("DOMContentLoaded", function() {
    var options = {
        valueNames: ['thematique']
    };
    var articlesList = new List('articles', options);

    var filters = document.querySelectorAll('.filters a');

    filters.forEach((filter) => {
        filter.addEventListener('click', function(e){
            var filterValue = this.getAttribute('data-filter');
            e.preventDefault();
            var filterSelected = document.querySelector('.filters .selected');
            filterSelected.classList.remove('selected');
            filter.classList.add('selected');
            
            articlesList.filter(function(item){
                if(item.values().thematique == filterValue) {

                    return true;                        
                } else if(filterValue == "all"){
                    articlesList.filter();
                    return false;
                } else {
                    return false;
                }
            });
            
        });
    })

});
