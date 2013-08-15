﻿// BioControls
// Copyright (C) 2013 Last Unicorn
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

var lu = lu || {};
lu.bioControls = lu.bioControls || {};

lu.bioControls.BiorhythmView = function(id) {

    var canvas = null;
    var obj = this;

    // #region Biorhythms

    // --------------------------------------------------------------------------
    // Biorhythms
    // --------------------------------------------------------------------------

    var biorhythms = [];

    var biorhythmAddedEvent = new lu.Event();
    this.subscribeToBiorhythmAdded = biorhythmAddedEvent.subscribe;

    var biorhythmRemovedEvent = new lu.Event();
    this.subscribeToBiorhythmRemoved = biorhythmRemovedEvent.subscribe;

    this.addBiorhythm = function(biorhythmShape) {
        addBiorhythm(biorhythmShape);
    };

    this.setBiorhythms = function(value) {

        removeAllBiorhythms();

        for ( var i = 0; i < value.length; i++) {
            if ($.type(value[i]) === "object") {
                addBiorhythm(value[i]);
            }
        }

        paint();
    };

    this.getBiorhythms = function() {
        var list = [];

        for ( var i = 0; i < biorhythms.length; i++) {
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

        biorhythmAddedEvent.raise(obj, biorhythmShape);
    }

    function onBiorhithmShapeChanged() {
        paint();
    }

    function removeAllBiorhythms() {
        for ( var i = 0; i < biorhythms.length; i++) {
            removeBiorhythmAt(i);
        }
    }

    this.removeBiorhythm = function(biorhythmShape) {
        var index = biorhythms.indexOf(biorhythmShape);
        if (index !== -1) {
            removeBiorhythmAt(index);
        }
    };

    function removeBiorhythmAt(index) {
        var biorhythmShape = biorhythms[index];

        biorhythmShape.unsubscribeFromNameChanged(onBiorhithmShapeChanged);
        biorhythmShape.unsubscribeFromBirthdayChanged(onBiorhithmShapeChanged);
        biorhythmShape.unsubscribeFromBiorhythmChanged(onBiorhithmShapeChanged);
        biorhythmShape.unsubscribeFromColorChanged(onBiorhithmShapeChanged);
        biorhythmShape.unsubscribeFromIsVisibleChanged(onBiorhithmShapeChanged);
        biorhythmShape.unsubscribeFromLineWidthChanged(onBiorhithmShapeChanged);
        biorhythmShape.unsubscribeFromLineStyleChanged(onBiorhithmShapeChanged);

        biorhythms.splice(index, 1);

        biorhythmRemovedEvent.raise(obj, biorhythmShape);
    }

    // #endregion

    // #region FirstDay

    // --------------------------------------------------------------------------
    // FirstDay
    // --------------------------------------------------------------------------

    var firstDay = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000));
    var firstDayChangedEvent = new lu.Event();

    /**
     * Sets the first day displayed in the grid.
     * 
     * @param value
     *            The new first day.
     */
    this.setFirstDay = setFirstDay;
    function setFirstDay(value) {
        firstDay = value;
        firstDayChangedEvent.raise(obj, value);
        paint();
    }

    function incrementFirstDay(value) {
        var date = new Date(firstDay.getTime());
        date.setDate(date.getDate() + value);
        setFirstDay(date);
    }

    /**
     * Returns the date representing the first day displayed in the grid.
     * 
     * @returns {Date} The date representing the first day displayed in the
     *          grid.
     */
    this.getFirstDay = getFirstDay;
    function getFirstDay() {
        return firstDay;
    }

    Object.defineProperty(this, "firstDay", {
        enumerable: true,
        configurable: false,
        get: getFirstDay,
        set: setFirstDay
    });

    this.subscribeToFirstDayChanged = firstDayChangedEvent.subscribe;

    // #endregion

    // #region IsGridVisible

    // --------------------------------------------------------------------------
    // IsGridVisible
    // --------------------------------------------------------------------------

    var isGridVisible = true;
    var isGridVisibleChangedEvent = new lu.Event();

    this.setGridVisibility = function(value) {
        isGridVisible = Boolean(value);

        isGridVisibleChangedEvent.raise(obj, value);
        paint();
    };

    this.getGridVisibility = function() {
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

    this.setTotalDays = function(value) {
        totalDays = value;

        totalDaysChangedEvent.raise(obj, value);
        paint();
    };

    this.getTotalDays = function() {
        return totalDays;
    };

    this.subscribeToTotalDaysChanged = totalDaysChangedEvent.subscribe;

    // #endregion

    // #region XDayIndex

    // --------------------------------------------------------------------------
    // XDayIndex
    // --------------------------------------------------------------------------

    var xDayIndex = 7;
    var xDayIndexChangedEvent = new lu.Event();

    this.setXDayIndex = setXDayIndex;
    function setXDayIndex(value) {
        if (xDayIndex === value || value < 0 || value >= totalDays)
            return;

        xDayIndex = value;

        xDayIndexChangedEvent.raise(obj, value);
        paint();
    }

    this.getXDayIndex = getXDayIndex;
    function getXDayIndex() {
        return xDayIndex;
    }

    this.subscribeToXDayIndexChanged = xDayIndexChangedEvent.subscribe;

    // #endregion

    // #region GridColor

    // --------------------------------------------------------------------------
    // GridColor
    // --------------------------------------------------------------------------

    var gridColor = "#d3d3d3"; // LightGray
    var gridColorChangedEvent = new lu.Event();

    this.setGridColor = function(value) {
        gridColor = value;

        gridColorChangedEvent.raise(obj, value);
        paint();
    };

    this.getGridColor = function() {
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

    this.setDayNumbersVisibility = function(value) {
        areDayNumbersVisible = value;

        areDayNumbersVisibleChangedEvent.raise(obj, value);
        paint();
    };

    this.getDayNumbersVisibility = function() {
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

    this.setWeekDaysVisibility = function(value) {
        areWeekDaysVisible = value;

        areWeekDaysVisibleChangedEvent.raise(obj, value);
        paint();
    };

    this.getWeekDaysVisibility = function() {
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

    this.setDayNumbersPosition = function(value) {
        dayNumbersPosition = value;

        dayNumbersPositionChangedEvent.raise(obj, value);
        paint();
    };

    this.getDayNumbersPosition = function() {
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

    this.setWeekDaysPosition = function(value) {
        weekDaysPosition = value;

        weekDaysPositionChangedEvent.raise(obj, value);
        paint();
    };

    this.getWeekDaysPosition = function() {
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

    this.setAreSundaysEmphasized = function(value) {
        areSundaysEmphasized = value;

        areSundaysEmphasizedChangedEvent.raise(obj, value);
        paint();
    };

    this.getAreSundaysEmphasized = function() {
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

    this.setForeColor = function(value) {
        foreColor = value;

        foreColorChangedEvent.raise(obj, value);
        paint();
    };

    this.getForeColor = function() {
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

    this.setSundaysColor = function(value) {
        sundaysColor = value;

        sundaysColorChangedEvent.raise(obj, value);
        paint();
    };

    this.getSundaysColor = function() {
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

    this.setFont = function(value) {
        font = value;

        fontChangedEvent.raise(obj, value);
        paint();
    };

    this.getFont = function() {
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

    this.setSundaysFont = function(value) {
        sundaysFont = value;

        sundaysFontChangedEvent.raise(obj, value);
        paint();
    };

    this.getSundaysFont = function() {
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

    this.setTodayBackColor = function(value) {
        todayBackColor = value;

        todayBackColorChangedEvent.raise(obj, value);
        paint();
    };

    this.getTodayBackColor = function() {
        return todayBackColor;
    };

    this.subscribeToTodayBackColorChanged = todayBackColorChangedEvent.subscribe;

    // #endregion

    // #region IsXDayVisible

    // --------------------------------------------------------------------------
    // IsXDayVisible
    // --------------------------------------------------------------------------

    var isXDayVisible = true;
    var isXDayVisibleChangedEvent = new lu.Event();

    this.setXDayVisibility = function(value) {
        isXDayVisible = value;

        isXDayVisibleChangedEvent.raise(obj, value);
        paint();
    };

    this.getXDayVisibility = function() {
        return isXDayVisible;
    };

    this.subscribeToXDayVisibilityChanged = isXDayVisibleChangedEvent.subscribe;

    // #endregion

    // #region XDayBorderColor

    // --------------------------------------------------------------------------
    // XDayBorderColor
    // --------------------------------------------------------------------------

    var xDayBorderColor = "#000000"; // Black
    var xDayBorderColorChangedEvent = new lu.Event();

    this.setXDayBorderColor = function(value) {
        xDayBorderColor = value;

        xDayBorderColorChangedEvent.raise(obj, value);
        paint();
    };

    this.getXDayBorderColor = function() {
        return xDayBorderColor;
    };

    this.subscribeToXDayBorderColorChanged = xDayBorderColorChangedEvent.subscribe;

    // #endregion

    // #region XDayBorderWidth

    // --------------------------------------------------------------------------
    // XDayBorderWidth
    // --------------------------------------------------------------------------

    var xDayBorderWidth = 2;
    var xDayBorderWidthChangedEvent = new lu.Event();

    this.setXDayBorderWidth = function(value) {
        xDayBorderWidth = value;

        xDayBorderWidthChangedEvent.raise(obj, value);
        paint();
    };

    this.getXDayBorderWidth = function() {
        return xDayBorderWidth;
    };

    this.subscribeToXDayBorderWidthChanged = xDayBorderWidthChangedEvent.subscribe;

    // #endregion

    this.setBirthdayOnAllBiorhythms = function(birthday) {
        suspendPaint();

        for ( var i = 0; i < biorhythms.length; i++) {
            biorhythms[i].setBirthday(birthday);
        }

        resumePaint();
    };

    // #region Paint

    // --------------------------------------------------------------------------
    // Paint
    // --------------------------------------------------------------------------

    var painter = null;
    var allowRepaint = true;

    this.suspendPaint = suspendPaint;
    function suspendPaint() {
        allowRepaint = false;
    }

    this.resumePaint = resumePaint;
    function resumePaint() {
        allowRepaint = true;
        paint();
    }

    function paint() {
        if (!allowRepaint) {
            return;
        }

        var rawPaintData = {
            biorhythmShapes: biorhythms,
            firstDay: firstDay,
            totalDays: totalDays,
            xDayIndex: xDayIndex,
            isXDayVisible: isXDayVisible,
            xDayBorderColor: xDayBorderColor,
            xDayBorderWidth: xDayBorderWidth,
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
    var currentDayIndex = 0;

    function onMouseDown(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt.which !== lu.MouseButton.left && evt.which !== lu.MouseButton.right) {
            return;
        }

        /*
         * if (!view.Focused) view.Focus();
         */

        var rect = canvas.getBoundingClientRect();
        var clickX = evt.clientX - rect.left;

        moveStepLength = canvas.width / totalDays;
        currentDayIndex = Math.floor(clickX / moveStepLength);
        buttonPressed = evt.which;
    }

    function onMouseMove(evt) {
        evt.preventDefault();
        evt.stopPropagation();

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
            setXDayIndex(getXDayIndex() + steps);
        } else {
            incrementFirstDay(-steps);
        }
    }

    function onMouseUp(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt.which === lu.MouseButton.left || evt.which === lu.MouseButton.right) {
            buttonPressed = lu.MouseButton.none;
        }
    }

    function onWheel(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var delta = evt.detail ? evt.detail : evt.wheelDelta / (-120);
        incrementFirstDay(delta);
    }

    function onKeyDown(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        
        if (evt.keyCode === 17) {
            ctrlPressed = true;
        }
    }

    function onKeyUp(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        
        if (evt.keyCode === 17) {
            ctrlPressed = false;
        }
    }

    // #endregion

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        // FF doesn't recognize mousewheel as of FF3.x
        var mouseWheelEventName = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";

        canvas = document.getElementById(id);
        canvas.addEventListener('mousedown', onMouseDown, false);
        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseup', onMouseUp, false);

        canvas.addEventListener(mouseWheelEventName, onWheel, false);

        canvas.addEventListener('keydown', onKeyDown, false);
        canvas.addEventListener('keyup', onKeyUp, false);

        painter = new lu.bioControls.common.painting.BiorhythmViewPainter();
    }());
};