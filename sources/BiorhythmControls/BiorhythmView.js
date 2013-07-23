var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};

lu.biorhythmControls.BiorhythmView = function(id) {
	
	var canvas;
	var biorhythms = [];
	var totalDays = 30;
	var xDayIndex = 0;
	
	var moveStepLength;
	var ctrlPressed;
	var buttonPressed;
	var currentDayIndex = 0;
	
	var gridColor = "#d3d3d3"; // LightGray
	
	var painter;
	
	
	// #region FirstDay
	
	var firstDay = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000));
    var firstDayChangedEvent = new lu.Event();

	function setFirstDay(value) {
		firstDay = value;
		firstDayChangedEvent.raiseEvent();
		paint();
	}

    function incrementFirstDay(value) {
        var date = new Date(firstDay.getTime());
        date.setDate(date.getDate() + value);
        setFirstDay(date);
    }

    function getFirstDay() {
        return firstDay;
    }
	
	function subscribeToFirstDayChanged(eventHandler) {
		firstDayChangedEvent.subscribe(eventHandler);
	}
	
	this.setFirstDay = setFirstDay;
    this.getFirstDay = getFirstDay;
	this.subscribeToFirstDayChanged = subscribeToFirstDayChanged;

    // #endregion

    var biorhythmAddedEvent = new lu.Event();
	
	this.subscribeToBiorhythmAdded = function (eventHandler) {
		biorhythmAddedEvent.subscribe(eventHandler);
	}

    var biorhythmRemovedEvent = new lu.Event();
	
	this.subscribeToBiorhythmRemoved = function (eventHandler) {
		biorhythmRemovedEvent.subscribe(eventHandler);
	}
	// --------------------------------------------------------------------------
	// Functions - "private"
	// --------------------------------------------------------------------------
	
	function paint() {
		var rawPaintData = {
			biorhythmShapes: biorhythms,
			firstDay: firstDay,
			totalDays: totalDays,
			xDayIndex: xDayIndex,
			gridColor: gridColor,
			isGridVisible: true,
			
			areDayNumbersVisible: true,
			areWeekDaysVisible: true,
			dayNumbersPosition: lu.DayLabelPosition.top,
			weekDaysPosition: lu.DayLabelPosition.bottom,
			areSundaysEmphasized: true,
			
			foreColor: "#b0b0b0",
			sundaysColor: "#ff0000",
			font: "12px Arial",
			sundaysFont: "italic 12px Arial"
		};
		
		painter.paint(rawPaintData, canvas);
	}

    function addBiorhythm(biorhythmShape) {
        biorhythms.push(biorhythmShape);
	    
        biorhythmShape.subscribeToNameChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToBirthdayChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToBiorhythmChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToColorChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToIsVisibleChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToLineWidthChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToLineStyleChanged(onBiorhithmShapeChanged);
    }
    
    function removeAllBiorhythms() {
        for (var i = 0; i < biorhythms.length; i++) {
            removeBiorhythmAt(i);
        }
    }
    
    function removeBiorhythmAt(index) {
        // todo: unsubscribe from events
        
        biorhythms.splice(index, 1);
    }

	// --------------------------------------------------------------------------
	// Functions - Event Handlers
	// --------------------------------------------------------------------------
	
	function onMouseDown(evt) {
		if (evt.which !== lu.MouseButton.left && evt.which !== lu.MouseButton.right) {
			return;
		}

		/*if (!view.Focused)
                view.Focus();*/

		var rect = canvas.getBoundingClientRect();
		var clickX = evt.clientX - rect.left;

		moveStepLength = canvas.width / totalDays;
		currentDayIndex = Math.floor(clickX / moveStepLength);
		buttonPressed = evt.which;
	}

    function onMouseMove(evt) {
        if (buttonPressed !== lu.MouseButton.left && buttonPressed !== lu.MouseButton.right) {
            return;
        }

        var rect = canvas.getBoundingClientRect();
        var clickX = evt.clientX - rect.left;

        var index = Math.floor(clickX / moveStepLength);
        var steps = index - currentDayIndex;

        if (steps == 0) {
            return;
        }

        currentDayIndex = index;

        if (ctrlPressed || buttonPressed === lu.MouseButton.right) {
            xDayIndex += steps;
            paint();
        } else {
            incrementFirstDay(-steps);
        }

        evt.preventDefault();
        evt.stopPropagation();
    }

	function onMouseUp(evt) {
		if (evt.which === lu.MouseButton.left || evt.which === lu.MouseButton.right) {
			buttonPressed = lu.MouseButton.none;
		}
	}

	function onMouseOut() {
		buttonPressed = lu.MouseButton.none;
	}

	function onWheel(evt) {
	    incrementFirstDay(-evt.deltaY);
	}

    function onKeyDown(evt) {
        if(evt.keyCode === 17) {
            ctrlPressed = true;
        }
    }
    
    function onKeyUp(evt) {
        if(evt.keyCode === 17) {
            ctrlPressed = false;
        }
    }

    function onBiorhithmShapeChanged() {
        paint();
    }

	// --------------------------------------------------------------------------
	// Functions - "public"
	// --------------------------------------------------------------------------
	
	this.setBiorhythms = function (value) {
	    
		removeAllBiorhythms();

		for (var i = 0; i < value.length; i++) {
		    addBiorhythm(value[i]);
		}
		
		paint();
	}

    this.getBiorhythms = function() {
        var list = [];

        for (var i = 0; i < biorhythms.length; i++) {
            list.push(biorhythms[i]);
        }
        
        return list;
    }

	this.getPaintCount = function() {
        return painter.getPaintCount();
	};
	
	this.addBiorhythm = function (biorhythmShape) {
	    
	}

	// --------------------------------------------------------------------------
	// Initializer
	// --------------------------------------------------------------------------
	
	(function initialize() {
		canvas = document.getElementById(id);
		canvas.addEventListener('mousemove', onMouseMove, false);
		
		canvas.addEventListener('mousedown', onMouseDown, false);
		canvas.addEventListener('mouseup', onMouseUp, false);
		
		canvas.addEventListener('mouseout', onMouseOut, false);
		canvas.addEventListener('wheel', onWheel, false);
		
		canvas.addEventListener('keydown', onKeyDown, false);
		canvas.addEventListener('keyup', onKeyUp, false);
		
		painter = new lu.biorhythmControls.common.painting.BiorhythmViewPainter();
	}());
};