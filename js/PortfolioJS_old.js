//ANCESTOR
var ascensor = $('#Work').ascensor({
    time: 300,
    easing: 'easeInOutCubic',
    ascensorFloorName: ["About", "ConceptionAndPrototyping", "UI-Design", "GraphicAndMotion", "MobileAppsAndServiceDesign", "InstallationsAndExhibitions", "Contact"],
    direction: 'x',
    swipeNavigation: true,
    keyNavigation: true,
    jump: true,
    loop: true,
    childType: 'article'

});
	

$(document).ready(function () {
   if (window.matchMedia('(max-width: 680px)').matches) {
       $("#menu-0 a").text("Patric Sterrantino");
       $("#menu-1 a").text("– Conception and Prototyping");
       $("#menu-2 a").text("– User Interface Design");
       $("#menu-3 a").text("– Graphic and Motion Design");
       $("#menu-4 a").text("– Mobile App and Service Design");
       $("#menu-5 a").text("– Installations and Exhibitions");
       $("#menu-6 a").text("Contact");
    } else {
    }
});

var ascensorInstance = $('#Work').data('ascensor');		
			$(".links-to-floor li").click(function(event, index) {
				ascensorInstance.scrollToFloor($(this).index());
                
                if (window.matchMedia('(max-width: 680px)').matches) {
                   toggleMenu();
                } else {
                    
                }
			});

			$(".links-to-floor li:eq("+ ascensor.data("current-floor") +")").addClass("selected");
			ascensor.on("scrollStart", function(event, floor){
				$(".links-to-floor li").removeClass("selected");
				$(".links-to-floor li:eq("+floor.to+")").addClass("selected");
			});
			
            $(".prev").on('click', function() {
				ascensorInstance.prev();
            });
			
            $(".next").on('click', function() {
				ascensorInstance.next();
			});


$(".show-menu").on('click', function() {
    toggleMenu();
});

var toggleMenu = function() {
    $("nav").slideToggle({
        easing: 'easeInOutCubic',
        duration: 250
    });
    $(".show-menu").toggleClass("openIt");
    $( ".global-header" ).toggleClass("fullscreen", 500);
};
