(function() {
	var biorhythmShapes;
	var biorhythmView;
	var commonBiorhythmShapes;

	// --------------------------------------------------------------------------
	// Functions - "private"
	// --------------------------------------------------------------------------
	
	function generateBiorhythms() {
		commonBiorhythmShapes = new lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes();

		commonBiorhythmShapes.getPhysicalShape().setIsVisible(true);		
		commonBiorhythmShapes.getEmotionalShape().setIsVisible(true);
		commonBiorhythmShapes.getIntellectualShape().setIsVisible(true);
		commonBiorhythmShapes.getIntuitiveShape().setIsVisible(true);
		
		commonBiorhythmShapes.getPassionShape().setIsVisible(false);
		commonBiorhythmShapes.getMasteryShape().setIsVisible(false);
		commonBiorhythmShapes.getWisdomShape().setIsVisible(false);
		
		commonBiorhythmShapes.getPerceptionShape().setIsVisible(false);
		commonBiorhythmShapes.getPsychicShape().setIsVisible(false);
		commonBiorhythmShapes.getSuccessShape().setIsVisible(false);
		
		commonBiorhythmShapes.getEstheticShape().setIsVisible(false);
		commonBiorhythmShapes.getSelfAwarenessShape().setIsVisible(false);
		commonBiorhythmShapes.getSpiritualShape().setIsVisible(false);
	}

	function setBirthday(birthday) {
		for (var i = 0; i < biorhythmShapes.length; i++) {
			biorhythmShapes[i].setBirthday(birthday);
		}
	}

    function formatDate(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        
        var monthString = month < 10 ? "0" + month : "" + month;
        var dayString = day < 10 ? "0" + day : "" + day;
        
        return year + "-" + monthString + "-" + dayString;
    }
	
	// --------------------------------------------------------------------------
	// Functions - Event Handlers
	// --------------------------------------------------------------------------
	
	function onDocumentReady() {
        
        $("#button1").on("click", function () {
            alert(biorhythmView.getPaintCount());
        });
        
		biorhythmView = new lu.biorhythmControls.BiorhythmView("bioCanvas"); 
		
		generateBiorhythms();
		biorhythmShapes = commonBiorhythmShapes.getAll();
		
		biorhythmView.subscribeToFirstDayChanged(onBiorhythmViewFirstDayChanged);
		
        $("#birthdayTextBox").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            onClose : onBirthdayDatePickerClose,
            showButtonPanel: true
        });
        
        var birthday = new Date(1980, 05, 13); 
        $("#birthdayTextBox").val(formatDate(birthday));
        setBirthday(birthday);
        
        $("#firstDayTextBox").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            onClose : onFirstDayDatePickerClose,
            showButtonPanel: true
        });
        
        var firstDay = biorhythmView.getFirstDay();
        $("#firstDayTextBox").val(formatDate(firstDay));
        
		biorhythmView.setBiorhythms(biorhythmShapes);
		
		for (var i = 0; i < biorhythmShapes.length; i++) {
		    var shape = biorhythmShapes[i];
            var $legendItem = $(".bioLegendItem[data-biorhythm='" + shape.getName() + "']");
            var $colorElement = $legendItem.find(".bioLegendColor");
            var color = shape.getColor();
            $colorElement.css('background-color', color);
            var $labelElement = $legendItem.find(".bioLegendLabel");
            $labelElement.text(shape.getBiorhythm().getName());
        }
		
	}
	
	function onBiorhythmViewFirstDayChanged() {
        var firstDay = biorhythmView.getFirstDay(); 
        var firstDayAsString = formatDate(firstDay);
        $("#firstDayTextBox").val(firstDayAsString);
	}

    function onBirthdayDatePickerClose() {
        var date = $(this).datepicker("getDate");
        setTimeout(function() { setBirthday(date) }, 0);
    }
    
    function onFirstDayDatePickerClose() {
        var date = $(this).datepicker("getDate");
        biorhythmView.setFirstDay(date);
    }

	// --------------------------------------------------------------------------
	// Initializer
	// --------------------------------------------------------------------------
	
	(function initialize() {
		$(onDocumentReady);
	}());
    
}());