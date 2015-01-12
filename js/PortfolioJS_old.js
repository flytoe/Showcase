var ascensor = $('#Work').ascensor({ascensorFloorName:["Home", "Implementation", "HTML" , "Jquery" , "CSS", "Smartphone", "End", "Yaaay"], direction: [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]]});
			var ascensorInstance = $('#Work').data('ascensor');		
			$(".links-to-floor li").click(function(event, index) {
				ascensorInstance.scrollToFloor($(this).index());
			});
			$(".links-to-floor li:eq("+ ascensor.data("current-floor") +")").addClass("selected");
			ascensor.on("scrollStart", function(event, floor){
				$(".links-to-floor li").removeClass("selected");
				$(".links-to-floor li:eq("+floor.to+")").addClass("selected");
			});
			$(".prev").click(function() {
				ascensorInstance.prev();
			});
				
			$(".next").click(function() {
				ascensorInstance.next();
			});
				
			$(".direction").click(function() {
				ascensorInstance.scrollToDirection($(this).data("direction"));
			});	