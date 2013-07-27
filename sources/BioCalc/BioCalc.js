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
		
		commonBiorhythmShapes.getPassionShape().setIsVisible(true);
		commonBiorhythmShapes.getMasteryShape().setIsVisible(true);
		commonBiorhythmShapes.getWisdomShape().setIsVisible(true);
		
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
	
	var $menu;
	var $buttonAdd;
	
	function onDocumentReady() {
        
        var initialBirthday = new Date(1980, 05, 13); 
        
        $("#button1").on("click", onButton1Clicked);
        
		generateBiorhythms();
		biorhythmShapes = commonBiorhythmShapes.getAll();
        
		biorhythmView = new lu.biorhythmControls.BiorhythmView("bioCanvas");
		biorhythmView.suspendPaint();
		biorhythmView.setXDayVisibility(false);
		biorhythmView.setBiorhythms(biorhythmShapes);
		biorhythmView.setBirthdayOnAllBiorhythms(initialBirthday);
		biorhythmView.subscribeToFirstDayChanged(onBiorhythmViewFirstDayChanged);
		biorhythmView.resumePaint();
		
        $("#birthdayTextBox").val(formatDate(initialBirthday));
        $("#birthdayTextBox").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            onClose : onBirthdayDatePickerClose,
            showButtonPanel: true
        });
        
        var firstDay = biorhythmView.getFirstDay();
        $("#firstDayTextBox").val(formatDate(firstDay));
        $("#firstDayTextBox").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            onClose : onFirstDayDatePickerClose,
            showButtonPanel: true
        });
		
		var biorhythmLegend = new lu.bioCalc.BiorhythmLegend(biorhythmView, "#bioLegend");
		biorhythmLegend.populate();
		
		$menu = $("#menu")
            .hide()
            .menu();
            
		$buttonAdd = $("#buttonAddBiorhythm")
            .button({
                icons: { secondary: "ui-icon-triangle-1-s" }
            })
            .click(onButtonAddBiorhythmClicked);
	}

    function onButtonAddBiorhythmClicked(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        
        var menu = $menu.show().position({
                my: "right top",
                at: "right bottom",
                of: this
            });

        $(document).one("click", function() {
            menu.hide();
        });
    }

    function onButton1Clicked() {
        biorhythmView.setBirthday(new Date());
    }
	
	function onBiorhythmViewFirstDayChanged() {
        var firstDay = biorhythmView.getFirstDay(); 
        var firstDayAsString = formatDate(firstDay);
        
        $("#firstDayTextBox").val(firstDayAsString);
	}

    function onBirthdayDatePickerClose() {
        var date = $(this).datepicker("getDate");
        biorhythmView.setBirthdayOnAllBiorhythms(date);
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
