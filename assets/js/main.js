// Модальное окно
$('.open-modal').click(function() {
    $('.sm-questionnaire').addClass('sm-open')
    $('body').addClass('lock')
    $('html.animating [data-jsscroll]:not([data-jsscroll_nomob])').css('opacity','1')
})

$('.sm-quest-modal-close').click(function() {
    $('.sm-quest-modal').removeClass('sm-open')
    $('body').removeClass('lock')
})

const wishSliderParams = {
    slidesToShow: 1,
    infinite: true,
    adaptiveHeight: false,
    nextArrow: $('#wishes-navigation .sm-arrow-next'),
    prevArrow: $('#wishes-navigation .sm-arrow-prev'),
}

function onResize(){

    $('.sm-dress-code__slider1').slick({
        slidesToShow: 1,
        infinite: true,
        adaptiveHeight: true,
        nextArrow: $('.sm-dress-code__slider1').parents('.sm-dress-code__box-gallery__item').find('.sm-arrow-next'),
        prevArrow: $('.sm-dress-code__slider1').parents('.sm-dress-code__box-gallery__item').find('.sm-arrow-prev'),
    });

    $('.sm-dress-code__slider2').slick({
        slidesToShow: 1,
        infinite: true,
        adaptiveHeight: true,
        nextArrow: $('.sm-dress-code__slider2').parents('.sm-dress-code__box-gallery__item').find('.sm-arrow-next'),
        prevArrow: $('.sm-dress-code__slider2').parents('.sm-dress-code__box-gallery__item').find('.sm-arrow-prev'),
    });

}

function startAll() {
    startAllScripts();
    onResize();
}
function frameForDressCodeColor() {
    setTimeout(function () {
        console.log('len: ' + $('.sm-dress-code__colors .sm_colors div').length);
        $('.sm_colors div').each(function (color) {
            console.log('Color check: '+$(this).css('background-color'));
            if($(this).css('background-color')=="rgba(0, 0, 0, 0)"){
                console.log('Colors not loaded yet');
                frameForDressCodeColor();
                return false;
            }
            console.log($(this).css('background-color') + ' | ' + $('.sm-dress-code').css('background-color'));
            if ($(this).css('background-color') == $('.sm-dress-code').css('background-color')) {
                //console.log($(this).css('background')+' | '+$('.sm-dress-code').css('background'));
                $(this).css('border', 'solid 1px #262222');
            }
        });
    }, 1000);
}

$(window).on('load', function() {
    frameForDressCodeColor()
});

function initTapeStringAnimation() {
    document.querySelectorAll('.sm-main__tapes .tape').forEach(function (tape) {
        var tapeString = tape.querySelector('.tape-string');
        var tapeRail = tapeString && tapeString.querySelector('.tape-string__rail');
        var sourceTrack = tapeRail && tapeRail.querySelector('.tape-string__track');

        if (!sourceTrack) {
            return;
        }

        var scheduledFrame;

        function rebuildTapeString() {
            var sourceWidth = sourceTrack.getBoundingClientRect().width;
            var tapeWidth = tapeString.getBoundingClientRect().width;

            tapeRail.querySelectorAll('.tape-string__track:not(:first-child)').forEach(function (track) {
                track.remove();
            });

            if (!sourceWidth || !tapeWidth) {
                return;
            }

            var copies = Math.max(2, Math.ceil(tapeWidth / sourceWidth) + 1);

            for (var index = 1; index < copies; index++) {
                var clone = sourceTrack.cloneNode(true);

                clone.querySelectorAll('[data-sm-text]').forEach(function (textNode) {
                    textNode.removeAttribute('data-sm-text');
                });

                tapeRail.appendChild(clone);
            }

            tapeRail.style.setProperty('--tape-string-step', sourceWidth + 'px');
            tapeRail.style.setProperty('--tape-string-duration', Math.max(12, sourceWidth / 35) + 's');
        }

        function scheduleRebuild() {
            cancelAnimationFrame(scheduledFrame);
            scheduledFrame = requestAnimationFrame(rebuildTapeString);
        }

        new MutationObserver(scheduleRebuild).observe(sourceTrack, {
            characterData: true,
            childList: true,
            subtree: true
        });

        if (window.ResizeObserver) {
            new ResizeObserver(scheduleRebuild).observe(tape);
        }

        scheduleRebuild();
    });
}

initTapeStringAnimation();
