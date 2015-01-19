//ANCESTOR
var ascensor = $('#Work').ascensor({
    time: 300,
    easing: 'easeInOutCubic',
    ascensorFloorName: ["About", "UI-Design", "InstallationsAndExhibitions", "GraphicAndMotion", "AppAndServiceDesign", "ConceptAndPrototyping", "Contact"],
    direction: 'x',
    swipeNavigation: true,
    keyNavigation: true,
    jump: true,
    loop: true,
    childType:'article'

});
	

var ascensorInstance = $('#Work').data('ascensor');		
			$(".links-to-floor li").click(function(event, index) {
				ascensorInstance.scrollToFloor($(this).index());
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