var ascensor = $('#Work').ascensor({
    time: 300,
    easing: 'easeInOutCubic',
    ascensorFloorName: ["About", "Conception", "UI-Design", "App-Design", "Work"],
    direction: 'x',
    swipeNavigation: true,
    keyNavigation: true,
    jump: true,
    loop: true,
    childType: 'article'
});

var MenuCallback = function () {
    if (window.matchMedia('(max-width: 670px)').matches) {
        $("#menu-0 a").text("About Patric Sterrantino");
        $("#menu-1 a").text("Conception and Prototyping");
        $("#menu-2 a").text("UI/UX Design");
        $("#menu-3 a").text("Mobile App and Service Design");
        $("#menu-4 a").text("Work");
    }
    if (window.matchMedia('(max-width: 1048px)').matches) {
        $("#menu-0 a").text("Patric Sterrantino Interactiondesign");
        $("#menu-1 a").text("1");
        $("#menu-2 a").text("2");
        $("#menu-3 a").text("3");
        $("#menu-4 a").text("Work");
    }
    if (window.matchMedia('(min-width: 1049px)').matches) {
        $("#menu-0 a").text("Patric Sterrantino Interactiondesign");
        $("#menu-1 a").text("Conception and Prototyping");
        $("#menu-2 a").text("UI/UX Design");
        $("#menu-3 a").text("App and Service Design");
        $("#menu-4 a").text("Work");
    }
};

$(document).ready(MenuCallback);
$(window).resize(MenuCallback);

var toggleMenu = function () {
    $("nav").slideToggle({
        easing: 'easeInOutCubic',
        duration: 250
    });
    
    $(".show-menu").toggleClass("openIt");
    $(".global-header").toggleClass("fullscreen", 500);
    $(".floor").fadeToggle({
        easing: 'easeInOutCubic',
        duration: 250
    });
    $(".next").fadeToggle({
        easing: 'easeInOutCubic',
        duration: 250
    });
};

var ascensorInstance = $('#Work').data('ascensor');
$(".links-to-floor li").click(function (event, index) {
    ascensorInstance.scrollToFloor($(this).index());

    if (window.matchMedia('(max-width: 670px)').matches) {
        toggleMenu();
    }
});

$(".links-to-floor li:eq(" + ascensor.data("current-floor") + ")").addClass("selected");
ascensor.on("scrollStart", function (event, floor) {
    $(".links-to-floor li").removeClass("selected");
    $(".links-to-floor li:eq(" + floor.to + ")").addClass("selected");
});

$(".prev").on('click', function () {
    ascensorInstance.prev();
});

$(".next").on('click', function () {
    ascensorInstance.next();
});


$(".show-menu").on('click', function () {
    toggleMenu();
});

var $WorkContainer = $('#WorkContainer');
$WorkContainer.masonry({
    itemSelector: '.WorkItem'
});