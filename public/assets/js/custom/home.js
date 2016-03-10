$(document).ready(function () {

    $('#fullpage').fullpage({
        anchors: ['home', 'engaging-employees', 'get-started', 'features', 'why-mw', 'sneak-peek', 'contact'],
        sectionsColor: ['#2ab27b ', '#439fe0', '#edb431', '#eb4d5c', '#8a74b9', '#2ab27b', '#439fe0'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['HOME', 'ENGAGING EMPLOYEES', 'GET STARTED', 'FEATURES', 'WHY MOODWONDER', 'SNEAK PEEK', 'REQUEST A DEMO'],
        responsiveWidth: 1100
    });


    $('.ui.menu .ui.dropdown').dropdown({
        on: 'click'
    });

    $('.ui.menu a.item').on('click', function () {
        $(this)
                .addClass('active')
                .siblings()
                .removeClass('active');
    });

});
