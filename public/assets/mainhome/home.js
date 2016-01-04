$(document).ready(function () {

    $('#fullpage').fullpage({
        anchors: ['home', 'engaging-employees', 'get-started', 'features', 'why-mw', 'sneak-peek', 'contact'],
        sectionsColor: ['#26A69A ', '#F44336', '#64B5F6', '#FBBD08', '#66BB6A', '#ba68c8', '#4dd0e1'],
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