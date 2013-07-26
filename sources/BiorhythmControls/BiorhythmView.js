var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};

lu.biorhythmControls.BiorhythmView = function(id) {
	
	var canvas = null;
	
	var currentDayIndex = 0;
	
	// #region Biorhythms
	
	// --------------------------------------------------------------------------
	// Biorhythms
	// --------------------------------------------------------------------------
	
	var biorhythms = [];

    var biorhythmAddedEvent = new lu.Event();
    this.subscribeToBiorhythmAdded = biorhythmAddedEvent.subscribe;

    var biorhythmRemovedEvent = new lu.Event();
    this.subscribeToBiorhythmRemoved = biorhythmRemovedEvent.subscribe;

	this.addBiorhythm = function (biorhythmShape) {
	    addBiorhythm(biorhythmShape);
	};
	
	this.setBiorhythms = function (value) {
	    
		removeAllBiorhythms();

		for (var i = 0; i < value.length; i++) {
		    addBiorhythm(value[i]);
		}
		
		paint();
	};

    this.getBiorhythms = function() {
        var list = [];

        for (var i = 0; i < biorhythms.length; i++) {
            list.push(biorhythms[i]);
        }
        
        return list;
    };

    function addBiorhythm(biorhythmShape) {
        biorhythms.push(biorhythmShape);
	    
        biorhythmShape.subscribeToNameChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToBirthdayChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToBiorhythmChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToColorChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToIsVisibleChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToLineWidthChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToLineStyleChanged(onBiorhithmShapeChanged);
        
	    biorhythmAddedEvent.raise();
    }

    function onBiorhithmShapeChanged() {
        paint();
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
    
    // #endregion
    
	// #region FirstDay
	
	// --------------------------------------------------------------------------
	// FirstDay
	// --------------------------------------------------------------------------
	
	var firstDay = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000));
    var firstDayChangedEvent = new lu.Event();

	this.setFirstDay = setFirstDay;
	function setFirstDay(value) {
		firstDay = value;
		firstDayChangedEvent.raise();
		paint();
	}

    function incrementFirstDay(value) {
        var date = new Date(firstDay.getTime());
        date.setDate(date.getDate() + value);
        setFirstDay(date);
    }

    this.getFirstDay = function () {
        return firstDay;
    };
	
	this.subscribeToFirstDayChanged = firstDayChangedEvent.subscribe;

    // #endregion
    
    // #region IsGridVisible
    
	// --------------------------------------------------------------------------
	// IsGridVisible
	// --------------------------------------------------------------------------
	
    var isGridVisible = true;
    var isGridVisibleChangedEvent = new lu.Event();
    
    this.setGridVisibility = function (value) {
        isGridVisible = Boolean(value);
        
        isGridVisibleChangedEvent.raise();
        paint();
    };
    
    this.getGridVisibility = function () {
        return isGridVisible;
    };
	
	this.subscribeToGridVisibilityChanged = isGridVisibleChangedEvent.subscribe;
    
    // #endregion
    
    // #region TotalDays
    
	// --------------------------------------------------------------------------
	// TotalDays
	// --------------------------------------------------------------------------
	
	var totalDays = 30;
    var totalDaysChangedEvent = new lu.Event();
    
    this.setTotalDays = function (value) {
        totalDays = value;
        
        totalDaysChangedEvent.raise();
        paint();
    };
    
    this.getTotalDays = function () {
        return totalDays;
    };
	
	this.subscribeToTotalDaysChanged = totalDaysChangedEvent.subscribe;
	
	// #endregion
    
    // #region XDayIndex
    
	// --------------------------------------------------------------------------
	// XDayIndex
	// --------------------------------------------------------------------------
	
	var xDayIndex = 0;
    var xDayIndexChangedEvent = new lu.Event();
    
    this.setXDayIndex = function (value) {
        xDayIndex = value;
        
        xDayIndexChangedEvent.raise();
        paint();
    };
    
    this.getXDayIndex = function () {
        return xDayIndex;
    };
	
	this.subscribeToXDayIndexChanged = xDayIndexChangedEvent.subscribe;
	
	// #endregion
    
    // #region GridColor
    
	// --------------------------------------------------------------------------
	// GridColor
	// --------------------------------------------------------------------------
	
	var gridColor = "#d3d3d3"; // LightGray
    var gridColorChangedEvent = new lu.Event();
    
    this.setGridColor = function (value) {
        gridColor = value;
        
        gridColorChangedEvent.raise();
        paint();
    };
    
    this.getGridColor = function () {
        return xDayIndex;
    };
	
	this.subscribeToGridColorChanged = gridColorChangedEvent.subscribe;
	
	// #endregion
    
    // #region AreDayNumbersVisible
    
	// --------------------------------------------------------------------------
	// AreDayNumbersVisible
	// --------------------------------------------------------------------------
	
	var areDayNumbersVisible = true;
    var areDayNumbersVisibleChangedEvent = new lu.Event();
    
    this.setDayNumbersVisibility = function (value) {
        areDayNumbersVisible = value;
        
        areDayNumbersVisibleChangedEvent.raise();
        paint();
    };
    
    this.getDayNumbersVisibility = function () {
        return areDayNumbersVisible;
    };
	
	this.subscribeToDayNumbersVisibilityChanged = areDayNumbersVisibleChangedEvent.subscribe;
	
	// #endregion
    
    // #region AreWeekDaysVisible
    
	// --------------------------------------------------------------------------
	// AreWeekDaysVisible
	// --------------------------------------------------------------------------
	
	var areWeekDaysVisible = true;
    var areWeekDaysVisibleChangedEvent = new lu.Event();
    
    this.setWeekDaysVisibility = function (value) {
        areWeekDaysVisible = value;
        
        areWeekDaysVisibleChangedEvent.raise();
        paint();
    };
    
    this.getWeekDaysVisibility = function () {
        return areWeekDaysVisible;
    };
	
	this.subscribeToWeekDaysVisibilityChanged = areWeekDaysVisibleChangedEvent.subscribe;
	
	// #endregion
    
    // #region DayNumbersPosition
    
	// --------------------------------------------------------------------------
	// DayNumbersPosition
	// --------------------------------------------------------------------------
	
	var dayNumbersPosition = lu.DayLabelPosition.top;
    var dayNumbersPositionChangedEvent = new lu.Event();
    
    this.setDayNumbersPosition = function (value) {
        dayNumbersPosition = value;
        
        dayNumbersPositionChangedEvent.raise();
        paint();
    };
    
    this.getDayNumbersPosition = function () {
        return dayNumbersPosition;
    };
	
	this.subscribeToTodayNumbersPositionChanged = dayNumbersPositionChangedEvent.subscribe;
	
	// #endregion
    
    // #region WeekDaysPosition
    
	// --------------------------------------------------------------------------
	// WeekDaysPosition
	// --------------------------------------------------------------------------
	
	var weekDaysPosition = lu.DayLabelPosition.bottom;
    var weekDaysPositionChangedEvent = new lu.Event();
    
    this.setWeekDaysPosition = function (value) {
        weekDaysPosition = value;
        
        weekDaysPositionChangedEvent.raise();
        paint();
    };
    
    this.getWeekDaysPosition = function () {
        return weekDaysPosition;
    };
	
	this.subscribeToWeekDaysPositionChanged = weekDaysPositionChangedEvent.subscribe;
	
	// #endregion
    
    // #region AreSundaysEmphasized
    
	// --------------------------------------------------------------------------
	// AreSundaysEmphasized
	// --------------------------------------------------------------------------
	
	var areSundaysEmphasized = true;
    var areSundaysEmphasizedChangedEvent = new lu.Event();
    
    this.setAreSundaysEmphasized = function (value) {
        areSundaysEmphasized = value;
        
        areSundaysEmphasizedChangedEvent.raise();
        paint();
    };
    
    this.getAreSundaysEmphasized = function () {
        return areSundaysEmphasized;
    };
	
	this.subscribeToAreSundaysEmphasizedChanged = areSundaysEmphasizedChangedEvent.subscribe;
	
	// #endregion
    
    // #region ForeColor
    
	// --------------------------------------------------------------------------
	// ForeColor
	// --------------------------------------------------------------------------
	
	var foreColor = "#b0b0b0";
    var foreColorChangedEvent = new lu.Event();
    
    this.setForeColor = function (value) {
        foreColor = value;
        
        foreColorChangedEvent.raise();
        paint();
    };
    
    this.getForeColor = function () {
        return foreColor;
    };
	
	this.subscribeToForeColorChanged = foreColorChangedEvent.subscribe;
	
	// #endregion
    
    // #region SundaysColor
    
	// --------------------------------------------------------------------------
	// SundaysColor
	// --------------------------------------------------------------------------
	
	var sundaysColor = "#ff0000";
    var sundaysColorChangedEvent = new lu.Event();
    
    this.setSundaysColor = function (value) {
        sundaysColor = value;
        
        sundaysColorChangedEvent.raise();
        paint();
    };
    
    this.getSundaysColor = function () {
        return sundaysColor;
    };
	
	this.subscribeToSundaysColorChanged = sundaysColorChangedEvent.subscribe;
	
	// #endregion
    
    // #region Font
    
	// --------------------------------------------------------------------------
	// Font
	// --------------------------------------------------------------------------
	
	var font = "12px Arial";
    var fontChangedEvent = new lu.Event();
    
    this.setFont = function (value) {
        font = value;
        
        fontChangedEvent.raise();
        paint();
    };
    
    this.getFont = function () {
        return font;
    };
	
	this.subscribeToFontChanged = fontChangedEvent.subscribe;
	
	// #endregion
    
    // #region SundaysFont
    
	// --------------------------------------------------------------------------
	// SundaysFont
	// --------------------------------------------------------------------------
	
	var sundaysFont = "italic 12px Arial";
    var sundaysFontChangedEvent = new lu.Event();
    
    this.setSundaysFont = function (value) {
        sundaysFont = value;
        
        sundaysFontChangedEvent.raise();
        paint();
    };
    
    this.getSundaysFont = function () {
        return sundaysFont;
    };
	
	this.subscribeToSundaysFontChanged = sundaysFontChangedEvent.subscribe;
	
	// #endregion
    
    // #region TodayBackColor
    
	// --------------------------------------------------------------------------
	// TodayBackColor
	// --------------------------------------------------------------------------
	
	var todayBackColor = "#ffe4b5"; // Moccasin
    var todayBackColorChangedEvent = new lu.Event();
    
    this.setTodayBackColor = function (value) {
        todayBackColor = value;
        
        todayBackColorChangedEvent.raise();
        paint();
    };
    
    this.getTodayBackColor = function () {
        return todayBackColor;
    };
	
	this.subscribeToTodayBackColorChanged = todayBackColorChangedEvent.subscribe;
	
	// #endregion
	
    // #region Paint

	// --------------------------------------------------------------------------
	// Paint
	// --------------------------------------------------------------------------
		
	var painter = null;
	
	function paint() {
		var rawPaintData = {
			biorhythmShapes: biorhythms,
			firstDay: firstDay,
			totalDays: totalDays,
			xDayIndex: xDayIndex,
			gridColor: gridColor,
			isGridVisible: isGridVisible,
			todayBackColor: todayBackColor,
			
			areDayNumbersVisible: areDayNumbersVisible,
			areWeekDaysVisible: areWeekDaysVisible,
			dayNumbersPosition: dayNumbersPosition,
			weekDaysPosition: weekDaysPosition,
			areSundaysEmphasized: areSundaysEmphasized,
			
			foreColor: foreColor,
			sundaysColor: sundaysColor,
			font: font,
			sundaysFont: sundaysFont
		};
		
		painter.paint(rawPaintData, canvas);
	}

	this.getPaintCount = function() {
        return painter.getPaintCount();
	};

    // #endregion
    
	// --------------------------------------------------------------------------
	// Scrolling
	// --------------------------------------------------------------------------
	
    var moveStepLength = 0;
    var ctrlPressed = false;
    var buttonPressed = lu.MouseButton.none;
	
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
		evt.preventDefault();
		
		var delta = evt.detail ? evt.detail : evt.wheelDelta / (-120);
	    incrementFirstDay(delta);
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

    // #endregion

	// --------------------------------------------------------------------------
	// Initializer
	// --------------------------------------------------------------------------
	
	(function initialize() {
		var mouseWheelEventName=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
  
		canvas = document.getElementById(id);
		canvas.addEventListener('mousemove', onMouseMove, false);
		
		canvas.addEventListener('mousedown', onMouseDown, false);
		canvas.addEventListener('mouseup', onMouseUp, false);
		
		canvas.addEventListener('mouseout', onMouseOut, false);
		canvas.addEventListener(mouseWheelEventName, onWheel, false);
		
		canvas.addEventListener('keydown', onKeyDown, false);
		canvas.addEventListener('keyup', onKeyUp, false);
		
		painter = new lu.biorhythmControls.common.painting.BiorhythmViewPainter();
	}());
};