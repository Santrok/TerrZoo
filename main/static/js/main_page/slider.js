$(document).ready(function() {
    $('.popular__goods-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        Infinity: true,
        initialSlide: 0,
        variableWidth: true,
        touchMove:false,
        lazyload: 'progressive',
        nextArrow: $('.popular__goods-arrow-next'),
        prevArrow: $('.popular__goods-arrow-prev'),
        responsive: {
            992: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    })
    $('.new__product-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        Infinity: true,
        initialSlide: 0,
        variableWidth: true,
        lazyload: 'progressive',
        nextArrow: $('.new__product-arrow-next'),
        prevArrow: $('.new__product-arrow-prev'),
        responsive: {
            992: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    })
    $('.feedback__slider').slick({
        slidesToShow: 1,
        slidesToScroll:1,
        lazyload: 'progressive',
        nextArrow: $('.feedback__arrow-next'),
        prevArrow: $('.feedback__arrow-prev'),
    })
    $('.articles__slider').slick({
        slidesToShow:3,
        slidesToScroll:1,
        Infinity:true,
        variableWidth:true,
        lazyload: 'progressive',
        nextArrow: $('.articles__arrow-next'),
        prevArrow: $('.articles__arrow-prev'),
        responsive: {
            992: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    })
})